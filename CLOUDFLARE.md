# Zetbros on Cloudflare

The website runs on the `zetbros` Cloudflare Worker with static assets built by Next.js. Contact submissions are emailed to `support@zetbros.com` through the existing SpaceMail SMTP account and archived in Cloudflare D1 (`zetbros-contact`). This website no longer requires Vercel or Supabase at runtime.

The homepage retains the original logo, SVG icon artwork, page layout, and `RevealBoxText` / `ScrollRevealMotion` animations. Its content describes products for people and society, links to AIKO, and marks Harness as production in progress. All page and section backgrounds are white. Contact controls open one shared dialog over a blurred page, and the equipment warranty research page has no dark data-handling block.

## Develop and verify

```sh
npm ci
npm run build
npm test
npx wrangler d1 migrations apply zetbros-contact --local
npm run preview
```

`next dev` previews the frontend only. Use Wrangler for the contact API and local D1 together. For local email delivery, put `SMTP_USERNAME` and `SMTP_PASSWORD` in an ignored `.dev.vars` file. Production uses Worker secrets of the same names. Production database IDs in `wrangler.jsonc` are resource identifiers, not credentials. Never commit mail credentials, Cloudflare API tokens or exported enquiry data.

## Deploy

Authenticate with `npx wrangler login` or provide a scoped `CLOUDFLARE_API_TOKEN` through your deployment environment. Configure the two Worker secrets with `wrangler secret put SMTP_USERNAME` and `wrangler secret put SMTP_PASSWORD`, using the existing SpaceMail credentials. Then:

```sh
npm run deploy
```

The existing production D1 table was created through Cloudflare's API on 2026-09-21. Do not run a remote migration for routine website deployments. Workers Builds can use `npm run build` as its build command and `npx wrangler deploy` as its deploy command after the repository connection is authorized and configured. Automatic GitHub deployment is not configured by these files alone.

## Domains and data

- `zetbros.com` serves the Worker.
- `www.zetbros.com` redirects to the apex domain with HTTP 308.
- The contact endpoint is `POST /api/contact`; it accepts visitor email, subject and message, sends an email to `support@zetbros.com`, then archives it in D1. Submitted fields are validated server-side, requests must be same-origin, and a Cloudflare rate-limit binding permits five submissions per minute per IP at each Cloudflare location.
- Messages are private: there is no public read API. View them using an authenticated D1 dashboard or `wrangler d1 execute` session.
- The former `public.zetbros_contact_messages` Supabase table had zero rows at migration. The migration did not delete the source table or the shared Supabase project.
- A synthetic browser submission was verified in production D1, then deleted; zero test records remained after cleanup.

AIKO is a separate application at `aiko.zetbros.com`. Its hosting, database, authentication, and stored files are not migrated by this repository. The shared Supabase project must remain available until AIKO's separate migration has completed.

## Validation

The production build, Worker API tests, public route checks, canonical-domain redirect, write-only contact endpoint, and original logo hash comparison are part of the deployment verification. Check the shared contact dialog on desktop and mobile, including the blurred backdrop, form fields, and research subject. The Next.js dependency tree may report build-time PostCSS advisories; this deployment serves static output and does not run the Next.js server or accept user CSS.
