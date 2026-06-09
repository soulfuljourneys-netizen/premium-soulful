<?php
/**
 * Soulful Journeys - Test tracking endpoint
 * Simple version for local testing without config/env.php dependency
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS, GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(200);
    echo json_encode(['status' => 'test endpoint ready', 'method' => $_SERVER['REQUEST_METHOD']]);
    exit;
}

try {
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
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input - no data received']);
        exit;
    }

    $contactId = $_GET['id'] ?? null;
    $userId = $input['userId'] ?? 'unknown';
    $activeTime = (int)($input['activeTime'] ?? 0);
    $maxScrollDepth = (int)($input['maxScrollDepth'] ?? 0);
    $clicks = count($input['clicks'] ?? []);
    $mediaPlays = count($input['mediaPlays'] ?? []);
    $pageVisits = count($input['pageVisits'] ?? []);

    // Log to file for testing
    $logFile = __DIR__ . '/tracker-test.log';
    $logEntry = sprintf(
        "[%s] Contact: %s | UserId: %s | Active: %ds | Scroll: %d%% | Clicks: %d | Media: %d | Pages: %d\n",
        date('Y-m-d H:i:s'),
        $contactId ?? 'anonymous',
        $userId,
        $activeTime,
        $maxScrollDepth,
        $clicks,
        $mediaPlays,
        $pageVisits
    );
    @file_put_contents($logFile, $logEntry, FILE_APPEND);

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Tracking data received and logged',
        'contactId' => $contactId,
        'activeTime' => $activeTime,
        'eventsProcessed' => $clicks + $mediaPlays + $pageVisits,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
