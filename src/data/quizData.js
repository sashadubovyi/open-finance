import { Wallet, Clock, Percent, Rocket, GraduationCap, Layers, CalendarClock, Lightbulb } from 'lucide-react'

const goalStep = {
  key: 'goal',
  icon: Wallet,
  question: 'Какую сумму чистой прибыли вы хотите получать на свой счет каждый месяц?',
  options: [
    { label: '$500 – $1,500', hint: 'Чисто на карманные расходы' },
    { label: '$1,500 – $5,000', hint: 'Чтобы уволиться с работы' },
    { label: '$5,000 – $15,000', hint: 'Для покупки авто и путешествий' },
    { label: 'От $15,000+', hint: 'Хочу ни в чем себе не отказывать' },
  ],
}

const experienceStep = {
  key: 'experience',
  icon: GraduationCap,
  question: 'Какой у вас опыт в инвестициях?',
  options: [
    { label: 'Новичок', hint: 'Никогда не инвестировал(а) раньше' },
    { label: 'Есть небольшой опыт', hint: 'Уже пробовал(а) вкладывать деньги' },
    { label: 'Опытный трейдер', hint: 'Регулярно торгую и слежу за рынками' },
  ],
}

const instrumentsStep = {
  key: 'instruments',
  icon: Layers,
  question: 'Что вам интереснее всего?',
  options: [
    { label: 'Акции', hint: 'Крупные мировые компании' },
    { label: 'Криптовалюта', hint: 'Bitcoin, Ethereum и другие' },
    { label: 'Форекс', hint: 'Валютные пары' },
    { label: 'Золото и сырьё', hint: 'Защитные активы' },
    { label: 'Я новичок и пока ничего не знаю', hint: 'Помогите определиться' },
  ],
}

const timeStep = {
  key: 'time',
  icon: Clock,
  question: 'Сколько времени вы готовы уделять инвестициям?',
  options: [
    { label: 'Пассивный доход', hint: 'Вообще нет времени, хочу инвестировать и чтобы деньги приносили доход' },
    { label: 'Готовые сигналы', hint: 'Не более 10–15 минут в день с телефона' },
    { label: 'Активный доход', hint: 'Готов обучаться и торговать самостоятельно' },
  ],
}

const horizonStep = {
  key: 'horizon',
  icon: CalendarClock,
  question: 'На какой срок вы готовы инвестировать?',
  options: [
    { label: 'До 3 месяцев', hint: 'Краткосрочные вложения' },
    { label: '1–2 года', hint: 'Среднесрочная стратегия' },
    { label: '3+ года', hint: 'Долгосрочный рост капитала' },
  ],
}

const yieldStep = {
  key: 'yield',
  icon: Percent,
  question: 'Какая доходность вас устроит при поддержке нашего личного аналитика?',
  options: [
    { label: '300% годовых', hint: 'Консервативная стратегия с плечом на акциях Apple, Google, Tesla', value: 300 },
    { label: '520% годовых', hint: 'Быстрый разгон капитала на горячих трендах и золоте', value: 420 },
    { label: 'От 750% годовых и выше', hint: 'Максимальный доход на криптовалютах и инсайдерских сделках', value: 550 },
  ],
}

const budgetStep = {
  key: 'budget',
  icon: Rocket,
  question: 'Какую сумму вы готовы выделить для тестового старта, чтобы увидеть первую прибыль уже через 24 часа?',
  options: [
    { label: 'Около $100 – $250', hint: 'Попробовать с минимальной суммы', value: 250 },
    { label: '$500 – $1,500', hint: 'Начать уверенно', value: 1500 },
    { label: 'От $3,000 и выше', hint: 'Создать серьезный капитал', value: 3000 },
  ],
}

const fact1 = {
  text: 'Индекс S&P 500 объединяет 500 крупнейших публичных компаний США и рассчитывается с 1957 года.',
}

const fact2 = {
  text: 'Диверсификация — распределение вложений между разными активами — один из базовых принципов управления риском.',
}

const fact3 = {
  text: 'Использование кредитного плеча под руководством опытных экспертов превращает его в уникальный инструмент для кратного умножения вашего капитала.',
}

// Real, dated single-day moves (sourced via web search); not a live feed —
// shown with explicit dates so it reads as historical, not "happening now".
export const MARKET_MOVES = [
  { ticker: 'MU', change: '+14,6%', date: '24 июня 2026', note: 'после отчёта о прибыли' },
  { ticker: 'META', change: '+8,55%', date: '30 апреля 2026', note: 'после квартального отчёта' },
  { ticker: 'AMZN', change: '+7%', date: '29 июня 2026', note: 'на новостях об AWS' },
  { ticker: 'AAPL', change: '+4,7%', date: '30 июня 2026' },
  { ticker: 'NVDA', change: '+2,58%', date: '30 июня 2026' },
  { ticker: 'NFLX', change: '+6,11%', date: '1 июля 2026' },
  { ticker: 'SBER', change: '+5,07%', date: '26 июня 2026' },
]

export const QUIZ_FLOW = [
  { type: 'question', step: goalStep },
  { type: 'question', step: experienceStep },
  { type: 'fact', fact: fact1 },
  { type: 'question', step: instrumentsStep },
  { type: 'market' },
  { type: 'question', step: timeStep },
  { type: 'fact', fact: fact2 },
  { type: 'question', step: horizonStep },
  { type: 'question', step: yieldStep },
  { type: 'fact', fact: fact3 },
  { type: 'question', step: budgetStep },
]

export const FACT_ICON = Lightbulb

export const LOADER_LINES = [
  { text: '+68% прибыли на Биткойне', result: 'было бы $1,680' },
  { text: '+110% прибыли на золоте', result: 'было бы $2,100' },
  { text: '+174% прибыли на NVIDIA', result: 'было бы $2,740' },
  { text: '+708% прибыли на INTEL', result: 'было бы $8,080' },
]
