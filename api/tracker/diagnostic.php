<?php
/**
 * Diagnostic endpoint to check tracker.php setup
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Check 1: Config file
$configPath = __DIR__ . '/../config/env.php';
$configExists = file_exists($configPath);

// Check 2: Try to include it
$configIncluded = false;
$configError = null;
if ($configExists) {
    @include_once $configPath;
    $configIncluded = true;
}

// Check 3: Token defined
$tokenDefined = defined('HUBSPOT_TOKEN');
$tokenValue = $tokenDefined ? (strlen(HUBSPOT_TOKEN) > 10 ? substr(HUBSPOT_TOKEN, 0, 10) . '***' : 'SHORT_TOKEN') : 'NOT_DEFINED';

// Check 4: PHP version
$phpVersion = phpversion();

// Check 5: cURL
$curlAvailable = extension_loaded('curl');

// Check 6: Try to read tracker.js to see if assets are accessible
$trackerPath = __DIR__ . '/../tracker.js';
$trackerExists = file_exists($trackerPath);

http_response_code(200);
echo json_encode([
    'status' => 'diagnostic_check',
    'timestamp' => date('Y-m-d H:i:s'),
    'config_file_exists' => $configExists,
    'config_path' => $configPath,
    'config_included' => $configIncluded,
    'token_defined' => $tokenDefined,
    'token_value' => $tokenValue,
    'php_version' => $phpVersion,
    'curl_available' => $curlAvailable,
    'tracker_js_exists' => $trackerExists,
    'working_directory' => getcwd(),
    'script_filename' => __FILE__,
], JSON_PRETTY_PRINT);
