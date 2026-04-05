const ALLOWED_ORIGIN = "*";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "meta-llama/llama-3.1-8b-instruct:free";
const SITE_URL = "https://rayanbbb.github.io/bachub/";
const SITE_TITLE = "BacHub";

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

function parseJsonSafely(text) {
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
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

    // Debug mode: origin restriction is temporarily disabled.
    // if (origin !== ALLOWED_ORIGIN) {
    //   return jsonResponse({ error: "Origin not allowed." }, 403, origin);
    // }

    if (!env.OPENROUTER_API_KEY) {
      return jsonResponse({ error: "Missing OPENROUTER_API_KEY secret." }, 500, origin);
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

    const message = (body?.message || "").trim();
    const history = Array.isArray(body?.history) ? body.history : [];
    const lang = body?.lang || "auto";

    if (!message && history.length === 0) {
      console.warn("Message is required. Body received:", body);
      return jsonResponse({ error: "Message is required.", body: body }, 400, origin);
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
          "Accept": "application/json",
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_TITLE,
        },
        body: JSON.stringify(upstreamPayload),
      });
    } catch (error) {
      return jsonResponse({ error: error instanceof Error ? error.message : "Upstream request failed." }, 502, origin);
    }

    const rawText = await upstreamResponse.text();
    const data = parseJsonSafely(rawText);

    if (!upstreamResponse.ok) {
      const errorDetails =
        rawText ||
        (data ? JSON.stringify(data) : "") ||
        "OpenRouter returned an empty error response body.";
      console.error("OpenRouter error response:", {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        details: errorDetails,
      });
      return jsonResponse(
        {
          error: data?.error?.message || data?.error || "OpenRouter API error.",
          upstreamStatus: upstreamResponse.status,
          upstreamStatusText: upstreamResponse.statusText,
          details: errorDetails,
        },
        upstreamResponse.status,
        origin
      );
    }

    if (!data) {
      return jsonResponse(
        {
          error: "Invalid upstream response.",
          upstreamStatus: upstreamResponse.status,
          details: rawText || null,
        },
        502,
        origin
      );
    }

    const reply = extractReply(data);
    if (!reply) {
      return jsonResponse(
        {
          error: "Empty AI reply.",
          upstreamStatus: upstreamResponse.status,
          details: data,
        },
        502,
        origin
      );
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
