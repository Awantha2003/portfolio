# Portfolio

React, Vite, TypeScript, and Vercel API portfolio app.

## Scripts

```bash
npm run dev
npm run dev:vercel
npm run build
npm run lint
```

## Backend

Backend endpoints run as Vercel serverless functions in `api`.

- `POST /api/contact` accepts contact form submissions.
- `POST /api/upload-image` uploads base64 image data to Cloudinary.
- `POST /api/admin-login` validates admin login credentials.

Image uploads are limited to 1 MB before base64 encoding to stay within Vercel request limits.

## Environment

Set these in a local `.env.local` file or your hosting provider environment:

```bash
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=portfolio/project-images
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=local_dev_only_password
```

For Vercel, set the same values in Project Settings > Environment Variables.
Use `npm run dev:vercel` when testing the `/api` backend locally.
