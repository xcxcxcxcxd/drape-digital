<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$to = 'contact@drape.digital'; // Change this to your personal email to test external delivery
if (isset($_GET['to'])) {
    $to = $_GET['to'];
}

$subject = 'Hostinger PHP Mail Test';
$message = 'If you are reading this, PHP mail() is working on Hostinger.';
$headers = "From: contact@drape.digital\r\n";
$headers .= "Reply-To: contact@drape.digital\r\n";

echo "Attempting to send email to: " . htmlspecialchars($to) . "<br>";

$result = mail($to, $subject, $message, $headers);

if ($result) {
    echo "✅ mail() function returned TRUE. The email was accepted by Hostinger's mail server for delivery.<br>";
    echo "If it doesn't arrive in your inbox (or spam), Hostinger's outgoing mail filter is dropping it.";
} else {
    echo "❌ mail() function returned FALSE. Hostinger blocked the PHP script from sending.";
}
