import yfinance as yf
import pandas as pd

def fetch_price_data(ticker: str, start: str, end: str) -> pd.DataFrame:
    df = yf.download(ticker, start=start, end=end, auto_adjust=True)
    
    if df.empty:
        raise ValueError(f"No data found for ticker: {ticker}")
    
    df = df[['Close']].copy()
    df.columns = ['close']
    df.dropna(inplace=True)
    
    return df