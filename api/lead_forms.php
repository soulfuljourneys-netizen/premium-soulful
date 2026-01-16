<?php
// File: api/lead_forms.php
// Receives JSON POST and appends to a CSV file (lead_forms.csv) in the same folder

header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Define CSV file path
$csvFile = __DIR__ . '/lead_forms.csv';

// Prepare header and row
$fields = [
    'submitted_at',
    'firstname',
    'lastname',
    'email',
    'phone',
    'trip',
    'trip_month',
    'persons',
    'how_soon_you_want_to_book',
    'page_url',
    'user_agent'
];

$row = [];
foreach ($fields as $field) {
    $row[] = isset($data[$field]) ? $data[$field] : '';
}

// If file doesn't exist, write header
$fileExists = file_exists($csvFile);
$fp = fopen($csvFile, 'a');
if (!$fileExists) {
    fputcsv($fp, $fields);
}
fputcsv($fp, $row);
fclose($fp);

// Respond success
http_response_code(200);
echo json_encode(['success' => true]);
