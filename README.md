This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

All application code lives in `app/`; there is no separate `src/` tree.

```text
app/
  components/    Shared UI, including the header and opening animation
  config/        Typography configuration
  data/          Artist, artwork, and exhibition content
  about/         About page
  contact/       Contact page
  exhibitions/   Exhibitions page
  works/         Gallery and artwork detail pages
  globals.css    Tailwind entrypoint
  site.css       Site typography, layout, and opening animation styles
  layout.tsx     Root layout
  page.tsx       Homepage
public/          Static artwork, fonts, and other assets
```

The `@/*` import alias resolves to `app/*`, so `@/components/Header` loads `app/components/Header.tsx`. Shared folders do not create routes unless they contain a `page.tsx` or `route.ts` file.

The project uses `next/font/local` to load bundled Amatic SC display, Allura signature, and Manrope interface fonts from `public/fonts/`. Lenis provides smooth scrolling, with reduced-motion preferences respected.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
