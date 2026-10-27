import { passwordMatches, startSession } from './_lib/auth.js';
import { HttpError, readJson, route } from './_lib/http.js';

export default route({
  async POST(req, res) {
    const { password } = await readJson(req);
    if (typeof password !== 'string' || !passwordMatches(password)) {
      // Slow down guessing a little.
      await new Promise((r) => setTimeout(r, 800));
      throw new HttpError(401, 'Wrong password');
    }
    startSession(req, res);
    return { ok: true };
  }
});
