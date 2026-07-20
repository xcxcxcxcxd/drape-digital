<?php
/**
 * Client demo site contact handler for Vertex Consulting
 * Subdomain: vertex.drape.digital
 *
 * Posts to the central Drape Digital contact handler with
 * source identification so leads are tagged by client/subdomain.
 *
 * Note: This file can either handle the form locally or redirect
 * to the central handler. By default, it forwards to the main site's
 * API to reuse the branded email system.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://vertex.drape.digital');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Read form data (supports both JSON and form-encoded)
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') !== false) {
    $data = json_decode(file_get_contents('php://input'), true) ?: [];
} else {
    $data = $_POST;
}

// Tag with source info
$data['source']    = $data['source'] ?? 'vertex';
$data['subdomain'] = $data['subdomain'] ?? 'vertex.drape.digital';

// Forward to central handler via cURL (if available) or local mail
$centralUrl = 'https://drape.digital/api/contact';

$ch = curl_init($centralUrl);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($data),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error    = curl_error($ch);
curl_close($ch);

if ($error) {
    // Fallback: try local mail if cURL fails
    $to      = 'contact@drape.digital';
    $subject = "Lead from vertex.drape.digital: " . ($data['name'] ?? 'Unknown');
    $body    = "Source: vertex.drape.digital\n\n";
    foreach ($data as $key => $value) {
        $body .= ucfirst($key) . ": " . $value . "\n";
    }
    $headers = "From: Vertex Consulting <noreply@drape.digital>\r\n";
    $headers .= "Reply-To: " . ($data['email'] ?? 'contact@drape.digital') . "\r\n";

    $sent = mail($to, $subject, $body, $headers, '-fcontact@drape.digital');
    if ($sent) {
        echo json_encode(['success' => true, 'message' => 'Message sent (fallback)']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send message']);
    }
} else {
    http_response_code($httpCode);
    echo $response;
}
