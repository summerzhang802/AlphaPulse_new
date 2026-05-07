from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import init_db, get_connection
from datetime import datetime

from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key) if groq_api_key else None

app = FastAPI(title="AlphaPulse Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()


class DecisionLogRequest(BaseModel):
    ticker: str
    action: str
    reason: str


class NewsAIRequest(BaseModel):
    ticker: str
    headline: str


class PortfolioRequest(BaseModel):
    amount: float
    risk_level: str


@app.get("/")
def root():
    return {"message": "AlphaPulse backend is running"}


@app.get("/watchlist")
def get_watchlist():
    return [
        {"ticker": "AAPL", "name": "Apple Inc.", "news": 12, "risk": 22, "action": "Monitor", "price": 189.45, "change": 1.24},
        {"ticker": "TSLA", "name": "Tesla, Inc.", "news": 24, "risk": 68, "action": "Reduce Risk", "price": 242.10, "change": -3.18},
        {"ticker": "NVDA", "name": "NVIDIA Corp.", "news": 31, "risk": 54, "action": "Monitor", "price": 478.32, "change": 4.62},
        {"ticker": "MSFT", "name": "Microsoft Corp.", "news": 9, "risk": 18, "action": "Hold", "price": 412.78, "change": 0.85},
        {"ticker": "AMZN", "name": "Amazon.com Inc.", "news": 14, "risk": 35, "action": "Hold", "price": 178.22, "change": 2.10},
    ]


@app.get("/daily_brief")
def get_daily_brief():
    return [
        {
            "ticker": "AAPL",
            "headline": "Apple beats Q4 earnings on strong iPhone 15 demand",
            "explanation": "Apple sold more iPhones than analysts expected. This usually means the company is healthy and people still want their products.",
            "impact": "Bullish",
        },
        {
            "ticker": "TSLA",
            "headline": "Tesla cuts vehicle prices in key European markets",
            "explanation": "Tesla is lowering prices to sell more cars. This can hurt short-term profit but may help compete with rivals.",
            "impact": "Bearish",
        },
        {
            "ticker": "NVDA",
            "headline": "NVIDIA partners with major cloud provider on new AI chips",
            "explanation": "NVIDIA signed a big deal to supply chips for AI. Demand for their products keeps growing, which is generally a good sign.",
            "impact": "Bullish",
        },
    ]


@app.get("/decisions")
def get_decision_logs():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM decision_logs ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


@app.post("/decisions")
def create_decision_log(entry: DecisionLogRequest):
    conn = get_connection()
    cursor = conn.cursor()

    date_str = datetime.now().strftime("%Y-%m-%d")

    cursor.execute(
        """
        INSERT INTO decision_logs (ticker, action, reason, date)
        VALUES (?, ?, ?, ?)
        """,
        (entry.ticker.upper(), entry.action, entry.reason, date_str)
    )

    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return {
        "id": new_id,
        "ticker": entry.ticker.upper(),
        "action": entry.action,
        "reason": entry.reason,
        "date": date_str
    }


@app.delete("/decisions/{entry_id}")
def delete_decision_log(entry_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM decision_logs WHERE id = ?", (entry_id,))
    deleted_count = cursor.rowcount

    conn.commit()
    conn.close()

    if deleted_count == 0:
        return {"message": "Entry not found"}

    return {"message": "Entry deleted successfully", "id": entry_id}


@app.post("/evaluate_portfolio")
def evaluate_portfolio(req: PortfolioRequest):
    allocations = {
        "Conservative": [
            {"name": "Large-cap ETFs", "value": 50, "note": "Stable, diversified across top companies."},
            {"name": "Bonds / Cash", "value": 30, "note": "Cushion against market drops."},
            {"name": "Dividend Stocks", "value": 20, "note": "Steady income from established companies."},
        ],
        "Balanced": [
            {"name": "Large-cap ETFs", "value": 40, "note": "Core stable foundation."},
            {"name": "Growth Stocks", "value": 35, "note": "Upside from rising companies."},
            {"name": "Bonds / Cash", "value": 15, "note": "Safety buffer."},
            {"name": "International", "value": 10, "note": "Diversification beyond the US."},
        ],
        "Aggressive": [
            {"name": "Growth Stocks", "value": 50, "note": "Higher upside, higher swings."},
            {"name": "Tech / AI ETFs", "value": 30, "note": "Concentrated bet on innovation."},
            {"name": "Emerging Markets", "value": 15, "note": "Higher risk, higher potential."},
            {"name": "Cash", "value": 5, "note": "Small reserve for opportunities."},
        ],
    }

    risk_level = req.risk_level if req.risk_level in allocations else "Balanced"

    return {
        "amount": req.amount,
        "risk_level": risk_level,
        "allocations": allocations[risk_level]
    }


@app.post("/ai_news")
def ai_news(req: NewsAIRequest):
    if not client:
        return {
            "summary": f"{req.ticker.upper()} — {req.headline} In simple terms: this headline was received, but GROQ_API_KEY is not set yet. It may matter for investors, but the AI service is not connected right now.",
            "impact": "Neutral"
        }

    prompt = f"""
You are helping a beginner investor understand stock news.

Analyze this stock news headline and return ONLY valid JSON.

Ticker: {req.ticker}
Headline: {req.headline}

Return this exact JSON format:
{{
  "summary": "2 to 3 simple beginner-friendly sentences",
  "impact": "Bullish"
}}

Rules:
- impact must be exactly one of: Bullish, Bearish, Neutral
- summary must be 2 to 3 short sentences
- summary must be easy to understand for a beginner
- explain what happened and why it may matter
- do not include markdown
- do not include extra text
"""

    chat = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    content = chat.choices[0].message.content

    try:
        parsed = json.loads(content)
        impact = parsed.get("impact", "Neutral")
        if impact not in ["Bullish", "Bearish", "Neutral"]:
            impact = "Neutral"

        return {
            "summary": parsed.get("summary", "No summary available."),
            "impact": impact
        }
    except Exception:
        return {
            "summary": content,
            "impact": "Neutral"
        }