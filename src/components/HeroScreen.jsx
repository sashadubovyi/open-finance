import { ShieldCheck, Gift, ArrowRight, Globe2 } from 'lucide-react'

export default function HeroScreen({ onStart }) {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-between px-5 pt-8 pb-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-gold-500/20 border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5 text-emerald-400" strokeWidth={2} />
          </div>
          <span className="text-sm font-bold tracking-widest text-slate-200 uppercase">
            Otkritie Broker <span className="text-slate-500">LTD.</span>
          </span>
        </div>

        <h1 className="text-[28px] leading-[1.25] font-extrabold text-white tracking-tight mb-4">
          Узнайте, как запустить{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            пассивный доход от $1,500
          </span>{' '}
          в месяц на автопилоте, уделяя этому всего 10 минут в день
        </h1>

        <p className="text-[15px] leading-relaxed text-slate-400 mb-8">
          Пройдите короткий тест за 45 секунд, определите свой денежный потенциал и заберите
          гарантированный подарок:{' '}
          <span className="text-slate-200 font-medium">
            Видео-урок «Как новичку сделать первые $500 на акциях мировых брендов без риска»
          </span>
        </p>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 mb-2">
          <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800">
            <Globe2 className="w-5 h-5 text-gold-400" strokeWidth={1.75} />
          </div>
          <p className="text-[13px] leading-snug text-slate-400">
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
          className="group relative w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 py-4 text-[15px] font-bold text-slate-950 shadow-lg shadow-gold-500/20 animate-pulse-glow active:scale-[0.98] transition-transform"
        >
          <Gift className="w-5 h-5" strokeWidth={2.25} />
          Начать тест и забрать подарок
          <ArrowRight className="w-4 h-4 transition-transform group-active:translate-x-0.5" />
        </button>
        <p className="text-center text-[12px] text-slate-600 mt-3">
          Бесплатно · Займет 45 секунд · Без обязательств
        </p>
      </div>
    </div>
  )
}
