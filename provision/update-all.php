<?php
/**
 * Drape Digital — Bulk Template Update Script
 *
 * Re-renders ALL active client sites from the master template,
 * using stored parameters from clients.json.
 *
 * Usage:
 *   php update-all.php [--output-root=/path/to/output] [--dry-run]
 *
 * This is useful when you update the template/ files and want
 * changes to propagate to all existing client demo sites.
 */

$PROVISION_DIR  = __DIR__;
$MANIFEST_FILE  = $PROVISION_DIR . '/clients.json';
$PROVISION_SCRIPT = $PROVISION_DIR . '/provision.php';
$DEFAULT_OUTPUT = realpath($PROVISION_DIR . '/..') . '/public_html';

// Parse args
$opts = getopt('', ['output-root::', 'dry-run', 'help']);

if (isset($opts['help'])) {
    echo <<<HELP

Drape Digital — Bulk Template Update
=====================================

Re-renders all active client sites from the master template
using stored parameters from clients.json.

Usage:
  php update-all.php [--output-root=/path/to/output] [--dry-run]

Options:
  --output-root  Output root directory (default: ../public_html)
  --dry-run      Show what would be done without making changes
  --help         Show this help message


HELP;
    exit(0);
}

$outputRoot = $opts['output-root'] ?? $DEFAULT_OUTPUT;
$dryRun = isset($opts['dry-run']);

// Load manifest
if (!file_exists($MANIFEST_FILE)) {
    fwrite(STDERR, "ERROR: Manifest not found: {$MANIFEST_FILE}\n");
    exit(1);
}

$manifest = json_decode(file_get_contents($MANIFEST_FILE), true);
if (!is_array($manifest) || empty($manifest)) {
    echo "No clients found in manifest. Nothing to do.\n";
    exit(0);
}

$activeClients = array_filter($manifest, function ($entry) {
    return ($entry['status'] ?? '') === 'active';
});

echo "Drape Digital — Bulk Template Update\n";
echo "====================================\n";
echo "Found " . count($activeClients) . " active client(s) in manifest.\n";
echo "Output root: {$outputRoot}\n";
if ($dryRun) {
    echo "[DRY RUN — no changes will be made]\n";
}
echo "\n";

$success = 0;
$failed  = 0;

foreach ($activeClients as $client) {
    $slug = $client['slug'] ?? '';
    $name = $client['business_name'] ?? $slug;

    if (empty($slug)) {
        echo "  ⚠ Skipping entry with empty slug\n";
        $failed++;
        continue;
    }

    echo "  → {$name} ({$slug}.drape.digital)";

    if ($dryRun) {
        echo " [would re-render]\n";
        $success++;
        continue;
    }

    // Build command to re-provision with --force
    $cmd = sprintf(
        'php %s --business=%s --slug=%s --force --output-root=%s',
        escapeshellarg($PROVISION_SCRIPT),
        escapeshellarg($client['business_name'] ?? ''),
        escapeshellarg($slug),
        escapeshellarg($outputRoot)
    );

    // Add optional params if present
    if (!empty($client['old_domain'])) {
        $cmd .= ' --old-domain=' . escapeshellarg($client['old_domain']);
    }
    if (!empty($client['industry'])) {
        $cmd .= ' --industry=' . escapeshellarg($client['industry']);
    }
    if (!empty($client['contact_email'])) {
        $cmd .= ' --email=' . escapeshellarg($client['contact_email']);
    }
    if (!empty($client['logo_url'])) {
        $cmd .= ' --logo=' . escapeshellarg($client['logo_url']);
    }
    if (!empty($client['brand_color'])) {
        $cmd .= ' --color=' . escapeshellarg($client['brand_color']);
    }

    // Execute
    $output = [];
    $returnCode = 0;
    exec($cmd . ' 2>&1', $output, $returnCode);

    if ($returnCode === 0) {
        echo " ✓\n";
        $success++;
    } else {
        echo " ✗ (exit code: {$returnCode})\n";
        foreach ($output as $line) {
            echo "      {$line}\n";
        }
        $failed++;
    }
}

echo "\n";
echo "Results: {$success} succeeded, {$failed} failed.\n";
echo ($failed === 0) ? "✓ All client sites updated successfully.\n" : "⚠ Some updates failed — check output above.\n";
