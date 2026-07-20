<?php
/**
 * Drape Digital — Client Site Provisioning Script
 *
 * Usage:
 *   php provision.php --business="Joe's Barbershop" --slug=joesbarbershop \
 *       [--old-domain=joesbarbershop.com] [--industry=barbershop] \
 *       [--email=joe@example.com] [--logo=https://...] [--color=#FF5733]
 *
 * Generates a complete demo site in the output directory from the template/
 * folder, replacing all {{PLACEHOLDER}} tokens with the provided values.
 */

// ─── Configuration ───────────────────────────────────────────────────
$PROVISION_DIR  = __DIR__;
$TEMPLATE_DIR   = $PROVISION_DIR . '/template';
$MANIFEST_FILE  = $PROVISION_DIR . '/clients.json';

// Default output root: ../public_html (on Hostinger, subdomains map here)
// Override with --output-root=/path/to/output
$DEFAULT_OUTPUT = realpath($PROVISION_DIR . '/..') . '/public_html';

// ─── Parse CLI arguments ─────────────────────────────────────────────
$opts = getopt('', [
    'business:',
    'slug:',
    'old-domain::',
    'industry::',
    'email::',
    'logo::',
    'color::',
    'output-root::',
    'force',        // Overwrite existing client directory
    'help',
]);

if (isset($opts['help']) || empty($opts['business']) || empty($opts['slug'])) {
    echo <<<HELP

Drape Digital — Client Site Provisioning
========================================

Usage:
  php provision.php --business="Business Name" --slug=businessname [options]

Required:
  --business     Business display name (e.g. "Joe's Barbershop")
  --slug         Subdomain slug (e.g. joesbarbershop → joesbarbershop.drape.digital)

Optional:
  --old-domain   Client's existing domain (e.g. joesbarbershop.com)
  --industry     Industry/niche (e.g. barbershop, restaurant, dental)
  --email        Client contact email
  --logo         URL to client's logo image
  --color        Brand color hex (e.g. #FF5733), default: #00D1FF
  --output-root  Output root directory (default: ../public_html)
  --force        Overwrite existing client directory
  --help         Show this help message

Example:
  php provision.php --business="Joe's Barbershop" --slug=joesbarbershop \\
      --industry=barbershop --email=joe@example.com --color=#D4A853

Output:
  Creates {output-root}/{slug}/ with the complete demo site.
  Updates clients.json manifest.


HELP;
    exit(0);
}

// ─── Gather values ───────────────────────────────────────────────────
$businessName = $opts['business'];
$slug         = strtolower(preg_replace('/[^a-z0-9\-]/', '', strtolower($opts['slug'])));
$oldDomain    = $opts['old-domain'] ?? '';
$industry     = $opts['industry'] ?? 'business';
$email        = $opts['email'] ?? '';
$logoUrl      = $opts['logo'] ?? 'https://drape.digital/og-image.png';
$brandColor   = $opts['color'] ?? '#00D1FF';
$outputRoot   = $opts['output-root'] ?? $DEFAULT_OUTPUT;
$force        = isset($opts['force']);
$year         = date('Y');

$outputDir = rtrim($outputRoot, '/\\') . '/' . $slug;

// Validate slug
if (empty($slug)) {
    fwrite(STDERR, "ERROR: Invalid slug. Must contain only lowercase letters, numbers, and hyphens.\n");
    exit(1);
}

// Check if output already exists
if (is_dir($outputDir) && !$force) {
    fwrite(STDERR, "ERROR: Directory already exists: {$outputDir}\n");
    fwrite(STDERR, "Use --force to overwrite.\n");
    exit(1);
}

// ─── Token map ───────────────────────────────────────────────────────
$tokens = [
    '{{BUSINESS_NAME}}' => htmlspecialchars($businessName, ENT_QUOTES, 'UTF-8'),
    '{{SLUG}}'          => $slug,
    '{{OLD_DOMAIN}}'    => htmlspecialchars($oldDomain, ENT_QUOTES, 'UTF-8'),
    '{{INDUSTRY}}'      => htmlspecialchars($industry, ENT_QUOTES, 'UTF-8'),
    '{{BRAND_COLOR}}'   => $brandColor,
    '{{LOGO}}'          => htmlspecialchars($logoUrl, ENT_QUOTES, 'UTF-8'),
    '{{YEAR}}'          => $year,
    '{{CONTACT_EMAIL}}' => htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
    '{{SUBDOMAIN}}'     => $slug . '.drape.digital',
    '{{FULL_URL}}'      => 'https://' . $slug . '.drape.digital',
];

// ─── Process template directory ──────────────────────────────────────

/**
 * Recursively copy template dir, replacing tokens in file contents and filenames.
 */
function process_template(string $src, string $dest, array $tokens): int
{
    $fileCount = 0;

    if (!is_dir($dest)) {
        mkdir($dest, 0755, true);
    }

    $items = scandir($src);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;

        $srcPath  = $src . '/' . $item;
        $destItem = str_replace(array_keys($tokens), array_values($tokens), $item);
        $destPath = $dest . '/' . $destItem;

        if (is_dir($srcPath)) {
            $fileCount += process_template($srcPath, $destPath, $tokens);
        } else {
            $content = file_get_contents($srcPath);
            $content = str_replace(array_keys($tokens), array_values($tokens), $content);
            file_put_contents($destPath, $content);
            $fileCount++;
        }
    }

    return $fileCount;
}

