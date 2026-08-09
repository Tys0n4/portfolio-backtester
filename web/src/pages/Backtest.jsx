import { useState } from 'react'
import axios from 'axios'
import MetricsCard from '../components/MetricsCard'
import EquityCurve from '../components/EquityCurve'

const API_URL = import.meta.env.VITE_API_URL

export default function Backtest() {
  const [form, setForm] = useState({
    ticker: 'AAPL',
    start: '2018-01-01',
    end: '2024-01-01',
    short_window: 50,
    long_window: 200
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await axios.post(`${API_URL}/backtest`, {
        ticker: form.ticker.toUpperCase(),
        start: form.start,
        end: form.end,
        short_window: parseInt(form.short_window),
        long_window: parseInt(form.long_window)
      })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Check the ticker and date range.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Header */}
      <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
        Portfolio Backtester
      </h1>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '32px' }}>
        Moving average crossover strategy — test any ticker against historical data
      </p>

      {/* Form */}
      <div style={{ 
        background: '#1a1d27', 
        borderRadius: '12px', 
        padding: '24px',
        marginBottom: '32px',
        border: '1px solid #2a2d3a'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Ticker', name: 'ticker', type: 'text', placeholder: 'e.g. AAPL' },
            { label: 'Start Date', name: 'start', type: 'date' },
            { label: 'End Date', name: 'end', type: 'date' },
            { label: 'Short MA Window', name: 'short_window', type: 'number', placeholder: '50' },
            { label: 'Long MA Window', name: 'long_window', type: 'number', placeholder: '200' },
          ].map(field => (
            <div key={field.name}>
              <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '6px' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  background: '#0f1117',
                  border: '1px solid #2a2d3a',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#e0e0e0',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            marginTop: '20px',
            background: loading ? '#2a2d3a' : '#4f6ef7',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {loading ? 'Running backtest...' : 'Run Backtest'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ 
          background: '#2d1a1a', 
          border: '1px solid #5a2a2a', 
          borderRadius: '8px', 
          padding: '12px 16px',
          color: '#ff6b6b',
          fontSize: '14px',
          marginBottom: '24px'
        }}>
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          <MetricsCard metrics={result.metrics} />
          <EquityCurve data={result.equity_curve} />
        </>
      )}
    </div>
  )
}