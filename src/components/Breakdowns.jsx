import { useEffect, useState } from 'react'

const TABS = [
  { key: 'line', label: 'By line' },
  { key: 'station', label: 'By station' },
  { key: 'train_type', label: 'By train type' },
]

export default function Breakdowns() {
  const [period, setPeriod] = useState('yesterday')
  const [dim, setDim] = useState('line')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const endpoint = {
    line: 'by_line',
    station: 'by_station',
    train_type: 'by_train_type',
  }[dim]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/metrics/${endpoint}?period=${period}`)
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
  }, [period, endpoint])

  return (
    <section className="bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <h2 className="text-2xl font-semibold mr-4">Breakdowns</h2>
          <div className="inline-flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setDim(t.key)}
                className={`px-3 py-1.5 text-sm transition-colors ${dim === t.key ? 'bg-orange-500 text-white' : 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                aria-pressed={dim === t.key}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="ml-auto inline-flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            {['yesterday','week','month','year'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-sm capitalize transition-colors ${period === p ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                aria-pressed={period === p}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="text-slate-500">Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {data && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">Breakdown table</caption>
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th scope="col" className="py-2 pr-4 font-semibold">Name</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Boardings</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Departures</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Vehicles</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-900">
                    <th scope="row" className="py-2 pr-4 font-medium">{item.name}</th>
                    <td className="py-2 pr-4">{Intl.NumberFormat('no-NO').format(item.boardings)}</td>
                    <td className="py-2 pr-4">{Intl.NumberFormat('no-NO').format(item.departures)}</td>
                    <td className="py-2 pr-4">{Intl.NumberFormat('no-NO').format(item.vehicles)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.mock && <p className="mt-2 text-xs text-amber-600">demo</p>}
          </div>
        )}
      </div>
    </section>
  )
}
