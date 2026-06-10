import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const signUpload = (params: Record<string, string>, apiSecret: string) => {
  const payload = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto.createHash('sha1').update(`${payload}${apiSecret}`).digest('hex');
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const image = typeof request.body?.image === 'string' ? request.body.image : '';
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_FOLDER || 'portfolio/project-images';

  if (!cloudName || !apiKey || !apiSecret) {
    response.status(500).json({ error: 'Cloudinary is not configured' });
    return;
  }

  if (!/^data:image\/(png|jpe?g|webp|gif);base64,/.test(image)) {
    response.status(400).json({ error: 'A valid base64 image is required' });
    return;
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signedParams = { folder, timestamp };
    const formData = new FormData();

    formData.append('file', image);
    formData.append('folder', folder);
    formData.append('timestamp', timestamp);
    formData.append('api_key', apiKey);
    formData.append('signature', signUpload(signedParams, apiSecret));

    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
    const upload = await uploadResponse.json();

    if (!uploadResponse.ok) {
      response.status(uploadResponse.status).json({ error: upload?.error?.message ?? 'Cloudinary upload failed' });
      return;
    }

    response.status(200).json({
      publicId: upload.public_id,
      secureUrl: upload.secure_url,
      width: upload.width,
      height: upload.height,
      format: upload.format
    });
  } catch (error) {
    response.status(500).json({ error: error instanceof Error ? error.message : 'Upload failed' });
  }
}
