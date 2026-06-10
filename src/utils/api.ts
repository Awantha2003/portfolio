export const readApiResponse = async (response: Response) => {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { error: text };
  }
};

export const getApiError = (result: Record<string, unknown>, fallback: string) =>
  typeof result.error === 'string' ? result.error : fallback;
