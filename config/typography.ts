/**
 * Typography Configuration & Client Font Verification Handoff
 *
 * Client Requirements:
 * - Heading font label: "picsue sans by eko" (Picsue Sans by Eko Bimantara - condensed display sans-serif)
 * - Body font label: "hoefler and co by hofler and co" (Hoefler & Co foundry)
 *
 * Technical Verification Note:
 * Outstanding Dependency: No licensed .woff2 / .woff webfont files were supplied in the project.
 *
 * Implementation & High-Fidelity Fallback Strategy:
 * 1. Headings use 'Picsue Sans' font-face hook backed by 'Oswald' and 'Syne' (condensed/narrow display sans-serif):
 *    Narrow proportions and uppercase letterforms bring heading character visibly closer to the client reference.
 *    Full Unicode Latin Extended support verifies the macron glyphs in "PRĀKASH BĀL JOSHI".
 * 2. Body text uses 'Hoefler and Co' font-face hook backed by 'Hoefler Text' (native on Apple) and 'Newsreader' (Google Fonts).
 *
 * How to drop in licensed files:
 * 1. Place font files in /public/fonts/
 *    e.g. /public/fonts/picsue-sans.woff2, /public/fonts/hoefler-and-co.woff2
 * 2. The @font-face declarations are active in app/globals.css.
 */

export interface TypographyTokens {
  heading: {
    clientLabel: string;
    implementedFamily: string;
    fallbackStack: string;
    licenseStatus: "Outstanding Dependency (Awaiting Client Files)" | "Licensed File Active";
  };
  body: {
    clientLabel: string;
    implementedFamily: string;
    fallbackStack: string;
    licenseStatus: "Outstanding Dependency (Native Hoefler Text on Apple / Newsreader on Web)" | "Licensed File Active";
  };
}

export const typographyTokens: TypographyTokens = {
  heading: {
    clientLabel: "picsue sans by eko",
    implementedFamily: "Picsue Sans (Fallback: Oswald / Syne)",
    fallbackStack: "'Picsue Sans', 'Oswald', 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    licenseStatus: "Outstanding Dependency (Awaiting Client Files)"
  },
  body: {
    clientLabel: "hoefler and co by hofler and co",
    implementedFamily: "Hoefler and Co (Fallback: Hoefler Text / Newsreader)",
    fallbackStack: "'Hoefler and Co', 'Hoefler Text', 'Newsreader', 'Cormorant Garamond', 'Baskerville', 'Georgia', serif",
    licenseStatus: "Outstanding Dependency (Native Hoefler Text on Apple / Newsreader on Web)"
  }
};
