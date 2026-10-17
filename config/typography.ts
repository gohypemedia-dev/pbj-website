/**
 * Typography Configuration & Client Font Verification Handoff
 *
 * Client Requirements:
 * - Heading font label: "picsue sans by eko"
 * - Body font label: "hoefler and co by hofler and co"
 *
 * Technical Verification Note:
 * Neither label corresponds to a standard default CSS font-family name.
 * - "hoefler and co" refers to the world-renowned type foundry Hoefler&Co (creators of
 *   Hoefler Text, Chronicle Text, Mercury, Sentinel, Archer, Didot).
 * - "picsue sans by eko" refers to a custom/foundry typeface label by Eko.
 *
 * Implementation & Temporary Fallback Strategy:
 * Per specification, until the client provides the licensed .woff2 / .woff webfont files:
 * 1. Headings use 'Syne' (Google Fonts) paired with narrow, expressive geometric display sans fallbacks:
 *    ['Syne', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif]
 * 2. Body text uses 'Newsreader' (Google Fonts) paired with local Hoefler & Co typefaces:
 *    ['Newsreader', 'Hoefler Text', 'Cormorant Garamond', 'Baskerville', 'Georgia', serif]
 *    Note: macOS and iOS devices natively support 'Hoefler Text', which activates automatically!
 *
 * How to drop in licensed files:
 * 1. Place font files in /public/fonts/
 *    e.g. /public/fonts/picsue-sans-regular.woff2, /public/fonts/hoefler-regular.woff2
 * 2. Uncomment the @font-face rules in /app/globals.css
 * 3. Update the font variable mappings below.
 */

export interface TypographyTokens {
  heading: {
    clientLabel: string;
    implementedFamily: string;
    fallbackStack: string;
    licenseStatus: "Fallback Active (Awaiting Client Files)" | "Licensed File Active";
  };
  body: {
    clientLabel: string;
    implementedFamily: string;
    fallbackStack: string;
    licenseStatus: "Fallback Active (Native Hoefler Text on Apple / Newsreader on Web)" | "Licensed File Active";
  };
}

export const typographyTokens: TypographyTokens = {
  heading: {
    clientLabel: "picsue sans by eko",
    implementedFamily: "Syne",
    fallbackStack: "'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    licenseStatus: "Fallback Active (Awaiting Client Files)"
  },
  body: {
    clientLabel: "hoefler and co by hofler and co",
    implementedFamily: "Newsreader",
    fallbackStack: "'Newsreader', 'Hoefler Text', 'Cormorant Garamond', 'Baskerville', 'Georgia', serif",
    licenseStatus: "Fallback Active (Native Hoefler Text on Apple / Newsreader on Web)"
  }
};
