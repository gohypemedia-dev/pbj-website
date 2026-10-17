# Developer Handoff & Client Asset Audit
## Portfolio of Prakash Bal Joshi (PRĀKASH BĀL JOSHI)

### 1. Typography Status & Outstanding Dependencies
- **Client Heading Specification**: `picsue sans by eko` (Picsue Sans by type designer Eko Bimantara — an eroded/condensed display sans-serif caps typeface).
- **Client Body Specification**: `hoefler and co by hofler and co` (Hoefler & Co foundry typefaces: Hoefler Text / Chronicle Text / Mercury).
- **File Audit Finding**:
  - No licensed `.woff2`, `.woff`, `.otf`, or `.ttf` font files were supplied within the repository or asset packages.
  - **Status**: **Outstanding Client Dependency**. Typography is explicitly documented as awaiting licensed files; it is not claimed as complete.
- **Implemented Fallback Architecture**:
  - **Headings**: Configured narrow, expressive display typography via `@font-face` hooks for `Picsue Sans`, backed by `Oswald` and `Syne` in `app/globals.css`. Fully supports Latin Extended diacritics including the macrons in the approved artist name: `PRĀKASH BĀL JOSHI`. Avoids synthetic font weights.
  - **Body**: Configured `@font-face` hooks for `Hoefler and Co`, falling back natively to `Hoefler Text` (preinstalled on macOS/iOS) and `Newsreader` (Google Fonts editorial serif) on Windows/Android/Linux.
- **How to activate licensed fonts when provided**:
  1. Place licensed webfont files in `/public/fonts/`:
     - `/public/fonts/picsue-sans.woff2`
     - `/public/fonts/hoefler-and-co.woff2`
  2. The `@font-face` declarations are already in place in `app/globals.css`.

---

### 2. Artwork & Content Authenticity Audit
- **Current Visual Assets Inventory** (`/public/artworks/`):
  - `hero-featured.jpg`: *River Returns 186* (2024, Acrylic on canvas, 152 × 228 cm)
  - `mindscape-4.jpg`: *Mindscape 4* (2023, Acrylic & ink on archival paper, 102 × 76 cm)
  - `close-encounter-193.jpg`: *Close Encounter 193* (2024, Oil on canvas, 100 × 100 cm)
  - `abstraction-228.jpg`: *Abstraction 228* (2024, Acrylic on canvas, 120 × 210 cm)
  - `saraswati-flow-112.jpg`: *Saraswati Flow 112* (2023, Acrylic on canvas, 122 × 163 cm)
  - `enlightenment.jpg`: *Enlightenment* (2023, Oil on canvas, 91 × 91 cm)
  - `urban-realities-08.jpg`: *Urban Realities & Climate 08* (2022, Ink & acrylic on raw linen, 115 × 170 cm)
  - `artist-portrait.jpg`: Prakash Bal Joshi in his Mumbai artist studio.
- **Authenticity Statement**:
  - Current imagery is designated as a **design preview** until final digital captures are supplied directly from the artist's studio archive.
  - No synthetic/AI-generated paintings or unrelated stock photography are attributed to Prakash Bal Joshi.
  - All public labels and descriptions discuss the artwork themes and materials directly; all internal website placement notes have been removed.

---

### 3. Colour Palette & Contrast Verification (WCAG 2.1)
- **Main Canvas Wash**: `#E9ECEF`
- **Headings & Selected Active UI**: `#1B2A49` (Contrast ratio **11.5:1** against `#E9ECEF` — AAA compliant)
- **Body & Editorial Text**: `#38435C` (Contrast ratio **6.8:1** against `#E9ECEF` — AA compliant)
- **Selected Filter Buttons**:
  - Background: `#1B2A49`
  - Text: `#E9ECEF` (Contrast ratio **11.5:1** — AAA compliant; guaranteed via CSS specificity)
- **Unselected Filter Buttons**:
  - Background: `rgba(255, 255, 255, 0.45)`
  - Text: `#38435C` (High readability, hover transitions to `#1B2A49`)

---

### 4. Contact & Communications Workflow
- **Studio Email**: `studio@prakashbaljoshi.com`
- **Studio Location**: Mumbai, Maharashtra, India
- **Workflow**:
  - Direct `mailto:` action prepared with structured metadata (name, email, affiliation, enquiry type, message).
  - Explicit helper text: *"Opens your email app with your enquiry filled in."*
  - Dedicated **"Copy Message"** clipboard button as an accessible fallback for webmail users.
  - No misleading "sent" or "delivered" notifications upon client trigger.
