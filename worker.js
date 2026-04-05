const ALLOWED_ORIGIN = "*";
const AI_MODEL = "@cf/meta/llama-4-scout-17b-16e-instruct";

function buildCorsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
    "You are an exceptionally intelligent, helpful, honest, and direct AI study assistant for Moroccan 2BAC PC students. " +
    "You specialize in the Moroccan 2BAC PC curriculum, especially mathematics, physics, chemistry, and English. " +
    "Always respond naturally in the same language the student uses, whether it is Darija, French, Arabic, or English. " +
    "Your goal is to be the best possible study assistant for Moroccan bac students: clear, pedagogical, supportive, and academically strong. " +
    "Give accurate and detailed explanations, break problems down step by step when useful, and use simple examples when they help understanding. " +
    "Be transparent when a point is uncertain, but still do your best to help the student move forward. " +
    "For academic questions, do not refuse help; instead, explain the concept, method, or correction as clearly as possible. " +
    "Prefer clarity over unnecessary complexity, but do not oversimplify important ideas. " +
    `Current UI language hint: ${lang || "auto"}.`
  );
}

function normalizeHistory(history, message) {
  const normalizedHistory = history
    .map((item) => ({
      role: item?.role === "assistant" ? "assistant" : item?.role === "user" ? "user" : "",
      content: typeof item?.content === "string" ? item.content.trim() : "",
    }))
    .filter((item) => item.role && item.content);

  const lastHistoryMessage = normalizedHistory[normalizedHistory.length - 1];
  if (message && (!lastHistoryMessage || lastHistoryMessage.role !== "user" || lastHistoryMessage.content !== message)) {
    normalizedHistory.push({ role: "user", content: message });
  }

  const firstUserIndex = normalizedHistory.findIndex((item) => item.role === "user");
  return firstUserIndex >= 0 ? normalizedHistory.slice(firstUserIndex) : normalizedHistory;
}

function extractAiReply(result) {
  if (typeof result?.response === "string" && result.response.trim()) {
    return result.response.trim();
  }

  if (typeof result?.result?.response === "string" && result.result.response.trim()) {
    return result.result.response.trim();
  }

  if (typeof result === "string" && result.trim()) {
    return result.trim();
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

    if (request.method === "GET") {
      return jsonResponse({ status: "ok" }, 200, origin);
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed." }, 405, origin);
    }

    if (!env.AI || typeof env.AI.run !== "function") {
      return jsonResponse({ error: "Missing AI binding." }, 500, origin);
    }

    let rawBody = "";
    let body;
    try {
      rawBody = await request.text();
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch (error) {
      console.error("Invalid JSON body received:", {
        error: error instanceof Error ? error.message : String(error),
        received: rawBody,
      });
      return jsonResponse({ error: "Invalid JSON body.", received: rawBody || null }, 400, origin);
    }

    const message = typeof body?.message === "string" ? body.message.trim() : String(body?.message ?? "").trim();
    const history = Array.isArray(body?.history) ? body.history : [];
    const lang = body?.lang || "auto";

    if (!message && history.length === 0) {
      console.warn("Message is required. Body received:", body);
      return jsonResponse({ error: "Message is required.", body }, 400, origin);
    }

    const normalizedHistory = normalizeHistory(history, message);
    if (!normalizedHistory.length) {
      return jsonResponse({ error: "No valid conversation content found.", body }, 400, origin);
    }

    const messages = [
      { role: "system", content: buildSystemPrompt(lang) },
      ...normalizedHistory,
    ];

    let aiResult;
    try {
      aiResult = await env.AI.run(AI_MODEL, { messages });
    } catch (error) {
      const status = Number(error?.status || error?.statusCode || 502);
      const details =
        error instanceof Error ? error.message : typeof error === "string" ? error : JSON.stringify(error);

      console.error("Workers AI error response:", {
        status,
        details,
      });

      if (status === 429) {
        return jsonResponse(
          {
            reply: "Please wait a moment and try again",
            model: AI_MODEL,
            live: false,
            rateLimited: true,
          },
          200,
          origin
        );
      }

      return jsonResponse(
        {
          error: "Workers AI request failed.",
          upstreamStatus: status,
          details,
        },
        status,
        origin
      );
    }

    const reply = extractAiReply(aiResult);
    if (!reply) {
      return jsonResponse(
        {
          error: "Empty AI reply.",
          details: aiResult,
        },
        502,
        origin
      );
    }

    return jsonResponse(
      {
        reply,
        model: AI_MODEL,
        live: true,
      },
      200,
      origin
    );
  },
};
