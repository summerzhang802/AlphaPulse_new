export const watchlist = [
  { ticker: "AAPL", name: "Apple Inc.", news: 12, risk: 22, action: "Monitor" as const, price: 189.45, change: 1.24 },
  { ticker: "TSLA", name: "Tesla, Inc.", news: 24, risk: 68, action: "Reduce Risk" as const, price: 242.10, change: -3.18 },
  { ticker: "NVDA", name: "NVIDIA Corp.", news: 31, risk: 54, action: "Monitor" as const, price: 478.32, change: 4.62 },
  { ticker: "MSFT", name: "Microsoft Corp.", news: 9, risk: 18, action: "Hold" as const, price: 412.78, change: 0.85 },
  { ticker: "AMZN", name: "Amazon.com Inc.", news: 14, risk: 35, action: "Hold" as const, price: 178.22, change: 2.10 },
];

export const dailyBrief = [
  {
    ticker: "AAPL",
    headline: "Apple beats Q4 earnings on strong iPhone 15 demand",
    explanation: "Apple sold more iPhones than analysts expected. This usually means the company is healthy and people still want their products.",
    impact: "Bullish" as const,
  },
  {
    ticker: "TSLA",
    headline: "Tesla cuts vehicle prices in key European markets",
    explanation: "Tesla is lowering prices to sell more cars. This can hurt short-term profit but may help compete with rivals.",
    impact: "Bearish" as const,
  },
  {
    ticker: "NVDA",
    headline: "NVIDIA partners with major cloud provider on new AI chips",
    explanation: "NVIDIA signed a big deal to supply chips for AI. Demand for their products keeps growing, which is generally a good sign.",
    impact: "Bullish" as const,
  },
];

export const decisionLog = [
  { id: 1, ticker: "AAPL", action: "Buy" as const, reason: "Strong earnings and steady iPhone demand.", date: "2025-04-18" },
  { id: 2, ticker: "TSLA", action: "Set Alert" as const, reason: "Watching price drop after EU price cuts.", date: "2025-04-17" },
  { id: 3, ticker: "NVDA", action: "Hold" as const, reason: "AI tailwinds remain, but valuation is rich.", date: "2025-04-15" },
  { id: 4, ticker: "MSFT", action: "Buy" as const, reason: "Cloud growth and AI integration look durable.", date: "2025-04-12" },
];

export const allocations = {
  Conservative: [
    { name: "Large-cap ETFs", value: 50, note: "Stable, diversified across top companies." },
    { name: "Bonds / Cash", value: 30, note: "Cushion against market drops." },
    { name: "Dividend Stocks", value: 20, note: "Steady income from established companies." },
  ],
  Balanced: [
    { name: "Large-cap ETFs", value: 40, note: "Core stable foundation." },
    { name: "Growth Stocks", value: 35, note: "Upside from rising companies." },
    { name: "Bonds / Cash", value: 15, note: "Safety buffer." },
    { name: "International", value: 10, note: "Diversification beyond the US." },
  ],
  Aggressive: [
    { name: "Growth Stocks", value: 50, note: "Higher upside, higher swings." },
    { name: "Tech / AI ETFs", value: 30, note: "Concentrated bet on innovation." },
    { name: "Emerging Markets", value: 15, note: "Higher risk, higher potential." },
    { name: "Cash", value: 5, note: "Small reserve for opportunities." },
  ],
};
