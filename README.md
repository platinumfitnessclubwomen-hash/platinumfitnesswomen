# Platinum Fitness Club — Women Exclusive

A static, multi-page website for the three women-only Hyderabad studios:

| Studio | Page | Rating | Phone |
|---|---|---|---|
| Malakpet | `malakpet.html` | 4.7 · 307 reviews | 092810 22896 |
| Attapur | `attapur.html` | 4.9 · 666 reviews | 098493 40257 |
| Saidabad | `saidabad.html` | 5.0 · 40 reviews | 092810 22891 |

Home page: `index.html`. 404: `404.html`.

Everything is plain HTML, one CSS file and one small JS file — no build step needed to host.
`build.mjs` only regenerates the three branch pages, `sitemap.xml` and `robots.txt` from the
copy held in one place.

---

## 1. Editing content

### Branch pages (recommended route)

Open `build.mjs`. All branch copy lives in the `branches` array near the top:

- `meta` — the search description for that page
- `rating`, `reviews`, `members` — shown in badges, facts, schema
- `phoneDisplay`, `phoneRaw`, `wa` — phone and WhatsApp number
- `open`, `close` — 24-hour format, used for the "Open now" pill and schema
- `address`, `geo`, `plus` — map, directions, local schema
- `nearby` — the localities listed for local SEO
- `intro`, `story`, `amenities`, `programmes`, `reasons`, `local`
- `quotes` — Google review excerpts
- `faq` — also written into FAQ structured data

After changing anything, run:

```bash
node build.mjs
```

### Home page

Edit `index.html` directly. It contains the hero, clinical fitness section, programmes,
studios, area-wise block, reviews and FAQ. Its FAQ structured data is in the `<head>` —
if you add or change a visible FAQ, update that JSON too (search engines require them to match).

### Prices

No rupee figures are printed anywhere, on purpose: the current Google Business Profiles advertise
"3 months + 1 month free" and a free trial, and the plan sheet is shared on WhatsApp. If you want
prices on the site, replace the `Ask your studio` / `Get the plan sheet` blocks in the
`#membership` section of `index.html` with an amount — and add a `price` to the membership
offers in each branch page's JSON-LD.

---

## 2. Deploying to GitHub Pages

The site is already pushed to:

```
https://github.com/platinumfitnessclubwomen-hash/platinumfitnesswomen
```

Live URL:

```
https://platinumfitnessclubwomen-hash.github.io/platinumfitnesswomen/
```

To publish an update:

```bash
git add -A
git commit -m "Update site"
git push
```

GitHub Pages rebuilds in about a minute. `.nojekyll` is included so GitHub serves the files as-is.

### Custom domain (platinumfitnessclubwomenexclusive.com)

The domain currently points at the old Wix site. When you are ready to switch:

1. Create a file named `CNAME` in the repo root containing exactly:
   `platinumfitnessclubwomenexclusive.com`
2. In your domain registrar's DNS:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `platinumfitnessclubwomen-hash.github.io`
3. In GitHub → Settings → Pages, set the custom domain and tick **Enforce HTTPS**.
4. Replace every `https://platinumfitnessclubwomen-hash.github.io/platinumfitnesswomen` in the HTML,
   `sitemap.xml` and `robots.txt` with `https://platinumfitnessclubwomenexclusive.com`.
   In `build.mjs` this is the `BASE` constant at the top.
5. Keep the old Wix site live until DNS has propagated, then cancel it.

---

## 3. Local SEO checklist (do these after publishing)

1. **Google Search Console** — add the domain, verify by DNS, submit `sitemap.xml`.
2. **Bing Webmaster Tools** — import from Search Console, submit the same sitemap.
3. **Google Business Profiles** — set the website field on all three listings to the matching
   branch page (not the home page). That is the single biggest local SEO win:
   - Malakpet → `.../malakpet.html`
   - Attapur → `.../attapur.html`
   - Saidabad → `.../saidabad.html`
4. **Keep NAP identical** — name, address, phone must match the site, the GBP listing,
   Justdial, Practo and social pages, character for character.
5. **Weekly GBP posts** — the offer and class updates already written on the branch pages can be
   reused as Google posts. Post the same offer on all three profiles.
6. **Reviews** — reply to every new review within 48 hours, and mention the studio name and area
   ("Thank you for training with us in Attapur"). Ask happy members for reviews via the GBP
   "Ask for reviews" link, not a third-party tool.
7. **Photos** — upload real photos of each studio to its GBP listing weekly. The website currently
   uses typographic art rather than stock photography, which is deliberate; add real studio photos
   when you have them and the site will look even stronger.
8. **Local citations** — Justdial, Sulekha, Practo (for the physio clinic), Hyderabad directories.
   Use the exact addresses above.
9. **Track calls** — every phone number on the site is a `tel:` link, so Google can attribute
   calls from mobile. Keep the numbers branch-specific so you can see which studio each call came from.

### What is already built in

- Unique title, description, canonical and Open Graph tags per page
- `HealthClub` schema per studio: address, geo, hours, rating, amenities, area served, offers
- `Organization` + `WebSite` + `FAQPage` schema on the home page
- `BreadcrumbList` on each branch page
- FAQ blocks that match the FAQ schema
- Area-wise content (Malakpet / Dilsaghnagar / LB Nagar; Attapur / Mehdipatnam / Tolichowki;
  Saidabad / Saroornagar / Champapet) without keyword stuffing
- `sitemap.xml`, `robots.txt`, `.nojekyll`, a branded 404 page
- Open-now indicator calculated in IST, so it is correct for Hyderabad visitors
- Mobile sticky call / WhatsApp / directions bar
- Accessibility: skip link, focus states, semantic headings, ARIA labels, reduced-motion support

---

## 4. Files

```
index.html          Home
malakpet.html       Branch page (generated)
attapur.html        Branch page (generated)
saidabad.html       Branch page (generated)
404.html            Not-found page
build.mjs           Regenerates branch pages + sitemap + robots
sitemap.xml         Generated
robots.txt          Generated
assets/css/style.css
assets/js/main.js
assets/img/         favicon, logo, Open Graph image
```

## 5. Content accuracy

Ratings, review counts, phone numbers, hours and addresses were taken from the three Google
Business Profiles on 19 November 2026. The "500+ active members" figure is the club's own claim and
appears as visible copy only. Review excerpts are shortened quotes from public Google reviews.

The clinical section is deliberately worded as **fitness informed by clinical guidance**, not medical
treatment, and includes a disclaimer. Keep that distinction if you edit the copy.
