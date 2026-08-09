import pandas as pd
import numpy as np

def calculate_metrics(df: pd.DataFrame, risk_free_rate: float = 0.05) -> dict:
    strategy_returns = df['strategy_return']
    market_returns = df['market_return']

    # Total return
    total_return = df['cumulative_strategy'].iloc[-1] - 1
    benchmark_return = df['cumulative_market'].iloc[-1] - 1

    # Sharpe ratio (annualized)
    excess_returns = strategy_returns - risk_free_rate / 252
    sharpe_ratio = (excess_returns.mean() / excess_returns.std()) * np.sqrt(252)

    # Max drawdown
    cumulative = df['cumulative_strategy']
    rolling_max = cumulative.cummax()
    drawdown = (cumulative - rolling_max) / rolling_max
    max_drawdown = drawdown.min()

    # Win rate
    trades = df['position'].diff().fillna(0)
    trade_entries = df[trades == 1].index
    trade_exits = df[trades == -1].index

    wins = 0
    total_trades = min(len(trade_entries), len(trade_exits))

    for i in range(total_trades):
        entry_price = df.loc[trade_entries[i], 'close']
        exit_price = df.loc[trade_exits[i], 'close']
        if exit_price > entry_price:
            wins += 1

    win_rate = (wins / total_trades * 100) if total_trades > 0 else 0

    return {
        "total_return_pct": round(total_return * 100, 2),
        "benchmark_return_pct": round(benchmark_return * 100, 2),
        "sharpe_ratio": round(sharpe_ratio, 2),
        "max_drawdown_pct": round(max_drawdown * 100, 2),
        "win_rate_pct": round(win_rate, 2),
        "total_trades": total_trades
    }