# Business and research website update

Scope: the public Zetbros website only. No mailbox, SMTP, aliases, DNS, provider settings, payments, claim storage or dealer outreach are changed by this work.

## Reconciliation

While this feature branch was being tested, main advanced from a1cc09b to 9a450644 with an overlapping website implementation. The reconciliation starts from the newer main tree, retaining its homepage copy/layout, About section, research-page styling, business-page descriptions, privacy content and App Router robots/sitemap routes. It adds the remaining enquiry, metadata and validation improvements rather than replacing those concurrent changes. Obsolete alternate homepage components and duplicate static metadata routes from the initial feature implementation are not carried forward.

## Public structure

- Products remain AIKO and Harness. Original logo assets, SVG artwork, typography and existing reveal components/styles are retained.
- Business solutions link to existing AI, automation and infrastructure project-pattern pages. On-site infrastructure remains Japan-only.
- Research links to `/equipment-warranty-research`, labelled as research validation rather than a released product.
- About identifies Logan as founder and product/AI engineering contact without inventing client results, a large team, a legal entity or an office address.
- `logan@zetbros.com` is displayed as the business/research contact; product support remains `support@zetbros.com`. Displaying an address does not verify or configure the sending identity.

## Enquiries and data

The shared contact form retains an optional company name and Business project / Equipment warranty research topics and adds a short research-enquiry variant. Both variants use the existing same-origin `/api/contact` endpoint and D1 database. Success means the enquiry was saved; no email-notification delivery is implied.

The research page does not accept claim uploads. Initial contact must not include confidential records or credentials. Any later pilot needs separately agreed data scope, transfer, access, processing tools, retention and deletion. There is no claim of a certified or already deployed document portal, completed recoveries or paid commitments.

## Verify

```sh
npm ci
npm run build
npm run lint
npm test
node --test tests/site.test.mjs
```

CI uses Node 22 to satisfy the locked deployment tooling's engine requirement. Generated-HTML checks cover all eight public routes, page-specific canonical/share metadata, internal links, research boundaries, sitemap and original logo/infrastructure hashes. A short-lived static preview artifact is retained for inspection even if a later acceptance assertion fails after a successful build. Tests do not establish a live deployment or mailbox delivery.

## Deployment

Use the existing Cloudflare deployment process in `CLOUDFLARE.md`. A GitHub commit and a successful Build run do not by themselves prove that the live Worker was deployed. Check the live homepage, research page, privacy page and sitemap after deployment. No database migration or mail/DNS change is needed for these website updates.
