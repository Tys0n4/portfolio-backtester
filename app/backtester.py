from app.data import fetch_price_data
from app.strategy import moving_average_crossover
from app.metrics import calculate_metrics

def run_backtest(ticker: str, start: str, end: str, short_window: int, long_window: int) -> dict:
    df = fetch_price_data(ticker, start, end)
    df = moving_average_crossover(df, short_window, long_window)
    metrics = calculate_metrics(df)

    equity_curve = df[['cumulative_strategy', 'cumulative_market']].copy()
    equity_curve.index = equity_curve.index.strftime('%Y-%m-%d')
    equity_curve = equity_curve.reset_index()
    equity_curve.columns = ['date', 'strategy', 'benchmark']

    return {
        "metrics": metrics,
        "equity_curve": equity_curve.to_dict(orient='records')
    }