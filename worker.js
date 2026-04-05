const ALLOWED_ORIGIN = "*";
const AI_MODEL = "@cf/meta/llama-4-scout-17b-16e-instruct";
const GITHUB_PAGES_DATA_BASE_URL = "https://rayanbbb.github.io/bachub/data";
const GITHUB_RAW_DATA_BASE_URL = "https://raw.githubusercontent.com/rayanbbb/bachub/main/data";
const KNOWLEDGE_CACHE_TTL_MS = 5 * 60 * 1000;
const KNOWLEDGE_FILES = [
  {
    subject: "math",
    label: "Mathematics",
    filename: "math.txt",
    keywords: [
      "math",
      "mathematics",
      "mathematiques",
      "maths",
      "limite",
      "limites",
      "derivee",
      "derivation",
      "integral",
      "integrale",
      "equation differentielle",
      "probabilite",
      "complexe",
      "geometry",
      "geometrie",
      "رياضيات",
      "نهايات",
      "اشتقاق",
      "تكامل",
      "احتمالات",
      "اعداد مركبة"
    ]
  },
  {
    subject: "physics",
    label: "Physics",
    filename: "physics.txt",
    keywords: [
      "physics",
      "physique",
      "onde",
      "ondes",
      "mecanique",
      "newton",
      "satellite",
      "electricite",
      "rc",
      "rl",
      "rlc",
      "oscillation",
      "radioactive",
      "mouvement",
      "phys",
      "فيزياء",
      "موجات",
      "ميكانيك",
      "كهرباء",
      "اشعاع",
      "حركة"
    ]
  },
  {
    subject: "chemistry",
    label: "Chemistry",
    filename: "chemistry.txt",
    keywords: [
      "chemistry",
      "chimie",
      "acide",
      "base",
      "acido",
      "reaction",
      "equilibre",
      "electrolyse",
      "pile",
      "esterification",
      "hydrolyse",
      "chim",
      "كيمياء",
      "حمض",
      "قاعدة",
      "تفاعل",
      "تحول كيميائي",
      "تحليل كهربائي"
    ]
  },
  {
    subject: "svt",
    label: "SVT",
    filename: "svt.txt",
    keywords: [
      "svt",
      "science de la vie",
      "science de la terre",
      "sciences de la vie et de la terre",
      "life and earth",
      "biology",
      "biologie",
      "geologie",
      "genetique",
      "immunologie",
      "ecologie",
      "reproduction"
    ]
  },
  {
    subject: "english",
    label: "English",
    filename: "english.txt",
    keywords: [
      "english",
      "anglais",
      "grammar",
      "writing",
      "essay",
      "paragraph",
      "reading",
      "comprehension",
      "vocabulary",
      "tense",
      "language",
      "انجليزية",
      "انكليزية",
      "قواعد",
      "essay",
      "paragraph"
    ]
  }
];

let knowledgeCache = null;
let knowledgeCacheTime = 0;

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

function buildSystemPrompt(lang, knowledgeContext) {
  let prompt =
    "You are an exceptionally intelligent, helpful, honest, and direct AI study assistant for Moroccan 2BAC PC students. " +
    "You specialize in the Moroccan 2BAC PC curriculum, especially mathematics, physics, chemistry, SVT, and English. " +
    "Always respond naturally in the same language the student uses, whether it is Darija, French, Arabic, or English. " +
    "Your goal is to be the best possible study assistant for Moroccan bac students: clear, pedagogical, supportive, and academically strong. " +
    "Give accurate and detailed explanations, break problems down step by step when useful, and use simple examples when they help understanding. " +
    "Be transparent when a point is uncertain, but still do your best to help the student move forward. " +
    "For academic questions, do not refuse help; instead, explain the concept, method, or correction as clearly as possible. " +
    "Prefer clarity over unnecessary complexity, but do not oversimplify important ideas. " +
    `Current UI language hint: ${lang || "auto"}.`;

  if (knowledgeContext) {
    prompt +=
      "\n\nUse the following BacHub curriculum context when it is relevant. " +
      "Prefer these notes, methods, and solved-exercise patterns over generic explanations whenever they help answer the student's question.\n\n" +
      knowledgeContext;
  }

  return prompt;
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

function normalizeForSearch(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeForSearch(text) {
  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "this",
    "that",
    "from",
    "into",
    "how",
    "what",
    "why",
    "est",
    "les",
    "des",
    "une",
    "pour",
    "dans",
    "avec",
    "sur",
    "pas",
    "que",
    "qui",
    "der",
    "und",
    "li",
    "ila",
    "chi",
    "men",
    "min",
    "ma",
    "kan",
    "kay",
    "على",
    "من",
    "في",
    "الى",
    "إلى",
    "على",
    "ما",
    "كيف",
    "شنو",
    "واش"
  ]);

  return normalizeForSearch(text)
    .split(" ")
    .filter((token) => token && token.length > 1 && !stopWords.has(token));
}