// Verify template exists
if (!is_dir($TEMPLATE_DIR)) {
    fwrite(STDERR, "ERROR: Template directory not found: {$TEMPLATE_DIR}\n");
    exit(1);
}

echo "Provisioning: {$businessName} → {$slug}.drape.digital\n";
echo "Output dir:   {$outputDir}\n";
echo "─────────────────────────────────────────────\n";

// If force and exists, remove old dir
if (is_dir($outputDir) && $force) {
    echo "Removing existing directory (--force)...\n";
    // Recursive delete
    $it = new RecursiveDirectoryIterator($outputDir, RecursiveDirectoryIterator::SKIP_DOTS);
    $files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
    foreach ($files as $file) {
        if ($file->isDir()) {
            rmdir($file->getRealPath());
        } else {
            unlink($file->getRealPath());
        }
    }
    rmdir($outputDir);
}

$fileCount = process_template($TEMPLATE_DIR, $outputDir, $tokens);

echo "Generated {$fileCount} files.\n";

// ─── Update manifest ────────────────────────────────────────────────
$manifest = [];
if (file_exists($MANIFEST_FILE)) {
    $manifest = json_decode(file_get_contents($MANIFEST_FILE), true) ?: [];
}

// Remove existing entry for this slug (if --force re-provisioning)
$manifest = array_values(array_filter($manifest, function ($entry) use ($slug) {
    return ($entry['slug'] ?? '') !== $slug;
}));

$manifest[] = [
    'slug'          => $slug,
    'business_name' => $businessName,
    'old_domain'    => $oldDomain,
    'industry'      => $industry,
    'contact_email' => $email,
    'logo_url'      => $logoUrl,
    'brand_color'   => $brandColor,
    'date'          => date('Y-m-d H:i:s'),
    'status'        => 'active',
];

file_put_contents(
    $MANIFEST_FILE,
    json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n"
);

echo "Manifest updated: {$MANIFEST_FILE}\n";
echo "─────────────────────────────────────────────\n";
echo "✓ Done! Site ready at: {$slug}.drape.digital\n";
echo "\n";
echo "Next steps:\n";
echo "  1. Ensure *.drape.digital DNS points to 88.223.85.195\n";
echo "  2. In hPanel → Hosting → Subdomains:\n";
echo "     Create subdomain: {$slug}.drape.digital\n";
echo "     Document root: public_html/{$slug}\n";
echo "  3. (Or use wildcard subdomain — see provision/README.md)\n";
echo "\n";
