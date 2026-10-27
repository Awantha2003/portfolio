import { endSession } from './_lib/auth.js';
import { route } from './_lib/http.js';

export default route({
  async POST(req, res) {
    endSession(req, res);
    return { ok: true };
  }
});