function buildTokenFrequency(text) {
  const frequency = new Map();
  for (const token of tokenizeForSearch(text)) {
    frequency.set(token, (frequency.get(token) || 0) + 1);
  }
  return frequency;
}

function splitLargeBlock(block, maxChars = 1100) {
  if (block.length <= maxChars) {
    return [block];
  }

  const lines = block
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return [];
  }

  const chunks = [];
  let current = "";

  for (const line of lines) {
    const candidate = current ? `${current}\n${line}` : line;
    if (candidate.length > maxChars && current) {
      chunks.push(current);
      current = line;
    } else if (line.length > maxChars) {
      const sentences = line.split(/(?<=[.!?؟])\s+/).filter(Boolean);
      let sentenceChunk = "";

      for (const sentence of sentences) {
        const sentenceCandidate = sentenceChunk ? `${sentenceChunk} ${sentence}` : sentence;
        if (sentenceCandidate.length > maxChars && sentenceChunk) {
          chunks.push(sentenceChunk);
          sentenceChunk = sentence;
        } else {
          sentenceChunk = sentenceCandidate;
        }
      }

      if (sentenceChunk) {
        current = current ? `${current}\n${sentenceChunk}` : sentenceChunk;
      }
    } else {
      current = candidate;
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

function isUsefulKnowledgeChunk(text) {
  const normalized = normalizeForSearch(text);

  if (!normalized || normalized.length < 60) {
    return false;
  }

  const templateSignals = [
    "paste here your",
    "suggested format",
    "important notes",
    "topic",
    "definitions",
    "worked example",
    "solved exercise",
    "paste your real content here"
  ];

  if (text.includes("...")) {
    return false;
  }

  return !templateSignals.some((signal) => normalized.includes(signal));
}

function buildKnowledgeChunks(entry) {
  const blocks = String(entry.text || "")
    .replace(/\r/g, "")
    .split(/\n\s*\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const chunks = [];

  for (const block of blocks) {
    for (const chunk of splitLargeBlock(block)) {
      if (!isUsefulKnowledgeChunk(chunk)) {
        continue;
      }

      chunks.push({
        subject: entry.subject,
        label: entry.label,
        text: chunk,
        normalizedText: normalizeForSearch(chunk),
        tokenFrequency: buildTokenFrequency(chunk),
        sourceUrl: entry.sourceUrl
      });
    }
  }

  return chunks;
}

async function fetchKnowledgeFile(file) {
  const urls = [
    `${GITHUB_PAGES_DATA_BASE_URL}/${file.filename}`,
    `${GITHUB_RAW_DATA_BASE_URL}/${file.filename}`
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          "Accept": "text/plain"
        }
      });

      if (!response.ok) {
        continue;
      }

      const text = (await response.text()).trim();
      if (text) {
        return {
          subject: file.subject,
          label: file.label,
          text,
          sourceUrl: url,
          keywords: file.keywords
        };
      }
    } catch (error) {
      console.warn(`Knowledge file fetch failed for ${file.filename} from ${url}:`, error);
    }
  }

  return {
    subject: file.subject,
    label: file.label,
    text: "",
    sourceUrl: null,
    keywords: file.keywords
  };
}

