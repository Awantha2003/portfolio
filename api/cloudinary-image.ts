import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEFAULT_CLOUDINARY_CLOUD_NAME = 'dyogmyud6';

const getAllowedCloudName = () => process.env.CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUDINARY_CLOUD_NAME;

const getCloudinaryImageUrl = (value: string) => {
  try {
    const url = new URL(value);
    const cloudName = getAllowedCloudName();

    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'res.cloudinary.com' ||
      !url.pathname.startsWith(`/${cloudName}/image/`)
    ) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const imageUrl = typeof request.query.url === 'string' ? getCloudinaryImageUrl(request.query.url) : null;

  if (!imageUrl) {
    response.status(400).json({ error: 'A valid Cloudinary image URL is required' });
    return;
  }

  try {
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      response.status(imageResponse.status).json({ error: 'Cloudinary image request failed' });
      return;
    }

    const contentType = imageResponse.headers.get('content-type') || 'application/octet-stream';
    const cacheControl = imageResponse.headers.get('cache-control') || 'public, max-age=86400';
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    response.setHeader('Content-Type', contentType);
    response.setHeader('Cache-Control', cacheControl);
    response.status(200).send(imageBuffer);
  } catch (error) {
    response.status(500).json({ error: error instanceof Error ? error.message : 'Image proxy failed' });
  }
}
