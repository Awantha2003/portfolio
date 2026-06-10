type ApiRequest = {
  method?: string;
  body?: Record<string, unknown>;
};

type ApiResponse = {
  status: (statusCode: number) => {
    json: (body: unknown) => void;
  };
};

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const name = typeof request.body?.name === 'string' ? request.body.name.trim() : '';
  const email = typeof request.body?.email === 'string' ? request.body.email.trim() : '';
  const message = typeof request.body?.message === 'string' ? request.body.message.trim() : '';

  if (!name || !email || !message) {
    response.status(400).json({ error: 'Name, email, and message are required' });
    return;
  }

  response.status(200).json({
    ok: true,
    submission: {
      name,
      email,
      message,
      receivedAt: new Date().toISOString()
    }
  });
}
