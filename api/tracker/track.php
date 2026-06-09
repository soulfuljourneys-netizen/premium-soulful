<?php
/**
 * Soulful Journeys - custom engagement backend.
 *
 * HubSpot native tracking records page views. This endpoint receives
 * non-native engagement details from public/tracker.js and creates real
 * HubSpot CRM notes associated with a known contact.
 */

// Set headers FIRST, before anything else
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS, GET');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Try to load config, but don't die if it fails
$HUBSPOT_TOKEN = null;
$configPath = __DIR__ . '/../config/env.php';
if (file_exists($configPath)) {
    @require_once $configPath;
}

const HUBSPOT_NOTE_TO_CONTACT_ASSOCIATION_TYPE_ID = 202;

function jsonResponse($statusCode, $payload) {
    http_response_code($statusCode);
    echo json_encode($payload);
    exit;
}

function hubspotRequest($method, $path, $token, $payload = null) {
    $ch = curl_init('https://api.hubapi.com' . $path);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
        ],
        CURLOPT_TIMEOUT => 15,
    ]);

    if ($payload !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    }

    $raw = curl_exec($ch);
    $error = curl_error($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $body = json_decode($raw ?: '{}', true);

    return [
        'statusCode' => $statusCode,
        'body' => is_array($body) ? $body : [],
        'error' => $error,
    ];
}

function safeLine($value, $maxLength = 160) {
    $value = preg_replace('/\s+/', ' ', trim((string)$value));
    return substr($value, 0, $maxLength);
}

function findContactByEmail($token, $email) {
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return null;
    }

    $response = hubspotRequest('POST', '/crm/v3/objects/contacts/search', $token, [
        'filterGroups' => [[
            'filters' => [[
                'propertyName' => 'email',
                'operator' => 'EQ',
                'value' => $email,
            ]],
        ]],
        'limit' => 1,
    ]);

    if ($response['statusCode'] >= 200 && $response['statusCode'] < 300) {
        return $response['body']['results'][0]['id'] ?? null;
    }

    return null;
}

function createContact($token, $email) {
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return null;
    }

    $response = hubspotRequest('POST', '/crm/v3/objects/contacts', $token, [
        'properties' => [
            'email' => $email,
            'lifecyclestage' => 'lead',
        ],
    ]);

    if ($response['statusCode'] >= 200 && $response['statusCode'] < 300) {
        return $response['body']['id'] ?? null;
    }

    return null;
}

function getContactId($token, $urlContactId, $email) {
    if ($urlContactId) {
        return [
            'contactId' => preg_replace('/[^0-9]/', '', $urlContactId),
            'source' => 'url_parameter',
        ];
    }

    $existingContactId = findContactByEmail($token, $email);
    if ($existingContactId) {
        return [
            'contactId' => $existingContactId,
            'source' => 'email_lookup',
        ];
    }

    $createdContactId = createContact($token, $email);
    if ($createdContactId) {
        return [
            'contactId' => $createdContactId,
            'source' => 'email_created',
        ];
    }

    return [
        'contactId' => null,
        'source' => 'anonymous',
    ];
}

function appendEventLines(&$lines, $title, $events, $formatter) {
    if (empty($events) || !is_array($events)) {
        return;
    }

    $lines[] = '';
    $lines[] = $title . ': ' . count($events);

    foreach ($events as $event) {
        if (is_array($event)) {
            $lines[] = ' - ' . $formatter($event);
        }
    }
}

function buildNoteBody($data) {
    $lines = [
        'Soulful Journeys website engagement',
        'Captured at: ' . date('Y-m-d H:i:s'),
        'Page: ' . safeLine($data['pageUrl'] ?? '', 500),
        'Page title: ' . safeLine($data['pageTitle'] ?? ''),
        'Active time this session: ' . (int)($data['activeTime'] ?? 0) . 's',
        'Max scroll depth: ' . (int)($data['maxScrollDepth'] ?? 0) . '%',
    ];

    appendEventLines($lines, 'Components clicked', $data['clicks'] ?? [], function ($event) {
        $parts = [safeLine($event['component'] ?? 'unknown')];
        if (!empty($event['section'])) $parts[] = 'section: ' . safeLine($event['section']);
        if (!empty($event['text'])) $parts[] = 'text: ' . safeLine($event['text']);
        if (!empty($event['href'])) $parts[] = 'href: ' . safeLine($event['href'], 220);
        return implode(' | ', $parts);
    });

    appendEventLines($lines, 'Page route visits', $data['pageVisits'] ?? [], function ($event) {
        return safeLine(($event['url'] ?? '') . ' | ' . ($event['title'] ?? ''), 260);
    });

    appendEventLines($lines, 'Media plays', $data['mediaPlays'] ?? [], function ($event) {
        return safeLine(($event['type'] ?? 'media') . ': ' . ($event['title'] ?? ''), 260);
    });

    appendEventLines($lines, 'Form events', $data['formEvents'] ?? [], function ($event) {
        return safeLine(($event['type'] ?? 'form_event') . ' | ' . ($event['form'] ?? '') . ' | ' . ($event['page'] ?? ''), 260);
    });

    return implode("\n", $lines);
}

