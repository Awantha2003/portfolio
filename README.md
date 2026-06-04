# Portfolio

React, Vite, TypeScript, and Netlify Functions portfolio app.

## Scripts

```bash
npm run dev
npm run dev:netlify
npm run build
npm run lint
```

## Backend

Backend endpoints live in `netlify/functions`.

- `POST /.netlify/functions/contact` accepts contact form submissions.
- `POST /.netlify/functions/upload-image` uploads base64 image data to Cloudinary.
- `POST /.netlify/functions/admin-login` validates admin login credentials.

## Cloudinary Environment

Set these in Netlify environment variables or in a local `.env.local` file:

```bash
CLOUDINARY_ENABLED=true
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=unistudyhub/profile-images
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=local_dev_only_password
```

Use `npm run dev:netlify` when testing Cloudinary uploads locally, because `npm run dev` serves only the React app and does not serve Netlify Functions.
The Vite dev server also includes local middleware for the same function URLs, so restart `npm run dev` after changing `.env.local`.