async function loadKnowledgeBase() {
  const now = Date.now();
  if (knowledgeCache && now - knowledgeCacheTime < KNOWLEDGE_CACHE_TTL_MS) {
    return knowledgeCache;
  }

  const files = await Promise.all(KNOWLEDGE_FILES.map((file) => fetchKnowledgeFile(file)));
  knowledgeCache = files.map((file) => ({
    ...file,
    chunks: buildKnowledgeChunks(file)
  }));
  knowledgeCacheTime = now;

  return knowledgeCache;
}

function inferSubjectBoosts(queryNormalized) {
  const boosts = new Map();

  for (const file of KNOWLEDGE_FILES) {
    let score = 0;

    for (const keyword of file.keywords) {
      if (queryNormalized.includes(normalizeForSearch(keyword))) {
        score += keyword.length > 5 ? 8 : 5;
      }
    }

    if (score > 0) {
      boosts.set(file.subject, score);
    }
  }

  return boosts;
}

function scoreKnowledgeChunk(chunk, queryTokens, queryNormalized, subjectBoosts) {
  let score = subjectBoosts.get(chunk.subject) || 0;

  for (const token of queryTokens) {
    const frequency = chunk.tokenFrequency.get(token);
    if (frequency) {
      score += 3 + Math.min(frequency, 3);
    }
  }

  if (queryNormalized && chunk.normalizedText.includes(queryNormalized)) {
    score += 12;
  }

  return score;
}

function buildKnowledgeContext(matches) {
  if (!matches.length) {
    return "";
  }

  const lines = [
    "BacHub knowledge base excerpts:",
  ];

  matches.forEach((match, index) => {
    lines.push(`[Context ${index + 1} | ${match.label}]`);
    lines.push(match.text);
  });

  return lines.join("\n\n");
}

async function findRelevantKnowledgeContext(queryText) {
  const knowledgeBase = await loadKnowledgeBase();
  const queryNormalized = normalizeForSearch(queryText);
  const queryTokens = tokenizeForSearch(queryText);
  const subjectBoosts = inferSubjectBoosts(queryNormalized);
  const scoredMatches = [];

  for (const file of knowledgeBase) {
    for (const chunk of file.chunks) {
      const score = scoreKnowledgeChunk(chunk, queryTokens, queryNormalized, subjectBoosts);
      if (score > 0) {
        scoredMatches.push({
          ...chunk,
          score
        });
      }
    }
  }

  scoredMatches.sort((a, b) => b.score - a.score || b.text.length - a.text.length);

  const selected = [];
  const perSubjectCount = new Map();
  let totalChars = 0;

  for (const match of scoredMatches) {
    const subjectCount = perSubjectCount.get(match.subject) || 0;
    if (subjectCount >= 2) {
      continue;
    }

    if (selected.some((item) => item.text === match.text)) {
      continue;
    }

    if (totalChars + match.text.length > 3200 && selected.length > 0) {
      continue;
    }

    selected.push(match);
    perSubjectCount.set(match.subject, subjectCount + 1);
    totalChars += match.text.length;

    if (selected.length >= 4) {
      break;
    }
  }

  if (!selected.length && subjectBoosts.size) {
    const fallbackSubjects = [...subjectBoosts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([subject]) => subject);

    for (const subject of fallbackSubjects) {
      const file = knowledgeBase.find((item) => item.subject === subject && item.chunks.length);
      if (file) {
        selected.push(file.chunks[0]);
        break;
      }
    }
  }

  return {
    context: buildKnowledgeContext(selected),
    sources: selected.map((item) => item.label)
  };
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

    const retrievalQuery = normalizedHistory.slice(-4).map((item) => item.content).join("\n");
    const knowledge = await findRelevantKnowledgeContext(retrievalQuery);
    const messages = [
      { role: "system", content: buildSystemPrompt(lang, knowledge.context) },
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
        knowledgeSources: knowledge.sources,
      },
      200,
      origin
    );
  },
};
