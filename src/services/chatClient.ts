export interface ChatRequestPayload {
  message: string;
}

export interface ChatResponsePayload {
  answer?: string;
  audioUrl?: string;
  meta?: Record<string, unknown>;
}

const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT ?? "/api/chat";
const CHAT_API_KEY = import.meta.env.VITE_CHAT_API_KEY ?? "";
const CHAT_DEPLOYMENT = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT ?? "";

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

if (CHAT_API_KEY) {
  defaultHeaders["x-functions-key"] = CHAT_API_KEY;
}

if (CHAT_DEPLOYMENT) {
  defaultHeaders["x-azure-openai-deployment"] = CHAT_DEPLOYMENT;
}

export async function sendChatMessage(message: string): Promise<ChatResponsePayload> {
  const payload: ChatRequestPayload = { message };

  const res = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    throw new Error(`Error al contactar el backend: ${errorText || res.status}`);
  }

  return res.json() as Promise<ChatResponsePayload>;
}
