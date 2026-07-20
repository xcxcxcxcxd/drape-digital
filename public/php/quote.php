<?php
require_once __DIR__ . '/mail-helper.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('error' => 'Method not allowed'));
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$email = filter_var(isset($data['email']) ? $data['email'] : '', FILTER_SANITIZE_EMAIL);
$service = htmlspecialchars(strip_tags(isset($data['service']) ? $data['service'] : ''));
$companyName = htmlspecialchars(strip_tags(isset($data['companyName']) ? $data['companyName'] : ''));
$url = htmlspecialchars(strip_tags(isset($data['url']) ? $data['url'] : ''));

if (empty($email)) {
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
$serviceLabel = $service ? $service : 'Unknown Service';
$timestamp = date('Y-m-d H:i:s T');

// --- Internal Notification (to us) ---
$ib = '<p style="margin:0 0 16px 0;font-size:15px;color:#333333;line-height:1.6;">';
$ib .= 'A new lead magnet / quote request was submitted. Details below:';
$ib .= '</p>';
$ib .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:16px 0;">';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666666;background-color:#f8f8f8;border:1px solid #e0e0e0;width:140px;text-transform:uppercase;letter-spacing:0.5px;">Email</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111111;background-color:#ffffff;border:1px solid #e0e0e0;"><a href="mailto:' . $email . '" style="color:#0066FF;text-decoration:none;">' . $email . '</a></td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666666;background-color:#f8f8f8;border:1px solid #e0e0e0;text-transform:uppercase;letter-spacing:0.5px;">Service</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111111;background-color:#ffffff;border:1px solid #e0e0e0;">' . $serviceLabel . '</td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666666;background-color:#f8f8f8;border:1px solid #e0e0e0;text-transform:uppercase;letter-spacing:0.5px;">Company</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111111;background-color:#ffffff;border:1px solid #e0e0e0;">' . ($companyName ? $companyName : 'N/A') . '</td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666666;background-color:#f8f8f8;border:1px solid #e0e0e0;text-transform:uppercase;letter-spacing:0.5px;">URL</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111111;background-color:#ffffff;border:1px solid #e0e0e0;">' . ($url ? $url : 'N/A') . '</td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666666;background-color:#f8f8f8;border:1px solid #e0e0e0;text-transform:uppercase;letter-spacing:0.5px;">Timestamp</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111111;background-color:#ffffff;border:1px solid #e0e0e0;">' . $timestamp . '</td></tr>';
$ib .= '<tr><td style="padding:12px 16px;font-size:13px;font-weight:700;color:#666666;background-color:#f8f8f8;border:1px solid #e0e0e0;text-transform:uppercase;letter-spacing:0.5px;">Source</td>';
$ib .= '<td style="padding:12px 16px;font-size:15px;color:#111111;background-color:#ffffff;border:1px solid #e0e0e0;">Lead Magnet / Quote (' . $serviceLabel . ')</td></tr>';
$ib .= '</table>';

$internalHtml = render_branded_email(
    'New Lead: ' . $serviceLabel . ' Resource Request',
    $ib,
    array('preheader' => 'Lead magnet download: ' . $email . ' — ' . $serviceLabel)
);

$agencySent = send_branded_mail(
    $agencyEmail,
    'New Lead Magnet / Quote Request for ' . $serviceLabel,
    $internalHtml,
    array(
        'fromName' => 'Drape Digital Website',
        'replyTo'  => $email,
    )
);

// --- Lead Autoresponder ---
$portfolioCta = email_cta_button('https://drape.digital/portfolio', 'See Our Recent Work');
$contactCta = email_cta_button('https://drape.digital/contact', 'Request Your Free Demo');

$cb = '<p style="margin:0 0 16px 0;font-size:15px;color:#333333;line-height:1.6;">Hi there,</p>';
$cb .= '<p style="margin:0 0 16px 0;font-size:15px;color:#333333;line-height:1.6;">Thank you for your interest in our <strong>' . $serviceLabel . '</strong> expertise. Our team has put together insights to help you scale and optimize your digital presence.</p>';

$cb .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;"><tr>';
$cb .= '<td style="background-color:#f0f9ff;border:1px solid #00D1FF;border-left:4px solid #0066FF;border-radius:8px;padding:20px 24px;">';
$cb .= '<p style="margin:0 0 8px 0;font-size:16px;font-weight:700;color:#111111;">Your Resource: ' . $serviceLabel . '</p>';
$cb .= '<p style="margin:0 0 12px 0;font-size:14px;color:#555555;line-height:1.5;">We are preparing your personalized resource. A member of our team will follow up shortly with the details.</p>';
$cb .= '</td></tr></table>';

$cb .= '<p style="margin:0 0 8px 0;font-size:15px;color:#333333;line-height:1.6;font-weight:600;">What makes Drape Digital different?</p>';
$cb .= '<p style="margin:0 0 16px 0;font-size:15px;color:#333333;line-height:1.6;">We build your website <em>before</em> you pay. You will see a fully functional, custom demo hosted on a private subdomain &mdash; browse it on your phone, click the buttons, feel the animations. If you love it, you pay the invoice and we transfer it to your domain. <strong>Zero risk.</strong></p>';

$cb .= $portfolioCta;

$cb .= '<p style="margin:0 0 16px 0;font-size:15px;color:#333333;line-height:1.6;">Ready to see what we can build for you? Request a free, no-commitment demo:</p>';

$cb .= $contactCta;

$cb .= '<p style="margin:0;font-size:15px;color:#333333;line-height:1.6;">Best regards,<br><strong>The Drape Digital Team</strong></p>';

$clientHtml = render_branded_email(
    'Your Requested Resource: ' . $serviceLabel . ' by Drape Digital',
    $cb,
    array('preheader' => 'Your ' . $serviceLabel . ' resource from Drape Digital is ready — plus see how we build sites before you pay.')
);

$clientSent = send_branded_mail(
    $email,
    'Your Requested Resource: ' . $serviceLabel . ' by Drape Digital',
    $clientHtml,
    array(
        'fromName' => 'Drape Digital',
        'bcc'      => 'drape.digital+d8a1d0a4c8@invite.trustpilot.com',
    )
);

if ($agencySent && $clientSent) {
    echo json_encode(array('success' => true, 'message' => 'Quote request received'));
} else {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to send request'));
}
