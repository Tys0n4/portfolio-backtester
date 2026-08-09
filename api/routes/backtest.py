from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.backtester import run_backtest

router = APIRouter()

class BacktestRequest(BaseModel):
    ticker: str
    start: str
    end: str
    short_window: int = 50
    long_window: int = 200

@router.post("/backtest")
def backtest(req: BacktestRequest):
    try:
        result = run_backtest(
            ticker=req.ticker,
            start=req.start,
            end=req.end,
            short_window=req.short_window,
            long_window=req.long_window
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))