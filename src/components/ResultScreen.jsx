import { CheckCircle2, TrendingUp, MessageCircle } from 'lucide-react'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

export default function ResultScreen({ answers, lead }) {
  const budgetValue = answers.budget?.value ?? 0
  const percentValue = answers.yield?.value ?? 0
  const projectedYearlyIncome = budgetValue * percentValue * 0.1

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-5 py-10 text-center bg-gradient-to-b from-blue-50/60 to-white animate-fade-in">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
        <CheckCircle2 className="w-8 h-8 text-emerald-600" strokeWidth={1.75} />
      </div>

      <h2 className="text-[22px] font-extrabold text-slate-900 leading-snug mb-3 max-w-sm">
        Вы сделали большой шаг навстречу финансовой стабильности{lead?.name ? `, ${lead.name}` : ''}!
      </h2>

      <p className="text-[14px] text-slate-500 leading-relaxed max-w-sm mb-7">
        Мы поможем вам двигаться к своим целям. Ваш персональный аналитик уже готовит для вас
        детальный план и свяжется с вами в ближайшее время.
      </p>

      <div className="w-full max-w-sm rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white shadow-sm p-5 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-blue-600" strokeWidth={2} />
          <span className="text-[12px] font-semibold uppercase tracking-wide text-blue-600">
            Иллюстративный расчёт на год
          </span>
        </div>
        <div className="text-[36px] font-extrabold text-slate-900 tabular-nums leading-tight">
          ${currencyFormatter.format(projectedYearlyIncome)}
        </div>
        <p className="text-[12px] text-slate-500 mt-2">
          При выбранной стратегии и стартовом капитале. Это гипотетический пример, не гарантия
          дохода — торговля с плечом может привести к потере вложенных средств.
        </p>
      </div>

      <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-3 max-w-sm">
        <MessageCircle className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={2} />
        <p className="text-[13px] text-slate-600 text-left leading-snug">
          Держите телефон под рукой — аналитик «Финансовый план» свяжется с вами в течение
          15 минут.
        </p>
      </div>
    </div>
  )
}
