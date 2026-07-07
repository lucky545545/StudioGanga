# Studio Ganga Architecture Site

React/Vite first version for an architecture firm website.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Cloudflare Pages Deployment

This project is ready for Cloudflare Pages.

Recommended setup:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

After the first deploy, Cloudflare will give you a temporary `*.pages.dev` URL.

To connect your domain:

1. Go to Cloudflare Dashboard.
2. Open `Workers & Pages`.
3. Select this Pages project.
4. Open `Custom domains`.
5. Select `Set up a domain`.
6. Add your domain, for example `example.com`.
7. Add `www.example.com` too if you want the `www` version.

Because the domain was bought from Cloudflare Registrar, Cloudflare should manage the DNS zone in the same account. For an apex domain like `example.com`, Cloudflare Pages can create the needed DNS record during the custom domain setup. For a subdomain like `www.example.com`, it will use a CNAME record pointing to the Pages project.

## Creative Direction

- Editorial architecture magazine feel instead of a generic agency template.
- Large immersive hero image with confident, quiet copy.
- Warm material palette: stone, charcoal, teak, muted green, and oxide.
- Business-friendly structure: work, studio, services, process, contact.
- Placeholder brand used for now: `Studio Ganga`.

## Next Client Inputs

- Final firm name and logo.
- Real project photos and project names.
- Studio founder bio and team details.
- Contact email, phone number, office location, and social links.
- Domain/hosting preference.
