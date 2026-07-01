import { useEffect, useState } from 'react'
import { Loader2, TrendingUp, TriangleAlert } from 'lucide-react'
import { LOADER_LINES } from '../data/quizData.js'

const LINE_INTERVAL_MS = 750
const FINAL_HOLD_MS = 1400

export default function LoadingScreen({ onDone }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (visibleCount >= LOADER_LINES.length) {
      const doneTimer = window.setTimeout(onDone, FINAL_HOLD_MS)
      return () => window.clearTimeout(doneTimer)
    }
    const timer = window.setTimeout(() => setVisibleCount((c) => c + 1), LINE_INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [visibleCount, onDone])

  const allShown = visibleCount >= LOADER_LINES.length

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-5 py-10 text-center bg-gradient-to-b from-white to-blue-50/60 animate-fade-in">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 border border-blue-200 mb-6">
        <Loader2 className="w-7 h-7 text-blue-600 animate-spin-slow" strokeWidth={2} />
      </div>

      <h2 className="text-[19px] font-bold text-slate-900 mb-2">
        Система подбирает активы под ваш бюджет...
      </h2>
      <p className="text-[14px] text-slate-500 mb-8 max-w-xs">
        Посмотрите, что было бы, если бы вы инвестировали всего $1,000 ровно 1 год назад:
      </p>

      <div className="w-full max-w-sm flex flex-col gap-2.5 mb-6">
        {LOADER_LINES.slice(0, visibleCount).map((line) => (
          <div
            key={line.text}
            className="animate-fade-slide-up flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-3"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2} />
              <span className="text-[14px] font-semibold text-emerald-600 truncate">
                {line.text}
              </span>
            </div>
            <span className="text-[13px] text-slate-500 shrink-0">{line.result}</span>
          </div>
        ))}
      </div>

      {allShown && (
        <div className="animate-fade-slide-up flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 max-w-sm">
          <TriangleAlert className="w-4 h-4 text-amber-500 shrink-0" strokeWidth={2} />
          <p className="text-[13px] font-medium text-amber-700 text-left">
            Вы уже потеряли эту прибыль. Не упустите тренды этого года!
          </p>
        </div>
      )}
    </div>
  )
}
