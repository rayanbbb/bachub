import json
import os
from pathlib import Path
from urllib import error, request as urllib_request

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS


ROOT = Path(__file__).resolve().parent
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "5000"))
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5.2")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_URL = os.getenv("OPENAI_CHAT_URL", "https://api.openai.com/v1/chat/completions")

app = Flask(__name__, static_folder=str(ROOT), static_url_path="")
CORS(app)


SUBJECT_CONTEXT = {
    "pc": {
        "label": "Physics-Chemistry",
        "topics": [
            "Transformations forcees et electrolyse",
            "Evolution spontanee d'un systeme chimique",
            "Chute libre verticale",
            "Mouvement de rotation",
            "Examens nationaux PC 2020-2024",
            "Cadre reference PC",
        ],
    },
    "math": {
        "label": "Mathematics",
        "topics": [
            "Calcul integral",
            "Denombrement",
            "Equations differentielles",
            "Fonctions exponentielles",
            "Geometrie dans l'espace",
            "Nombres complexes",
            "Probabilites",
            "Examens nationaux Math 2020-2025",
            "Cadre reference Math",
        ],
    },
    "svt": {
        "label": "Life and Earth Sciences",
        "topics": [
            "Programme SVT 2BAC PC",
            "Cadre reference SVT",
        ],
    },
    "english": {
        "label": "English",
        "topics": [
            "Reading comprehension",
            "Grammar and tenses",
            "Essay writing and communication",
            "Exam practice",
            "Cadre reference English",
        ],
    },
    "philo": {
        "label": "Philosophy",
        "topics": [
            "Consciousness and the unconscious",
            "Desire and happiness",
            "Freedom and responsibility",
            "Truth, state, and violence",
        ],
    },
}


def build_system_prompt(lang: str, subject: str, category: str) -> str:
    subject_info = SUBJECT_CONTEXT.get(subject, {"label": "General Bac Support", "topics": []})
    subject_block = ", ".join(subject_info["topics"]) if subject_info["topics"] else "General bac support"

    language_instruction = {
        "ar": "Answer in clear Moroccan Arabic or simple Arabic depending on the student's wording.",
        "fr": "Answer in clear French adapted for Moroccan bac students.",
        "en": "Answer in clear English adapted for Moroccan bac students.",
    }.get(lang, "Answer in the user's language.")

    return (
        "You are BacHub AI Tutor, a high-quality tutor for Moroccan 2BAC students. "
        "Your job is to explain lessons, solve exercises step by step, generate training questions, "
        "and guide students using the subject framework and exam style. "
        f"Current subject: {subject_info['label']}. "
        f"Current area: {category}. "
        f"Relevant curriculum topics: {subject_block}. "
        f"{language_instruction} "
        "Rules: "
        "1. When the student asks a direct exercise, solve it step by step and explain the method. "
        "2. When the question is vague, ask one short clarifying question first. "
        "3. Keep explanations structured and student-friendly. "
        "4. Align your explanations with the Moroccan 2BAC cadre referentiel, expected competencies, and national exam style whenever possible. "
        "5. If the answer depends on a specific official document you do not actually have, say that clearly and still help with the closest correct method. "
        "6. Prefer exam-oriented reasoning, short formulas, useful definitions, and practical examples. "
        "7. If the student asks for exercises, generate good bac-style exercises with solutions. "
        "8. When helpful, finish with a short recap or a quick method checklist the student can memorize."
    )


def extract_reply(payload: dict) -> str:
    choices = payload.get("choices", [])
    if not choices:
        return ""

    message = choices[0].get("message", {})
    content = message.get("content", "")
    if isinstance(content, str):
        return content.strip()

    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, dict) and item.get("type") == "text":
                parts.append(item.get("text", ""))
        return "\n".join(part for part in parts if part).strip()

    return ""


def send_openai_request(upstream_payload: dict) -> dict:
    req = urllib_request.Request(
        OPENAI_URL,
        data=json.dumps(upstream_payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENAI_API_KEY}",
        },
        method="POST",
    )

    with urllib_request.urlopen(req, timeout=90) as response:
        return json.loads(response.read().decode("utf-8"))


@app.get("/healthz")
def healthz():
    return jsonify({"ok": True})


@app.post("/api/chat")
def api_chat():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({"error": "Invalid request body."}), 400

    if not OPENAI_API_KEY:
        return jsonify({
            "error": "OPENAI_API_KEY is missing. Start the server with your API key."
        }), 500

    user_message = (payload.get("message") or "").strip()
    if not user_message:
        return jsonify({"error": "Message is required."}), 400

    lang = payload.get("lang", "en")
    subject = payload.get("subject", "pc")
    category = payload.get("category", "sem1")
    history = payload.get("history", [])[-8:]

    messages = [{"role": "system", "content": build_system_prompt(lang, subject, category)}]
    for item in history:
        role = item.get("role")
        content = (item.get("content") or "").strip()
        if role in {"user", "assistant"} and content:
            messages.append({"role": role, "content": content})
    messages.append({"role": "user", "content": user_message})

    upstream_payload = {
        "model": OPENAI_MODEL,
        "messages": messages,
        "reasoning_effort": "medium",
    }

    try:
        result = send_openai_request(upstream_payload)
    except error.HTTPError as exc:
        details = exc.read().decode("utf-8", errors="ignore")
        return jsonify({"error": details or "OpenAI API error."}), exc.code
    except Exception as exc:
        return jsonify({"error": str(exc)}), 502

    reply = extract_reply(result)
    if not reply:
        return jsonify({"error": "Empty reply from AI provider."}), 502

    return jsonify({
        "reply": reply,
        "model": OPENAI_MODEL,
        "live": True,
    })


@app.get("/")
def serve_index():
    return send_from_directory(ROOT, "index.html")


@app.get("/<path:asset_path>")
def serve_assets(asset_path: str):
    target = ROOT / asset_path
    if target.is_file():
        return send_from_directory(ROOT, asset_path)
    return send_from_directory(ROOT, "index.html")


if __name__ == "__main__":
    app.run(host=HOST, port=PORT)
