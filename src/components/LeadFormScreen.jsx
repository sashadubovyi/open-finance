import { useState } from 'react'
import { Clock, User, Phone, Mail, Loader2, Lock } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown.js'
import { formatPhoneInput, isValidPhone } from '../utils/phoneMask.js'
import { submitLead } from '../utils/submitLead.js'

export default function LeadFormScreen({ answers, onSubmitted }) {
  const { formatted, secondsLeft } = useCountdown(13 * 60)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const nextErrors = {}
    if (name.trim().length < 2) nextErrors.name = 'Введите ваше имя'
    if (!isValidPhone(phone)) nextErrors.phone = 'Введите корректный номер телефона'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Введите корректный e-mail'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    if (!validate()) return

    setSubmitting(true)

    const payload = {
      name: name.trim(),
      phone,
      email: email.trim(),
      goal: answers.goal?.label ?? '',
      time: answers.time?.label ?? '',
      yieldExpectation: answers.yield?.label ?? '',
      budget: answers.budget?.label ?? '',
    }

    try {
      await submitLead(payload)
    } finally {
      onSubmitted({ name: name.trim(), phone, email: email.trim() })
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col px-5 pt-8 pb-8 bg-white animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-[22px] font-extrabold text-slate-900 leading-snug mb-2">
          Расчет вашей инвестиционной стратегии готов!
        </h2>
        <p className="text-[14px] text-slate-500 leading-relaxed">
          Доступ к закрытому пулу сделок с доходностью от 300% зарезервирован за вашим номером.
          Закрепленный аналитик свяжется с вами для передачи готового плана.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3 mb-6">
        <Clock className="w-4 h-4 text-red-500" strokeWidth={2} />
        <span className="text-[13px] text-red-600">
          Ваш бонус и стратегия сгорят через:{' '}
          <span className="font-mono font-bold text-red-700 tabular-nums">{formatted}</span>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white shadow-sm px-4 py-3.5 focus-within:border-blue-400 transition-colors">
            <User className="w-4.5 h-4.5 text-slate-400 shrink-0" strokeWidth={1.75} />
            <input
              type="text"
              inputMode="text"
              autoComplete="name"
              placeholder="Фамилия Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400"
            />
          </div>
          {errors.name && <p className="text-[12px] text-red-500 mt-1 ml-1">{errors.name}</p>}
        </div>

        <div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white shadow-sm px-4 py-3.5 focus-within:border-blue-400 transition-colors">
            <Phone className="w-4.5 h-4.5 text-slate-400 shrink-0" strokeWidth={1.75} />
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              className="w-full bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400"
            />
          </div>
          {errors.phone && <p className="text-[12px] text-red-500 mt-1 ml-1">{errors.phone}</p>}
        </div>

        <div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white shadow-sm px-4 py-3.5 focus-within:border-blue-400 transition-colors">
            <Mail className="w-4.5 h-4.5 text-slate-400 shrink-0" strokeWidth={1.75} />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400"
            />
          </div>
          {errors.email && <p className="text-[12px] text-red-500 mt-1 ml-1">{errors.email}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-400 py-4 text-[14px] font-bold tracking-wide text-white shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform disabled:opacity-70"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
          ) : (
            'ПОЛУЧИТЬ СТРАТЕГИЮ И НАЧАТЬ ЗАРАБАТЫВАТЬ'
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-[12px] text-slate-400 mt-1">
          <Lock className="w-3 h-3" strokeWidth={2} />
          Ваши данные защищены и не передаются третьим лицам
        </p>
      </form>
    </div>
  )
}
