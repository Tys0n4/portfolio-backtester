import pandas as pd

def moving_average_crossover(df: pd.DataFrame, short_window: int, long_window: int) -> pd.DataFrame:
    df = df.copy()
    
    # Calculate moving averages
    df['short_ma'] = df['close'].rolling(window=short_window).mean()
    df['long_ma'] = df['close'].rolling(window=long_window).mean()
    
    # Generate signal: 1 = long, 0 = out
    # shift(1) prevents lookahead bias — we act on next day's open
    df['signal'] = 0
    df.loc[df['short_ma'] > df['long_ma'], 'signal'] = 1
    df['position'] = df['signal'].shift(1)
    
    # Calculate daily returns
    df['market_return'] = df['close'].pct_change()
    df['strategy_return'] = df['position'] * df['market_return']
    
    # Cumulative returns
    df['cumulative_market'] = (1 + df['market_return']).cumprod()
    df['cumulative_strategy'] = (1 + df['strategy_return']).cumprod()
    
    df.dropna(inplace=True)
    
    return df