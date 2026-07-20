<?php
/**
 * Drape Digital — Branded Email Helper
 * Uses string concatenation only (no heredocs) for max hosting compatibility.
 */

function render_branded_email($title, $bodyHtml, $opts = [])
{
    $preheader = htmlspecialchars(isset($opts['preheader']) ? $opts['preheader'] : '', ENT_QUOTES, 'UTF-8');
    $year = isset($opts['year']) ? $opts['year'] : date('Y');

    $bgDark       = '#050505';
    $bgCard       = '#ffffff';
    $textMuted    = '#999999';
    $accent       = '#00D1FF';
    $accentDark   = '#0066FF';
    $logoUrl      = 'https://drape.digital/assets/email-logo.png';
    $siteUrl      = 'https://drape.digital';
    $contactEmail = 'contact@drape.digital';
    $linkedIn     = 'https://linkedin.com/company/drapedigital';

    $h = '<!DOCTYPE html>';
    $h .= '<html lang="en" xmlns="http://www.w3.org/1999/xhtml"><head>';
    $h .= '<meta charset="UTF-8">';
    $h .= '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    $h .= '<title>' . $title . '</title></head>';
    $h .= '<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">';

    // Preheader
    $h .= '<div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">';
    $h .= $preheader . '</div>';

    // Outer table
    $h .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;">';
    $h .= '<tr><td align="center" style="padding:20px 10px;">';

    // Main container
    $h .= '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-collapse:collapse;">';

    // Header
    $h .= '<tr><td align="center" style="background-color:' . $bgDark . ';padding:32px 40px 24px 40px;border-radius:12px 12px 0 0;">';
    $h .= '<a href="' . $siteUrl . '" target="_blank" style="text-decoration:none;">';
    $h .= '<img src="' . $logoUrl . '" alt="Drape Digital" width="200" style="display:block;max-width:200px;height:auto;border:0;" />';
    $h .= '</a>';
    $h .= '<p style="margin:12px 0 0 0;font-size:13px;color:' . $textMuted . ';letter-spacing:0.5px;">';
    $h .= 'Custom websites &mdash; see your site live before you pay.</p>';
    $h .= '</td></tr>';

    // Accent bar
    $h .= '<tr><td style="height:4px;background:linear-gradient(90deg,' . $accentDark . ',' . $accent . ');font-size:0;line-height:0;">&nbsp;</td></tr>';

    // Body
    $h .= '<tr><td style="background-color:' . $bgCard . ';padding:40px 40px 32px 40px;">';
    $h .= '<h1 style="margin:0 0 24px 0;font-size:24px;font-weight:700;color:#111111;line-height:1.3;">' . $title . '</h1>';
    $h .= $bodyHtml;
    $h .= '</td></tr>';

    // Footer
    $h .= '<tr><td style="background-color:' . $bgDark . ';padding:32px 40px;border-radius:0 0 12px 12px;">';
    $h .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">';
    $h .= '<tr><td style="font-size:14px;line-height:1.6;color:' . $textMuted . ';">';
    $h .= '<a href="' . $siteUrl . '" style="color:' . $accent . ';text-decoration:none;font-weight:600;">drape.digital</a>';
    $h .= ' &middot; <a href="mailto:' . $contactEmail . '" style="color:' . $accent . ';text-decoration:none;">' . $contactEmail . '</a>';
    $h .= ' &middot; <a href="' . $linkedIn . '" style="color:' . $accent . ';text-decoration:none;">LinkedIn</a>';
    $h .= '</td></tr>';
    $h .= '<tr><td style="padding-top:12px;font-size:12px;color:#666666;line-height:1.5;">';
    $h .= 'Drape Digital &middot; Tetouan, Morocco</td></tr>';
    $h .= '<tr><td style="padding-top:16px;font-size:11px;color:#555555;line-height:1.5;">';
    $h .= 'You are receiving this email because you submitted a form on ';
    $h .= '<a href="' . $siteUrl . '" style="color:' . $accent . ';text-decoration:none;">drape.digital</a>';
    $h .= ' or interacted with our services. If you believe you received this in error, ';
    $h .= 'please reply to this email or contact ';
    $h .= '<a href="mailto:' . $contactEmail . '" style="color:' . $accent . ';text-decoration:none;">' . $contactEmail . '</a>.';
    $h .= '<br>&copy; ' . $year . ' Drape Digital. All rights reserved.</td></tr>';
    $h .= '</table></td></tr>';

    // Close
    $h .= '</table>';
    $h .= '</td></tr></table>';
    $h .= '</body></html>';

    return $h;
}

function email_cta_button($url, $label)
{
    $h = '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">';
    $h .= '<tr><td align="center" style="background:linear-gradient(135deg,#0066FF,#00D1FF);border-radius:8px;">';
    $h .= '<a href="' . $url . '" target="_blank" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.5px;line-height:1;">';
    $h .= $label . '</a>';
    $h .= '</td></tr></table>';
    return $h;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';

function send_branded_mail($to, $subject, $html, $options = [])
{
    $from     = isset($options['from']) ? $options['from'] : 'contact@drape.digital';
    $fromName = isset($options['fromName']) ? $options['fromName'] : 'Drape Digital';
    $replyTo  = isset($options['replyTo']) ? $options['replyTo'] : $from;
    $bcc      = isset($options['bcc']) ? $options['bcc'] : null;

    $config = require __DIR__ . '/smtp-config.php';

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = $config['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['username'];
        $mail->Password   = $config['password'];
        $mail->SMTPSecure = $config['encryption'];
        $mail->Port       = $config['port'];
        
        // Hostinger specific tweaks for reliable sending
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        // Recipients
        $mail->setFrom($config['username'], $fromName); // MUST be the authenticated user on Hostinger
        $mail->addAddress($to);
        $mail->addReplyTo($replyTo);

        if ($bcc) {
            $mail->addBCC($bcc);
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $html;
        $mail->CharSet = 'UTF-8';

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Drape Digital mail: FAILED to send to " . $to . ". Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}

function send_mail($to, $subject, $body, $options = [])
{
    $isHtml = isset($options['html']) ? $options['html'] : false;

    if ($isHtml) {
        $html = render_branded_email($subject, $body, array(
            'preheader' => substr(strip_tags($body), 0, 120)
        ));
    } else {
        $lines = explode("\n", $body);
        $paragraphs = '';
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line !== '') {
                $paragraphs .= '<p style="margin:0 0 12px 0;font-size:15px;color:#333333;line-height:1.6;">' . $line . '</p>';
            }
        }
        $html = render_branded_email($subject, $paragraphs, array(
            'preheader' => substr(strip_tags($body), 0, 120)
        ));
    }

    return send_branded_mail($to, $subject, $html, $options);
}
