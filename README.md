# The Brand Advertising — Website

Official marketing website for **The Brand Advertising (TBA)**, an India-focused advertising agency specialising in vehicle branding, retail visibility and on-ground brand activation.

## Live website

[https://thebrandadvertising.com/](https://thebrandadvertising.com/)

The site uses search-friendly routes and is hosted on Hostinger.

## Technology

- React 19
- Vite 8
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- Oxlint

The project is a frontend-only website. It does not require a database or expose any email credentials.

## Pages

- Home
- About Us
- Services
- Our Campaigns, including five client stories
- Contact Us

The former `/work` route redirects visitors to `/campaigns` so old shared links continue to work.

## Local development

Install dependencies:

```bash
npm install
```

Start the local website:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Check the code:

```bash
npm run lint
```

## Contact form

The contact form submits enquiries through FormSubmit to:

`admin@thebrandadvertising.in`

The frontend shows success only after FormSubmit accepts the request. It also validates required fields, prevents duplicate submissions, times out stalled requests and displays a clear failure message. No API key, SMTP password or email credential is stored in the repository.

If the recipient email changes, update `CONTACT_ENDPOINT` and the visible email references in `src/pages/Contact.jsx`, `src/components/Footer.jsx` and `src/pages/Home.jsx`. The new FormSubmit recipient may need to approve its first activation email.

## Content and assets

- `public/` contains the TBA logo, background videos, robots file and sitemap.
- `src/assets/services/` contains the approved service images.
- `src/assets/campaigns/events/` contains the Jodhpur and Ajmer campaign photographs.
- `src/assets/contact/` contains the Contact page campaign images.
- `src/assets/tba/` contains active TBA brand and leadership images.

Large original image files were converted to optimized WebP versions. Only assets used by the active website are kept in the repository.

## Deployment

Hostinger is connected directly to the GitHub repository. Every push to the `main` branch is built and deployed by Hostinger automatically.

The included `npm run build` command creates the production files in `dist/` and generates crawlable HTML metadata for the important service and city pages.

## Confirmed business details

- Email: `admin@thebrandadvertising.in`
- Business hours: Monday to Saturday, 10:00 AM to 7:00 PM
- Instagram: [the.brandadvertising](https://www.instagram.com/the.brandadvertising?igsh=aWM5eXE4bnl6YzRu)
- LinkedIn: [The Brand Advertising](https://www.linkedin.com/company/the-brand-advertising/)
- Facebook: [The Brand Advertising](https://www.facebook.com/profile.php?id=61584311907761)

The floating WhatsApp button opens a conversation with the approved business number, `+91 98735 93917`. The number is linked without being displayed inside the floating button.
