# Awantha Imesh — Portfolio

Personal portfolio with a built-in admin panel.

- **Frontend:** React + Vite + Tailwind, pre-rendered at build time for SEO
- **Backend:** Vercel serverless functions in `api/`
- **Database:** Neon Postgres (`site_content` table, created automatically)
- **Media:** Cloudinary

## Run locally

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # site on http://localhost:5173, admin on /admin
```

## Environment variables

`DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `CLOUDINARY_URL` (or `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`), and optionally `SITE_URL` and `GOOGLE_SITE_VERIFICATION`. See `.env.example`.
