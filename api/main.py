from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import backtest

app = FastAPI(title="Portfolio Backtester API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(backtest.router)