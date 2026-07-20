<?php
require_once __DIR__ . '/mail-helper.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('error' => 'Method not allowed'));
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$name = htmlspecialchars(strip_tags(isset($data['name']) ? $data['name'] : ''));
$email = filter_var(isset($data['email']) ? $data['email'] : '', FILTER_SANITIZE_EMAIL);
$company = htmlspecialchars(strip_tags(isset($data['company']) ? $data['company'] : ''));
$message = htmlspecialchars(strip_tags(isset($data['message']) ? $data['message'] : ''));

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(array('error' => 'Missing required fields'));
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(array('error' => 'Invalid email format'));
    exit;
}

$agencyEmail = 'contact@drape.digital';
$timestamp = date('Y-m-d H:i:s T');
$companyDisplay = $company ? $company : 'N/A';

// --- Internal Notification ---
$ib = '<p style="margin:0 0 16px 0;font-size:15px;color:#333333;line-height:1.6;">A new contact form submission was received:</p>';
$ib .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:16px 0;">';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666;background:#f8f8f8;border:1px solid #e0e0e0;width:140px;">NAME</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111;background:#fff;border:1px solid #e0e0e0;">' . $name . '</td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666;background:#f8f8f8;border:1px solid #e0e0e0;">EMAIL</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111;background:#fff;border:1px solid #e0e0e0;"><a href="mailto:' . $email . '" style="color:#0066FF;">' . $email . '</a></td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666;background:#f8f8f8;border:1px solid #e0e0e0;">COMPANY</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111;background:#fff;border:1px solid #e0e0e0;">' . $companyDisplay . '</td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666;background:#f8f8f8;border:1px solid #e0e0e0;">MESSAGE</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111;background:#fff;border:1px solid #e0e0e0;">' . $message . '</td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666;background:#f8f8f8;border:1px solid #e0e0e0;">TIME</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111;background:#fff;border:1px solid #e0e0e0;">' . $timestamp . '</td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666;background:#f8f8f8;border:1px solid #e0e0e0;">SOURCE</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111;background:#fff;border:1px solid #e0e0e0;">Contact Form</td></tr>';
$ib .= '</table>';

$internalHtml = render_branded_email('New Contact Request from ' . $name, $ib, array('preheader' => 'New lead: ' . $name . ' (' . $email . ')'));

$agencySent = send_branded_mail(
    $agencyEmail,
    'New Contact Request from ' . $name,
    $internalHtml,
    array('fromName' => 'Drape Digital Website', 'replyTo' => $email)
);

// --- Client Autoresponder ---
$ctaBtn = email_cta_button('https://drape.digital/portfolio', 'View Our Portfolio');

$cb = '<p style="margin:0 0 16px 0;font-size:15px;color:#333;line-height:1.6;">Hi ' . $name . ',</p>';
$cb .= '<p style="margin:0 0 16px 0;font-size:15px;color:#333;line-height:1.6;">Thank you for reaching out to Drape Digital! We have received your inquiry and our team is already reviewing your details.</p>';
$cb .= '<p style="margin:0 0 8px 0;font-size:15px;color:#333;line-height:1.6;font-weight:600;">Here is what happens next:</p>';
$cb .= '<p style="margin:0 0 8px 0;font-size:15px;color:#333;line-height:1.6;">1. We review your project details and research your industry.</p>';
$cb .= '<p style="margin:0 0 8px 0;font-size:15px;color:#333;line-height:1.6;">2. We design and build a custom demo site just for your business.</p>';
$cb .= '<p style="margin:0 0 16px 0;font-size:15px;color:#333;line-height:1.6;">3. You receive a link to a live, fully functional demo &mdash; no commitment required.</p>';
$cb .= '<p style="margin:0 0 16px 0;font-size:15px;color:#333;line-height:1.6;">We will be in touch within <strong>24 hours</strong>. In the meantime, feel free to explore some of our recent work:</p>';
$cb .= $ctaBtn;
$cb .= '<p style="margin:0;font-size:15px;color:#333;line-height:1.6;">Best regards,<br><strong>The Drape Digital Team</strong></p>';

$clientHtml = render_branded_email('Thanks for Reaching Out!', $cb, array('preheader' => 'We have received your request - here is what happens next.'));

$clientSent = send_branded_mail(
    $email,
    'Thank you for contacting Drape Digital',
    $clientHtml,
    array('fromName' => 'Drape Digital', 'bcc' => 'drape.digital+d8a1d0a4c8@invite.trustpilot.com')
);

if ($agencySent && $clientSent) {
    echo json_encode(array('success' => true, 'message' => 'Message sent successfully'));
} else {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to send message'));
}
