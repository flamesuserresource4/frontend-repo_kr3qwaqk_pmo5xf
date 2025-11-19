import { useEffect, useState } from 'react'

const PERIODS = [
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
]

export default function KPIs() {
  const [period, setPeriod] = useState('yesterday')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/metrics/summary?period=${period}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [period])

  return (
    <section className="relative bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <h2 className="text-2xl font-semibold mr-4">Key figures</h2>
          <div className="inline-flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            {PERIODS.map(p => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-3 py-1.5 text-sm transition-colors ${period === p.key ? 'bg-orange-500 text-white' : 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                aria-pressed={period === p.key}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="text-slate-500">Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Key figures">
            {data.kpis.map((kpi, idx) => (
              <div key={idx} role="listitem" className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-white/5 backdrop-blur p-5">
                <div className="text-sm text-slate-500 dark:text-slate-400">{kpi.label}</div>
                <div className="mt-1 text-3xl font-bold tracking-tight">
                  {Intl.NumberFormat('no-NO').format(kpi.value)} {kpi.unit || ''}
                </div>
                {data.mock && <span className="mt-2 inline-block text-xs text-amber-600">demo</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
