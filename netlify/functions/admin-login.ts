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

export const handler = async (event: FunctionEvent) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const body = JSON.parse(event.body ?? '{}') as {
      email?: string;
      password?: string;
    };

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return json(500, { error: 'Admin login is not configured' });
    }

    if (body.email?.trim() !== adminEmail || body.password !== adminPassword) {
      return json(401, { error: 'Invalid admin email or password' });
    }

    return json(200, {
      ok: true,
      admin: {
        email: adminEmail
      }
    });
  } catch (error) {
    return json(500, {
      error: error instanceof Error ? error.message : 'Admin login failed'
    });
  }
};
