import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function EquityCurve({ data }) {
  const formatted = data.map(d => ({
    ...d,
    strategy: parseFloat((d.strategy * 100 - 100).toFixed(2)),
    benchmark: parseFloat((d.benchmark * 100 - 100).toFixed(2))
  }))

  return (
    <div style={{
      background: '#1a1d27',
      border: '1px solid #2a2d3a',
      borderRadius: '12px',
      padding: '24px'
    }}>
      <h2 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '24px', color: '#888' }}>
        EQUITY CURVE
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={formatted}>
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#888', fontSize: 11 }}
            tickLine={false}
            interval={Math.floor(formatted.length / 6)}
          />
          <YAxis 
            tick={{ fill: '#888', fontSize: 11 }}
            tickLine={false}
            tickFormatter={v => `${v}%`}
          />
          <Tooltip 
            contentStyle={{ background: '#1a1d27', border: '1px solid #2a2d3a', borderRadius: '8px' }}
            formatter={v => `${v}%`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="strategy" 
            stroke="#4f6ef7" 
            dot={false} 
            strokeWidth={2}
            name="Strategy"
          />
          <Line 
            type="monotone" 
            dataKey="benchmark" 
            stroke="#4ade80" 
            dot={false} 
            strokeWidth={2}
            name="Buy & Hold"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}