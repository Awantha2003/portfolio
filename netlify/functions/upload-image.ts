import crypto from 'node:crypto';

interface FunctionEvent {
  httpMethod: string;
  body?: string | null;
}

const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});

const getCloudinaryConfig = () => {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  const urlMatch = cloudinaryUrl?.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? urlMatch?.[3],
    apiKey: process.env.CLOUDINARY_API_KEY ?? urlMatch?.[1],
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? urlMatch?.[2],
    folder: process.env.CLOUDINARY_FOLDER ?? 'unistudyhub/profile-images',
    enabled: process.env.CLOUDINARY_ENABLED !== 'false'
  };
};

const signUpload = (params: Record<string, string>, apiSecret: string) => {
  const payload = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto.createHash('sha1').update(`${payload}${apiSecret}`).digest('hex');
};

export const handler = async (event: FunctionEvent) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const config = getCloudinaryConfig();

  if (!config.enabled) {
    return json(503, { error: 'Cloudinary uploads are disabled' });
  }

  if (!config.cloudName || !config.apiKey || !config.apiSecret) {
    return json(500, { error: 'Cloudinary is not configured' });
  }

  try {
    const body = JSON.parse(event.body ?? '{}') as { image?: string };
    const image = body.image;

    if (!image || !/^data:image\/(png|jpe?g|webp|gif);base64,/.test(image)) {
      return json(400, { error: 'A valid base64 image is required' });
    }

    if (image.length > 8 * 1024 * 1024) {
      return json(413, { error: 'Image is too large. Please upload an image under 6 MB.' });
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signedParams = {
      folder: config.folder,
      timestamp
    };

    const formData = new FormData();
    formData.append('file', image);
    formData.append('folder', config.folder);
    formData.append('timestamp', timestamp);
    formData.append('api_key', config.apiKey);
    formData.append('signature', signUpload(signedParams, config.apiSecret));

    const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    const upload = await response.json();

    if (!response.ok) {
      return json(response.status, {
        error: upload?.error?.message ?? 'Cloudinary upload failed'
      });
    }

    return json(200, {
      publicId: upload.public_id,
      secureUrl: upload.secure_url,
      width: upload.width,
      height: upload.height,
      format: upload.format
    });
  } catch (error) {
    return json(500, {
      error: error instanceof Error ? error.message : 'Upload failed'
    });
  }
};
