# Business and research website

The public Zetbros site presents products for people and society, practical business solutions, and the equipment warranty research pilot. The original logo, icons, and scroll reveals remain. Page and section backgrounds are white; the research page does not include a dark data-handling block. The research pilot is clearly labelled as validation, not a released product or a proven recovery service.

Contact controls throughout the site open a white dialog over a blurred page. Visitors provide their email, subject, and message. The research variant prefills its subject. Both send through the existing same-origin `POST /api/contact` Worker endpoint to `support@zetbros.com` using the existing SpaceMail SMTP account. The Worker also archives a copy in the existing D1 contact table. Project discussion forms on the business detail pages use the same endpoint with their project context.

The public site does not accept claim uploads or credentials. An initial research conversation needs no confidential material. Any later pilot file transfer would require separately agreed data scope, transfer method, access, processing tools, retention, and deletion.

Verify the static build and Worker behavior with `npm run build`, `npm test`, and `node --test tests/site.test.mjs`. Use the existing Cloudflare deployment process in `CLOUDFLARE.md`; do not migrate the production D1 database or change mail and DNS settings for ordinary site updates.
