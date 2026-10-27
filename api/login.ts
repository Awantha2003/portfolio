import { passwordMatches, startSession } from './_lib/auth.js';
import { HttpError, clientIp, readJson, route } from './_lib/http.js';
import { assertLoginAllowed, clearFailedLogins, recordFailedLogin } from './_lib/rateLimit.js';

export default route({
  async POST(req, res) {
    const ip = clientIp(req);
    await assertLoginAllowed(ip);
    const { password } = await readJson(req);
    if (typeof password !== 'string' || password.length > 200 || !passwordMatches(password)) {
      await recordFailedLogin(ip);
      // Slow down guessing a little.
      await new Promise((r) => setTimeout(r, 800));
      throw new HttpError(401, 'Wrong password');
    }
    await clearFailedLogins(ip);
    startSession(req, res);
    return { ok: true };
  }
});
