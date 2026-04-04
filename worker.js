const ALLOWED_ORIGIN = "https://rayanbbb.github.io";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "qwen/qwen3-6-plus:free";
const SITE_URL = "https://rayanbbb.github.io/bachub/";
const SITE_TITLE = "BacHub";

function buildCorsHeaders(origin) {
  const allowedOrigin = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function jsonResponse(payload, status = 200, origin = ALLOWED_ORIGIN) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...buildCorsHeaders(origin),
    },
  });
}

function buildSystemPrompt(lang) {
  return (
    "You are an expert Moroccan Bac tutor specializing in 2BAC PC (Physics-Chemistry and Mathematics). " +
    "You help students understand lessons, solve exercises, and prepare for the national exam. " +
    "Answer in the same language the student uses (Arabic darija, French, or English). " +
    "Be clear, encouraging, and pedagogical. " +
    `Current UI language hint: ${lang || "auto"}.`
  );
}

function extractReply(data) {
  const choices = Array.isArray(data?.choices) ? data.choices : [];
  if (!choices.length) return "";

  const content = choices[0]?.message?.content;
  if (typeof content === "string") return content.trim();

  if (Array.isArray(content)) {
    return content
      .filter((item) => item && item.type === "text" && item.text)
      .map((item) => item.text)
      .join("\n")
      .trim();
  }

  return "";
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || ALLOWED_ORIGIN;

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: buildCorsHeaders(origin),
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed." }, 405, origin);
    }

    if (origin !== ALLOWED_ORIGIN) {
      return jsonResponse({ error: "Origin not allowed." }, 403, origin);
    }

    if (!env.OPENROUTER_API_KEY) {
      return jsonResponse({ error: "Missing OPENROUTER_API_KEY secret." }, 500, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body." }, 400, origin);
    }

    const message = (body?.message || "").trim();
    const history = Array.isArray(body?.history) ? body.history : [];
    const lang = body?.lang || "auto";

    if (!message && history.length === 0) {
      return jsonResponse({ error: "Message is required." }, 400, origin);
    }

    const normalizedHistory = history
      .map((item) => ({
        role: item?.role,
        content: typeof item?.content === "string" ? item.content.trim() : "",
      }))
      .filter((item) => (item.role === "user" || item.role === "assistant") && item.content);

    const lastHistoryMessage = normalizedHistory[normalizedHistory.length - 1];
    if (message && (!lastHistoryMessage || lastHistoryMessage.role !== "user" || lastHistoryMessage.content !== message)) {
      normalizedHistory.push({ role: "user", content: message });
    }

    const upstreamPayload = {
      model: OPENROUTER_MODEL,
      messages: [
        { role: "system", content: buildSystemPrompt(lang) },
        ...normalizedHistory,
      ],
    };

    let upstreamResponse;
    try {
      upstreamResponse = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": SITE_URL,
          "X-OpenRouter-Title": SITE_TITLE,
        },
        body: JSON.stringify(upstreamPayload),
      });
    } catch (error) {
      return jsonResponse({ error: error instanceof Error ? error.message : "Upstream request failed." }, 502, origin);
    }

    const rawText = await upstreamResponse.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return jsonResponse({ error: rawText || "Invalid upstream response." }, 502, origin);
    }

    if (!upstreamResponse.ok) {
      return jsonResponse({ error: data?.error?.message || data?.error || "OpenRouter API error." }, upstreamResponse.status, origin);
    }

    const reply = extractReply(data);
    if (!reply) {
      return jsonResponse({ error: "Empty AI reply." }, 502, origin);
    }

    return jsonResponse(
      {
        reply,
        model: OPENROUTER_MODEL,
        live: true,
      },
      200,
      origin
    );
  },
};
