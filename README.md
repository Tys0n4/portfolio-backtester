# Portfolio Backtester

A full-stack backtesting platform for moving average crossover strategies. Built with Python (FastAPI) and React.

**Developed by Thai Nguyen** · [GitHub](https://github.com/Tys0n4)

---

## Live Demo

**Frontend:** https://portfolio-backtester-rho.vercel.app  
**API Docs:** https://portfolio-backtester-2gl3.onrender.com/docs

---

## Overview

Portfolio Backtester lets you test a moving average crossover strategy on any stock ticker using years of historical price data. Instead of manually calculating returns, the app fetches real OHLCV data, runs the strategy with lookahead-bias-free signal generation, and returns a full performance report — including Sharpe ratio, max drawdown, win rate, and a benchmark comparison against buy-and-hold.

---

## Features

- **Any ticker** — test any stock supported by yfinance (e.g. AAPL, TSLA, SPY)
- **Configurable MA windows** — set your own short and long moving average windows
- **Custom date ranges** — backtest over any historical period
- **Lookahead-bias-free** — signals are generated using only data available at the time of the trade
- **Performance metrics** — Sharpe ratio, max drawdown, win rate, total return, benchmark return, total trades
- **Equity curve** — interactive chart comparing strategy vs buy-and-hold over time
- **REST API** — FastAPI backend with auto-generated interactive docs at `/docs`
- **React dashboard** — clean dark-themed UI with metrics cards and Recharts equity curve

---

## Tech Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Backend    | Python, FastAPI, Uvicorn           |
| Data       | yfinance, pandas, NumPy            |
| Frontend   | React, Vite, Recharts              |
| Deployment | Vercel (frontend), Render (backend)|

---

## Project Structure

portfolio-backtester/
├── app/
│ ├── data.py # yfinance price fetching
│ ├── strategy.py # MA crossover logic (lookahead-bias-free)
│ ├── metrics.py # Sharpe ratio, drawdown, win rate
│ └── backtester.py # Full pipeline
├── api/
│ ├── main.py # FastAPI app + CORS
│ └── routes/
│ └── backtest.py # POST /backtest
└── web/
└── src/
├── pages/
│ └── Backtest.jsx
└── components/
├── MetricsCard.jsx
└── EquityCurve.jsx

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+

### 1. Clone the repo

```bash
git clone https://github.com/Tys0n4/portfolio-backtester.git
cd portfolio-backtester
```

### 2. Set up the backend

```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

### 3. Start the API

```bash
uvicorn api.main:app --reload --port 8000
```

API docs available at http://localhost:8000/docs

### 4. Set up the frontend

```bash
cd web
npm install
```

Create web/.env:

VITE_API_URL=http://localhost:8000

```bash
npm run dev
```

Open http://localhost:5173

---

## How It Works

### Strategy

The moving average crossover strategy generates two signals:

- **Golden Cross** — short MA crosses above long MA → Buy
- **Death Cross** — short MA crosses below long MA → Sell

Signals are shifted by one day (shift(1)) so the strategy only acts on the next day's data — preventing lookahead bias and ensuring realistic simulation.

### Metrics

| Metric | Description |
|--------|-------------|
| Total Return % | Strategy return over the period |
| Benchmark Return % | Buy-and-hold return over the same period |
| Sharpe Ratio | Annualized return per unit of risk (risk-free rate: 5%) |
| Max Drawdown % | Worst peak-to-trough loss during the period |
| Win Rate % | Percentage of trades that were profitable |
| Total Trades | Number of complete buy/sell cycles |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/backtest` | Run a backtest for a ticker and date range |

### Example Request

```json
{
  "ticker": "AAPL",
  "start": "2018-01-01",
  "end": "2024-01-01",
  "short_window": 50,
  "long_window": 200
}
```

### Example Response

```json
{
  "metrics": {
    "total_return_pct": 122.3,
    "benchmark_return_pct": 372.78,
    "sharpe_ratio": 0.5,
    "max_drawdown_pct": -43.33,
    "win_rate_pct": 33.33,
    "total_trades": 3
  },
  "equity_curve": [
    { "date": "2018-10-16", "strategy": 0.98, "benchmark": 0.96 }
  ]
}
```

---

## License

MIT License — feel free to use, modify, and distribute.

---

*Built by Thai Nguyen · [github.com/Tys0n4](https://github.com/Tys0n4)*