import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, Check, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'
import { QUIZ_FLOW, FACT_ICON, MARKET_MOVES } from '../data/quizData.js'

const CONFIRM_DELAY_MS = 550
const FACT_AUTO_ADVANCE_MS = 3200
const MARKET_REVEAL_INTERVAL_MS = 550
const MARKET_HOLD_MS = 2000

const currencyFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

export default function QuizScreen({ onComplete }) {
  const [flowIndex, setFlowIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [transitioning, setTransitioning] = useState(false)
  const [justConfirmed, setJustConfirmed] = useState(false)
  const [marketVisibleCount, setMarketVisibleCount] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)
  const [budgetInput, setBudgetInput] = useState('')
  const amountRef = useRef(null)

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
    if (item.type !== 'slider') return undefined
    const initial = answers[item.step.key]?.value ?? item.step.defaultValue
    setSliderValue(initial)
    setBudgetInput(String(initial))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowIndex])

  function handleSliderChange(e) {
    const value = Number(e.target.value)
    setSliderValue(value)
    setBudgetInput(String(value))

    const el = amountRef.current
    if (el) {
      el.classList.remove('pulse-scale')
      void el.offsetWidth
      el.classList.add('pulse-scale')
      window.setTimeout(() => el.classList.remove('pulse-scale'), 220)
    }
  }

  function handleBudgetInputChange(e) {
    setBudgetInput(e.target.value.replace(/[^\d]/g, ''))
  }

  function handleBudgetInputBlur() {
    const { min, max, step } = item.step
    let value = Number(budgetInput)
    if (!Number.isFinite(value)) value = min
    value = Math.round((value - min) / step) * step + min
    value = Math.min(max, Math.max(min, value))
    setSliderValue(value)
    setBudgetInput(String(value))
  }

  function confirmSlider() {
    if (transitioning) return
    selectOption({ label: `$${sliderValue.toLocaleString('en-US')}`, value: sliderValue })
  }

  useEffect(() => {
    if (item.type !== 'fact') return undefined
    const timer = window.setTimeout(() => advance(), FACT_AUTO_ADVANCE_MS)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowIndex])

  useEffect(() => {
    if (item.type !== 'market') return undefined
    setMarketVisibleCount(0)
  }, [flowIndex, item.type])

  useEffect(() => {
    if (item.type !== 'market') return undefined
    if (marketVisibleCount >= MARKET_MOVES.length) {
      const doneTimer = window.setTimeout(() => advance(), MARKET_HOLD_MS)
      return () => window.clearTimeout(doneTimer)
    }
    const timer = window.setTimeout(() => setMarketVisibleCount((c) => c + 1), MARKET_REVEAL_INTERVAL_MS)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowIndex, marketVisibleCount])

  function goBack() {
    if (flowIndex === 0) return
    setFlowIndex((i) => i - 1)
    setJustConfirmed(false)
  }

  if (item.type === 'market') {
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

        <div className="flex-1 flex flex-col animate-fade-slide-up">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Реальные движения рынка
          </span>
          <h2 className="text-[19px] leading-snug font-bold text-slate-900 mb-5">
            Так рынок вёл себя в отдельные дни 2026 года
          </h2>

          <div className="flex flex-col gap-2.5 mb-4">
            {MARKET_MOVES.slice(0, marketVisibleCount).map((move) => (
              <div
                key={move.ticker}
                className="animate-fade-slide-up rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2} />
                  <span className="text-[14px] font-semibold text-slate-900">{move.ticker}</span>
                  <span className="text-[14px] font-semibold text-emerald-600">{move.change}</span>
                </div>
                <div className="text-[12px] text-slate-400 mt-1 pl-[26px]">
                  {move.date}
                  {move.note ? `, ${move.note}` : ''}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-slate-400 leading-snug">
            Реальные однодневные движения указанных акций в конкретные даты. Это исторические
            данные, а не прогноз и не гарантия — результаты в прошлом не гарантируют результат в
            будущем.
          </p>
        </div>
      </div>
    )
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

  if (item.type === 'slider') {
    const step = item.step
    const StepIcon = step.icon
    const percent = ((sliderValue - step.min) / (step.max - step.min)) * 100
    const projectedProfit = sliderValue * (answers.yield?.value ?? 0) * 0.1

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

          <h2 className="text-[21px] leading-snug font-bold text-slate-900 mb-8">{step.question}</h2>

          <div className="flex flex-col items-center">
            <div ref={amountRef} className="flex items-center gap-1 mb-7">
              <span className="text-[32px] font-extrabold text-blue-600">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={budgetInput}
                onChange={handleBudgetInputChange}
                onBlur={handleBudgetInputBlur}
                aria-label="Введите сумму"
                className="w-36 bg-transparent text-[40px] font-extrabold text-slate-900 tabular-nums text-center border-b-2 border-slate-200 focus:border-blue-500 transition-colors"
              />
            </div>

            <input
              type="range"
              min={step.min}
              max={step.max}
              step={step.step}
              value={sliderValue}
              onChange={handleSliderChange}
              aria-label="Сумма тестового старта"
              className="budget-slider w-full accent-blue-600"
              style={{ background: `linear-gradient(to right, #2563eb ${percent}%, #e2e8f0 ${percent}%)` }}
            />

            <div className="flex items-center justify-between w-full mt-2">
              <span className="text-[12px] text-slate-400">${step.min}</span>
              <span className="text-[12px] text-slate-400">${step.max}</span>
            </div>

            <p className="text-[12px] text-slate-400 mt-4 text-center">
              Ориентировочная прибыль в год:{' '}
              <span className="text-sky-400 font-semibold">
                ${currencyFormatter.format(projectedProfit)}
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={confirmSlider}
          disabled={transitioning}
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-400 py-4 text-[14px] font-bold tracking-wide text-white shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform disabled:opacity-70"
        >
          Продолжить
        </button>

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
