export default function MetricsCard({ metrics }) {
  const items = [
    { label: 'Strategy Return', value: `${metrics.total_return_pct}%`, positive: metrics.total_return_pct > 0 },
    { label: 'Benchmark Return', value: `${metrics.benchmark_return_pct}%`, positive: metrics.benchmark_return_pct > 0 },
    { label: 'Sharpe Ratio', value: metrics.sharpe_ratio, positive: metrics.sharpe_ratio > 1 },
    { label: 'Max Drawdown', value: `${metrics.max_drawdown_pct}%`, positive: false },
    { label: 'Win Rate', value: `${metrics.win_rate_pct}%`, positive: metrics.win_rate_pct > 50 },
    { label: 'Total Trades', value: metrics.total_trades, positive: true },
  ]

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: '#888' }}>
        RESULTS
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
        {items.map(item => (
          <div key={item.label} style={{
            background: '#1a1d27',
            border: '1px solid #2a2d3a',
            borderRadius: '10px',
            padding: '16px'
          }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{item.label}</div>
            <div style={{ 
              fontSize: '20px', 
              fontWeight: '600',
              color: item.positive ? '#4ade80' : item.label === 'Max Drawdown' ? '#f87171' : '#e0e0e0'
            }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}