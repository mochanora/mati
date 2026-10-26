# Mati Advisory website

Static site for www.matiadvisory.com, hosted on GitHub Pages. No build step: edit the HTML and push.

## Pages

| File | URL |
|---|---|
| `index.html` | `/` |
| `services.html` | `/services` |
| `about.html` | `/about` |
| `contact-us.html` | `/contact-us` |
| `404.html` | any missing page |
| `appointment.html` | old Odoo booking link, redirects to the contact form |

Styles are in `assets/site.css` (brand colours are the variables at the top). Menu and contact-form behaviour is in `assets/site.js`.

## 1. Put the files on GitHub

1. Upload everything in this folder (including `CNAME` and `.nojekyll`) to the root of `mochanora/mati`, on the `main` branch.
2. In the repo, go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.
3. Under *Custom domain*, `www.matiadvisory.com` should already show (it comes from the `CNAME` file). Save it if not.

## 2. Turn on the contact form (Formspree)

1. Create a free account at formspree.io with contact@matiadvisory.com and create a form.
2. Copy the form ID (the part after `/f/`, e.g. `xpwzabcd`).
3. In `contact-us.html`, replace `YOUR_FORM_ID` with it.

Until then the form still works: pressing *Send message* opens the visitor's email app with their message filled in, addressed to contact@matiadvisory.com.

## 3. Point the domain at GitHub

At your domain registrar's DNS settings:

1. **Remove** the existing records that point the website to Odoo (usually a CNAME for `www` pointing to `mati-advisory.odoo.com`, and any A record on the root `@`).
2. **Add** these:

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `mochanora.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

3. **Do not touch MX or TXT records** — those run your email.
4. After DNS updates (minutes to a few hours), go back to **Settings → Pages** and tick **Enforce HTTPS** once it becomes available.

Before cancelling Odoo, also remove the domain from the Odoo website settings so it stops claiming it.

## Brand font

Headings are designed for **TT Firs Neue** (licensed, from TypeType). If you hold a web licence, add these files to `assets/fonts/` and they load automatically:

- `TTFirsNeue-Medium.woff2`
- `TTFirsNeue-DemiBold.woff2`
- `TTFirsNeue-Bold.woff2`

Without them, headings use Inter Bold, as the brand guidelines allow.
