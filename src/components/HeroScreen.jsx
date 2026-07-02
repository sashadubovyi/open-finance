import { ShieldCheck, Gift, ArrowRight, Globe2, TriangleAlert } from 'lucide-react'

export default function HeroScreen({ onStart }) {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-between px-5 pt-8 pb-6 bg-gradient-to-b from-blue-50 via-white to-white animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/15 to-sky-400/15 border border-blue-200">
            <ShieldCheck className="w-5 h-5 text-blue-600" strokeWidth={2} />
          </div>
          <span className="text-sm font-bold tracking-widest text-slate-800 uppercase">
            OTKRITIE BROKER <span className="text-slate-400">LTD.</span>
          </span>
        </div>

        <h1 className="text-[28px] leading-[1.25] font-extrabold text-slate-900 tracking-tight mb-4">
          Узнайте, как запустить{' '}
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            пассивный доход от $1,500
          </span>{' '}
          в месяц на автопилоте, уделяя этому всего 10 минут в день
        </h1>

        <p className="text-[15px] leading-relaxed text-slate-500 mb-8">
          Пройдите короткий тест за 45 секунд, определите свой денежный потенциал и заберите
          гарантированный подарок:{' '}
          <span className="text-slate-900 font-medium">
            Видео-урок «Как новичку заработать первые $500 на уникальной стратегии»
          </span>
        </p>

        <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 mb-2 shadow-sm shadow-blue-100/50">
          <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-blue-100">
            <Globe2 className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
          </div>
          <p className="text-[13px] leading-snug text-slate-500">
            Мы предлагаем уникальные международные инвестиционные инструменты, которые сейчас
            закрыты и абсолютно недоступны у любого другого брокера в РФ. Прямой доступ к
            глобальным рынкам.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={onStart}
          className="group relative w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-400 py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-500/25 animate-pulse-glow active:scale-[0.98] transition-transform"
        >
          <Gift className="w-5 h-5" strokeWidth={2.25} />
          Начать тест и забрать подарок
          <ArrowRight className="w-4 h-4 transition-transform group-active:translate-x-0.5" />
        </button>
        <p className="text-center text-[12px] text-slate-400 mt-3">
          Бесплатно · Займет 45 секунд · Без обязательств
        </p>
      </div>
    </div>
  )
}
