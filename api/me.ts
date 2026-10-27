import { isAdmin } from './_lib/auth.js';
import { route } from './_lib/http.js';

export default route({
  async GET(req) {
    return {
      authenticated: isAdmin(req),
      configured: {
        database: Boolean(process.env.DATABASE_URL),
        uploads: Boolean(process.env.CLOUDINARY_URL || (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET))
      }
    };
  }
});