function updateContactTimeSpent($token, $contactId, $activeTime) {
    if (!$contactId || $activeTime <= 0) {
        return null;
    }

    return hubspotRequest('PATCH', '/crm/v3/objects/contacts/' . rawurlencode($contactId), $token, [
        'properties' => [
            'timespent' => (string)$activeTime,
        ],
    ]);
}

function createContactNote($token, $contactId, $noteBody) {
    if (!$contactId || !$noteBody) {
        return null;
    }

    return hubspotRequest('POST', '/crm/v3/objects/notes', $token, [
        'properties' => [
            'hs_timestamp' => date('c'),
            'hs_note_body' => $noteBody,
        ],
        'associations' => [[
            'to' => ['id' => $contactId],
            'types' => [[
                'associationCategory' => 'HUBSPOT_DEFINED',
                'associationTypeId' => HUBSPOT_NOTE_TO_CONTACT_ASSOCIATION_TYPE_ID,
            ]],
        ]],
    ]);
}

try {
    // Try to load config if it exists, but don't fail if it doesn't
    $configPath = __DIR__ . '/../../config/env.php';
    $hasConfig = false;
    if (file_exists($configPath)) {
        require_once $configPath;
        $hasConfig = true;
    }
    
    // Check if HUBSPOT_TOKEN is defined
    $token = defined('HUBSPOT_TOKEN') ? HUBSPOT_TOKEN : null;
    if (!$token) {
        // Return 202 (accepted but not processed) if no token available
        http_response_code(202);
        echo json_encode([
            'status' => 'accepted_no_token',
            'message' => 'Tracking data received but HubSpot integration not configured',
            'configExists' => $hasConfig,
        ]);
        exit;
    }

    // Handle both JSON and FormData inputs
    $input = null;
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    
    if (strpos($contentType, 'application/json') !== false) {
        // JSON input (from fetch)
        $input = json_decode(file_get_contents('php://input'), true);
    } elseif (strpos($contentType, 'multipart/form-data') !== false) {
        // FormData input (from sendBeacon)
        if (!empty($_POST['data'])) {
            $input = json_decode($_POST['data'], true);
        }
    } else {
        // Try JSON as fallback
        $input = json_decode(file_get_contents('php://input'), true);
    }
    
    if (!is_array($input)) {
        jsonResponse(400, ['error' => 'Invalid input - no data received']);
    }

    $userId = safeLine($input['userId'] ?? '');
    if (!$userId) {
        jsonResponse(400, ['error' => 'Missing userId']);
    }

    $activeTime = (int)($input['activeTime'] ?? 0);
    $email = safeLine($input['email'] ?? '');
    
    // Get contact ID: Priority 1) URL parameter, 2) email lookup, 3) create new
    $contact = getContactId($token, $_GET['id'] ?? null, $email);
    $contactId = $contact['contactId'];

    if (!$contactId) {
        jsonResponse(202, [
            'status' => 'anonymous',
            'message' => 'Engagement received, but no HubSpot contact id or email is available yet.',
            'userId' => $userId,
            'contactSource' => $contact['source'],
        ]);
    }

    // Update time spent property (in seconds)
    $timeResponse = updateContactTimeSpent($token, $contactId, $activeTime);
    
    // Create note if there's custom engagement (clicks, media, page visits)
    $noteResponse = null;
    if (!empty($input['hasCustomEngagement']) || !empty($input['clicks']) || !empty($input['mediaPlays']) || !empty($input['pageVisits'])) {
        $noteResponse = createContactNote($token, $contactId, buildNoteBody($input));
    }

    $timeOk = !$timeResponse || ($timeResponse['statusCode'] >= 200 && $timeResponse['statusCode'] < 300);
    $noteOk = !$noteResponse || ($noteResponse['statusCode'] >= 200 && $noteResponse['statusCode'] < 300);

    if (!$timeOk || !$noteOk) {
        jsonResponse(502, [
            'status' => 'hubspot_error',
            'contactId' => $contactId,
            'contactSource' => $contact['source'],
            'timeStatus' => $timeResponse['statusCode'] ?? null,
            'noteStatus' => $noteResponse['statusCode'] ?? null,
            'error' => $noteResponse['body']['message'] ?? $timeResponse['body']['message'] ?? 'HubSpot API error',
        ]);
    }

    jsonResponse(200, [
        'status' => 'success',
        'message' => 'Tracking data processed and sent to HubSpot',
        'contactId' => $contactId,
        'contactSource' => $contact['source'],
        'timespentUpdated' => (bool)$timeResponse,
        'noteCreated' => (bool)$noteResponse,
        'noteId' => $noteResponse['body']['id'] ?? null,
        'activeTime' => $activeTime,
        'maxScrollDepth' => (int)($input['maxScrollDepth'] ?? 0),
        'eventsProcessed' => count($input['clicks'] ?? []) + count($input['mediaPlays'] ?? []) + count($input['pageVisits'] ?? []),
    ]);
} catch (Exception $e) {
    jsonResponse(500, ['error' => $e->getMessage()]);
}
