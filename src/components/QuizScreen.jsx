import { useState } from 'react'
import { ChevronLeft, Check } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'
import { QUIZ_STEPS } from '../data/quizData.js'

export default function QuizScreen({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [transitioning, setTransitioning] = useState(false)

  const step = QUIZ_STEPS[stepIndex]
  const StepIcon = step.icon
  const isLast = stepIndex === QUIZ_STEPS.length - 1

  function selectOption(option) {
    if (transitioning) return
    const nextAnswers = { ...answers, [step.key]: option }
    setAnswers(nextAnswers)
    setTransitioning(true)

    window.setTimeout(() => {
      if (isLast) {
        onComplete(nextAnswers)
      } else {
        setStepIndex((i) => i + 1)
        setTransitioning(false)
      }
    }, 320)
  }

  function goBack() {
    if (stepIndex === 0) return
    setStepIndex((i) => i - 1)
  }

  const selectedLabel = answers[step.key]?.label

  return (
    <div className="min-h-[100dvh] flex flex-col px-5 pt-6 pb-8 bg-white">
      <div className="flex items-center gap-3 mb-6">
        {stepIndex > 0 && (
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
          <ProgressBar step={stepIndex + 1} total={QUIZ_STEPS.length} />
        </div>
      </div>

      <div
        key={step.key}
        className="flex-1 flex flex-col animate-fade-slide-up"
      >
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
    </div>
  )
}
