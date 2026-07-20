<?php
/**
 * Drape Digital — SMTP Configuration
 * 
 * Hostinger blocks the unauthenticated PHP mail() function on many accounts.
 * Enter your Hostinger email password below to send mail via SMTP.
 */

return [
    // Hostinger's SMTP server
    'host'       => 'smtp.hostinger.com',
    'port'       => 465,
    'encryption' => 'ssl',

    // Your Drape Digital email account
    'username'   => 'contact@drape.digital',
    
    // REPLACE THIS WITH YOUR ACTUAL EMAIL PASSWORD
    'password'   => 'YOUR_EMAIL_PASSWORD_HERE',
];
