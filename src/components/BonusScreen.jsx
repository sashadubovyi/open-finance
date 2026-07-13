import { useState } from 'react'
import { Gift, KeyRound, Loader2, AlertTriangle } from 'lucide-react'
import { submitLead } from '../utils/submitLead.js'

export default function BonusScreen({ answers, lead, onSubmitted }) {
  const [codeword, setCodeword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return

    const trimmed = codeword.trim()
    if (trimmed.length < 2) {
      setError('Придумайте кодовое слово')
      return
    }
    setError('')
    setSubmitting(true)

    const payload = {
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      goal: answers.goal?.label ?? '',
      experience: answers.experience?.label ?? '',
      instruments: answers.instruments?.label ?? '',
      time: answers.time?.label ?? '',
      horizon: answers.horizon?.label ?? '',
      yieldExpectation: answers.yield?.label ?? '',
      budget: answers.budget?.label ?? '',
      codeword: trimmed,
    }

    try {
      await submitLead(payload)
    } finally {
      onSubmitted()
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col px-5 pt-10 pb-8 bg-gradient-to-b from-blue-50/60 to-white animate-fade-in">
      <div className="flex flex-col items-center text-center mb-7">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border border-blue-200 mb-5">
          <Gift className="w-8 h-8 text-blue-600" strokeWidth={1.75} />
        </div>

        <h2 className="text-[22px] font-extrabold text-slate-900 leading-snug mb-3">
          Поздравляем!
        </h2>
        <p className="text-[15px] text-slate-600 leading-relaxed max-w-sm">
          Вам доступен приветственный бонус в размере{' '}
          <span className="font-bold text-blue-600">$50</span> от компании!
        </p>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white shadow-sm p-5 mb-6 text-center">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-blue-600">
          Ваш приветственный бонус
        </span>
        <div className="text-[40px] font-extrabold text-slate-900 tabular-nums leading-tight mt-1">
          $50
        </div>
      </div>

      <p className="text-[14px] text-slate-600 leading-relaxed text-center mb-4">
        Для получения бонуса придумайте и напишите кодовое слово:
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white shadow-sm px-4 py-3.5 focus-within:border-blue-400 transition-colors">
            <KeyRound className="w-4.5 h-4.5 text-slate-400 shrink-0" strokeWidth={1.75} />
            <input
              type="text"
              inputMode="text"
              placeholder="Ваше кодовое слово"
              value={codeword}
              onChange={(e) => {
                setCodeword(e.target.value)
                if (error) setError('')
              }}
              className="w-full bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400"
            />
          </div>
          {error && <p className="text-[12px] text-red-500 mt-1 ml-1">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-400 py-4 text-[14px] font-bold tracking-wide text-white shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform disabled:opacity-70"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
          ) : (
            'ПОЛУЧИТЬ БОНУС'
          )}
        </button>

        <p className="flex items-start justify-center gap-1.5 text-[12px] text-slate-500 mt-1 text-center">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
          <span>
            <span className="font-bold text-slate-700">ВАЖНО!</span> Менеджер обязан знать
            введенное Вами кодовое слово.
          </span>
        </p>
      </form>
    </div>
  )
}
