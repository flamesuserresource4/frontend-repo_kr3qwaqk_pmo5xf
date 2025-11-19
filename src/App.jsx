import Hero from './components/Hero'
import KPIs from './components/KPIs'
import Breakdowns from './components/Breakdowns'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />

      <main>
        <KPIs />
        <Breakdowns />
      </main>

      <footer className="bg-slate-950/90 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-white/60">
          Built for the Norwegian Railway Directorate. Accessible, responsive and ready to plug into Power BI.
        </div>
      </footer>
    </div>
  )
}

export default App