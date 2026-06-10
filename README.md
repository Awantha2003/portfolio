# Portfolio

React, Vite, and TypeScript static portfolio app.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Static Features

This project is frontend-only for live hosting.

- The contact form opens an email draft to `awanthaimesh65@gmail.com`.
- Admin-added projects are saved in browser `localStorage`.
- Uploaded admin images are stored as local data URLs in the same browser.

## Admin Environment

Set these in a local `.env.local` file or your hosting provider environment:

```bash
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=local_dev_only_password
```
