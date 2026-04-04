import json
import os
from pathlib import Path
from urllib import error, request as urllib_request

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS


ROOT = Path(__file__).resolve().parent
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "5000"))
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "anthropic/claude-sonnet-4-5")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_URL = os.getenv("OPENROUTER_URL", "https://openrouter.ai/api/v1/chat/completions")
SITE_URL = os.getenv("SITE_URL", "https://rayanbbb.github.io/bachub/")
SITE_TITLE = os.getenv("SITE_TITLE", "BacHub")

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

    return (
        "You are an expert Moroccan Bac tutor specializing in 2BAC PC "
        "(Physics-Chemistry and Mathematics). You help students understand lessons, "
        "solve exercises, and prepare for the national exam. Answer in the same language "
        "the student uses (Arabic darija, French, or English). Be clear, encouraging, and pedagogical. "
        f"Current UI language: {lang}. "
        f"Current subject tab: {subject_info['label']}. "
        f"Current category tab: {category}. "
        f"Relevant topics on this screen: {subject_block}. "
        "Prefer step-by-step solutions, concise formulas, bac-style reasoning, and practical examples. "
        "If a student request is ambiguous, ask one short clarifying question first."
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


def send_openrouter_request(upstream_payload: dict) -> dict:
    req = urllib_request.Request(
        OPENROUTER_URL,
        data=json.dumps(upstream_payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": SITE_URL,
            "X-Title": SITE_TITLE,
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

    if not OPENROUTER_API_KEY:
        return jsonify({
            "error": "OPENROUTER_API_KEY is missing. Start the server with your API key."
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
        "model": OPENROUTER_MODEL,
        "messages": messages,
    }

    try:
        result = send_openrouter_request(upstream_payload)
    except error.HTTPError as exc:
        details = exc.read().decode("utf-8", errors="ignore")
        return jsonify({"error": details or "OpenRouter API error."}), exc.code
    except Exception as exc:
        return jsonify({"error": str(exc)}), 502

    reply = extract_reply(result)
    if not reply:
        return jsonify({"error": "Empty reply from AI provider."}), 502

    return jsonify({
        "reply": reply,
        "model": OPENROUTER_MODEL,
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
