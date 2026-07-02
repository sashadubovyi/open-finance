import { useEffect, useState } from 'react'
import { ChevronLeft, Check, CheckCircle2, ArrowRight } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'
import { QUIZ_FLOW, FACT_ICON } from '../data/quizData.js'

const CONFIRM_DELAY_MS = 550
const FACT_AUTO_ADVANCE_MS = 3200

export default function QuizScreen({ onComplete }) {
  const [flowIndex, setFlowIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [transitioning, setTransitioning] = useState(false)
  const [justConfirmed, setJustConfirmed] = useState(false)

  const item = QUIZ_FLOW[flowIndex]
  const isLast = flowIndex === QUIZ_FLOW.length - 1

  function advance(nextAnswers) {
    if (isLast) {
      onComplete(nextAnswers ?? answers)
    } else {
      setFlowIndex((i) => i + 1)
      setTransitioning(false)
      setJustConfirmed(false)
    }
  }

  function selectOption(option) {
    if (transitioning) return
    const nextAnswers = { ...answers, [item.step.key]: option }
    setAnswers(nextAnswers)
    setTransitioning(true)
    setJustConfirmed(true)

    window.setTimeout(() => advance(nextAnswers), CONFIRM_DELAY_MS)
  }

  useEffect(() => {
    if (item.type !== 'fact') return undefined
    const timer = window.setTimeout(() => advance(), FACT_AUTO_ADVANCE_MS)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowIndex])

  function goBack() {
    if (flowIndex === 0) return
    setFlowIndex((i) => i - 1)
    setJustConfirmed(false)
  }

  if (item.type === 'fact') {
    const FactIcon = FACT_ICON
    return (
      <div className="min-h-[100dvh] flex flex-col px-5 pt-6 pb-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={goBack}
            aria-label="Назад"
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          <div className="flex-1">
            <ProgressBar step={flowIndex + 1} total={QUIZ_FLOW.length} />
          </div>
        </div>

        <div key={flowIndex} className="flex-1 flex flex-col items-center justify-center text-center animate-fade-slide-up">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 mb-5">
            <FactIcon className="w-6 h-6 text-amber-500" strokeWidth={1.75} />
          </div>
          <span className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Полезно знать
          </span>
          <p className="text-[17px] leading-snug font-medium text-slate-800 max-w-xs mb-8">
            {item.fact.text}
          </p>
          <button
            type="button"
            onClick={() => advance()}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white shadow-sm px-5 py-2.5 text-[13px] font-semibold text-slate-600 active:scale-95 transition-transform"
          >
            Продолжить
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    )
  }

  const step = item.step
  const StepIcon = step.icon
  const selectedLabel = answers[step.key]?.label

  return (
    <div className="min-h-[100dvh] flex flex-col px-5 pt-6 pb-8 bg-white relative">
      <div className="flex items-center gap-3 mb-6">
        {flowIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            aria-label="Назад"
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
        )}
        <div className="flex-1">
          <ProgressBar step={flowIndex + 1} total={QUIZ_FLOW.length} />
        </div>
      </div>

      <div key={step.key} className="flex-1 flex flex-col animate-fade-slide-up">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 mb-5">
          <StepIcon className="w-6 h-6 text-blue-600" strokeWidth={1.75} />
        </div>

        <h2 className="text-[21px] leading-snug font-bold text-slate-900 mb-6">{step.question}</h2>

        <div className="flex flex-col gap-3">
          {step.options.map((option) => {
            const active = selectedLabel === option.label
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => selectOption(option)}
                disabled={transitioning}
                className={`relative text-left rounded-2xl border px-4 py-4 transition-colors duration-200 active:scale-[0.98] transition-transform ${
                  active
                    ? 'border-blue-500/60 bg-blue-50'
                    : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[15px] font-semibold text-slate-900 leading-snug">
                      {option.label}
                    </div>
                    <div className="text-[13px] text-slate-500 mt-0.5 leading-snug">
                      {option.hint}
                    </div>
                  </div>
                  <div
                    className={`shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full border transition-colors ${
                      active ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {justConfirmed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center animate-fade-slide-up">
          <div className="flex items-center gap-2 rounded-full bg-emerald-600 text-white px-4 py-2 shadow-lg shadow-emerald-600/25">
            <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
            <span className="text-[13px] font-semibold">Ответ сохранён</span>
          </div>
        </div>
      )}
    </div>
  )
}
