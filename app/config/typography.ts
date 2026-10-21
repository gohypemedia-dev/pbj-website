/**
 * Typography Token Configuration
 * Note on Client Specification:
 * - "Hoefler & Co." is the type foundry name (formerly The Hoefler Type Foundry), not a font-family.
 * - The client request specifies a body font from Hoefler & Co. (such as Chronicle Text, Mercury Text,
 *   or Hoefler Text). No licensed font files (.woff2 / .woff) are currently present in public/fonts/.
 * - Active implementation uses an editorial serif stack ('Hoefler Text', 'Baskerville', 'Georgia', serif)
 *   providing native Hoefler Text on Apple devices and classic literary serifs on other platforms,
 *   preserving the approved heading display font (Amatic SC).
 */
export const typographyTokens = {
  heading: {
    clientLabel: 'Approved condensed display',
    implementedFamily: 'Amatic SC',
    weight: 700,
    source: 'public/fonts/AmaticSC-Bold.ttf',
    license: 'SIL Open Font License 1.1'
  },
  body: {
    clientLabel: 'Requested Hoefler & Co. body font',
    foundry: 'Hoefler & Co.',
    implementedFamily: 'Hoefler Text / Baskerville / Georgia',
    source: 'System serif fallback (awaiting licensed webfont files from client)',
    recommendedFiles: ['chronicle-text.woff2', 'mercury-text.woff2', 'hoefler-text.woff2']
  },
  signature: {
    clientLabel: 'Artist monograph script / signature',
    implementedFamily: 'Hoefler Text / Baskerville / Georgia (italic)',
    style: 'italic',
    source: 'System serif fonts'
  }
} as const;

