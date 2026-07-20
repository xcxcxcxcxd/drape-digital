# Drape Digital — Client Site Provisioning System

Automated subdomain demo site generator. One command creates a complete, branded client demo at `{slug}.drape.digital`.

## Quick Start

### Provision a New Client

```bash
php provision.php \
    --business="Joe's Barbershop" \
    --slug=joesbarbershop \
    --industry=barbershop \
    --email=joe@example.com \
    --color=#D4A853
```

This generates a complete demo site in `../public_html/joesbarbershop/` with all client references filled in.

### Available Options

| Option | Required | Description | Default |
|--------|----------|-------------|---------|
| `--business` | ✅ | Business display name | — |
| `--slug` | ✅ | Subdomain slug (lowercase, alphanumeric + hyphens) | — |
| `--old-domain` | | Client's existing domain | empty |
| `--industry` | | Industry/niche (e.g. barbershop, restaurant) | `business` |
| `--email` | | Client contact email | empty |
| `--logo` | | URL to client's logo image | og-image.png |
| `--color` | | Brand color hex (e.g. `#FF5733`) | `#00D1FF` |
| `--output-root` | | Output root directory | `../public_html` |
| `--force` | | Overwrite existing client directory | false |

### Update All Client Sites

When you update the master template, propagate changes to all clients:

```bash
# Preview what would be updated
php update-all.php --dry-run

# Actually re-render all client sites
php update-all.php
```

---

## DNS Setup (Wildcard Subdomain)

A wildcard subdomain is the cleanest approach — it makes provisioning truly one-step (no manual hPanel subdomain creation per client).

### Option A: Wildcard DNS (Recommended)

Add a single DNS record that routes all subdomains to your server:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | `*` | `88.223.85.195` | 3600 |

This means `anything.drape.digital` will resolve to your Hostinger server.

> **Note:** Confirm your Hostinger plan supports wildcard subdomains (most do, including Premium and Business plans).

### Option B: Per-Client DNS

If wildcards aren't available, create each subdomain individually:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `joesbarbershop` | `88.223.85.195` | 3600 |
| A | `acme-corp` | `88.223.85.195` | 3600 |

---

## How Subdomains Resolve on Hostinger

### Architecture
1. **Subdomains:** You must add a wildcard DNS A Record (`*.drape.digital → 88.223.85.195`).
2. **Automated Routing:** Do not create a Subdomain in the Hostinger panel. Hostinger will pass wildcard subdomain traffic to your main `public_html` directory. The master `.htaccess` file in `public_html` intercepts this and transparently routes the visitor directly to their respective folder (`public_html/[slug]/`).
3. **Directory Structure:** The provisioning script generates static files into `../public_html/[slug]/`.
4. **API Integration:** The generated `php/contact.php` forwards form submissions to your main API (`https://drape.digital/api/contact`) with the client's slug embedded as the source tag.

---

## File Structure

```
provision/
├── provision.php       # CLI provisioning script
├── update-all.php      # Bulk re-render script
├── clients.json        # Manifest of all provisioned clients
├── README.md           # This file
└── template/           # Master template (with {{PLACEHOLDERS}})
    ├── index.html      # Client demo site HTML
    ├── .htaccess       # Per-client Apache config
    ├── assets/
    │   └── style.css   # Client demo stylesheet
    └── php/
        └── contact.php # Client contact form handler
```

## Template Tokens

The following tokens are replaced during provisioning:

| Token | Description |
|-------|-------------|
| `{{BUSINESS_NAME}}` | Client's business name |
| `{{SLUG}}` | Subdomain slug |
| `{{OLD_DOMAIN}}` | Client's existing domain |
| `{{INDUSTRY}}` | Industry/niche |
| `{{BRAND_COLOR}}` | Hex color for brand accent |
| `{{LOGO}}` | URL to client's logo |
| `{{YEAR}}` | Current year |
| `{{CONTACT_EMAIL}}` | Client's email |
| `{{SUBDOMAIN}}` | Full subdomain (e.g. `joesbarbershop.drape.digital`) |
| `{{FULL_URL}}` | Full URL (e.g. `https://joesbarbershop.drape.digital`) |

## `clients.json` Manifest

The manifest tracks every provisioned client:

```json
[
  {
    "slug": "joesbarbershop",
    "business_name": "Joe's Barbershop",
    "old_domain": "joesbarbershop.com",
    "industry": "barbershop",
    "contact_email": "joe@example.com",
    "logo_url": "https://...",
    "brand_color": "#D4A853",
    "date": "2026-06-14 12:00:00",
    "status": "active"
  }
]
```

This manifest can later feed an aggregate "Our Work" portfolio section on the main drape.digital site automatically.

---

## Email Deliverability — DMARC Upgrade Path

Current DNS DMARC record: `v=DMARC1; p=none`

### Upgrade sequence (after confirming mail alignment via mail-tester.com):

1. **Phase 1 (now):** `v=DMARC1; p=none` — monitor only
2. **Phase 2:** `v=DMARC1; p=quarantine; rua=mailto:dmarc@drape.digital; fo=1`
3. **Phase 3:** `v=DMARC1; p=reject; rua=mailto:dmarc@drape.digital; fo=1`

### DNS records to verify:
- **SPF:** `v=spf1 include:_spf.mail.hostinger.com ~all` ✅
- **DKIM:** `hostingermail1._domainkey` ✅
- **DMARC:** Upgrade as above

Test all three via [mail-tester.com](https://www.mail-tester.com) before going live.

### Future: SMTP Upgrade
For reliable inboxing at volume, consider upgrading from `mail()` to SMTP via PHPMailer or a transactional service (Hostinger SMTP, SendLayer, or Mailgun). The current `mail()` setup with proper `-f` envelope, DKIM, and SPF is sufficient for moderate volume.
