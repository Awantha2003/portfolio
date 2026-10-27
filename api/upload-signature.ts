import { createHash } from 'node:crypto';
import { requireAdmin } from './_lib/auth.js';
import { HttpError, route } from './_lib/http.js';

const FOLDER = 'portfolio';

/** Accepts CLOUDINARY_URL (cloudinary://key:secret@cloud) or the three separate variables. */
function cloudinaryConfig() {
  const url = process.env.CLOUDINARY_URL;
  if (url) {
    const parsed = new URL(url);
    return { cloudName: parsed.hostname, apiKey: decodeURIComponent(parsed.username), apiSecret: decodeURIComponent(parsed.password) };
  }
  const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret } = process.env;
  if (!cloudName || !apiKey || !apiSecret) throw new HttpError(500, 'Cloudinary is not configured on the server');
  return { cloudName, apiKey, apiSecret };
}

// The browser uploads straight to Cloudinary with this signature, so files never pass through our function.
export default route({
  async POST(req) {
    requireAdmin(req);
    const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = createHash('sha1').update(`folder=${FOLDER}&timestamp=${timestamp}${apiSecret}`).digest('hex');
    return { cloudName, apiKey, timestamp, folder: FOLDER, signature };
  }
});
