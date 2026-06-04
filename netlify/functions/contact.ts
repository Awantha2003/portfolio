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
      name?: string;
      email?: string;
      message?: string;
      imageUrl?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return json(400, { error: 'Name, email, and message are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(400, { error: 'A valid email is required' });
    }

    return json(200, {
      ok: true,
      submission: {
        name,
        email,
        message,
        imageUrl: body.imageUrl ?? null,
        receivedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return json(500, {
      error: error instanceof Error ? error.message : 'Contact submission failed'
    });
  }
};
