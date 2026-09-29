# Business and research website update

Scope: the public Zetbros website only. No mailbox, SMTP, aliases, DNS, provider settings, claim storage, payments or dealer outreach are changed by this work.

## Public structure

- Products remain AIKO and Harness. The logo assets, original SVG artwork and existing reveal components/styles are retained.
- Business solutions link to the existing AI, automation and infrastructure project-pattern pages. On-site infrastructure remains Japan-only.
- Research links to `/equipment-warranty-research`, explicitly labelled Research / validation rather than a launched product.
- About identifies Logan as founder and product/AI engineering contact without inventing client results, a large team, credentials, a legal entity or an office address.
- `logan@zetbros.com` is displayed as the business/research contact. Product support remains `support@zetbros.com`. Displaying an address is not verification of outbound alias configuration.

## Enquiries and data

The shared form adds an optional company name, Business project and Equipment warranty research topics, and a short research-enquiry variant. All use the existing same-origin `/api/contact` endpoint and D1 database. Success means the enquiry was saved; it does not claim an email notification was sent.

The research page does not accept claim uploads. Initial contact must not include confidential records or credentials. Any later pilot needs separately agreed data scope, transfer, access, processing tools, retention and deletion. There is no claim of a certified or already deployed document portal.

The public research content describes proposed review outputs and what would count as useful new evidence. It does not report completed buyer interviews, recoveries or paid commitments.

## Verify

```sh
npm ci
npm run build
npm run lint
npm test
node --test tests/site.test.mjs
```

The site checks inspect actual exported HTML for page-specific canonicals, share metadata, navigation targets, research boundaries, sitemap routes and original logo/infrastructure hashes. GitHub Actions retains a short-lived static preview artifact for inspection. These checks do not prove a live deployment or mailbox delivery.

## Deployment

Keep the existing Cloudflare deployment process in `CLOUDFLARE.md`. A GitHub commit and a successful Build run do not by themselves establish that the live Worker was deployed. Verify the live homepage, research page, privacy page and sitemap after deployment. No new database migration is required for the existing optional company field.
