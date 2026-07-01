export default function ProgressBar({ step, total }) {
  const percent = (step / total) * 100

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium tracking-wide text-slate-400">
          Шаг {step} из {total}
        </span>
        <span className="text-xs font-semibold text-blue-600">{Math.round(percent)}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400 transition-transform duration-500 ease-out will-change-transform origin-left"
          style={{ transform: `scaleX(${percent / 100})`, width: '100%' }}
        />
      </div>
    </div>
  )
}
