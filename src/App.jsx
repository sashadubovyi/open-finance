import { useState } from 'react'
import HeroScreen from './components/HeroScreen.jsx'
import QuizScreen from './components/QuizScreen.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import LeadFormScreen from './components/LeadFormScreen.jsx'
import ResultScreen from './components/ResultScreen.jsx'

const SCREENS = {
  HERO: 'hero',
  QUIZ: 'quiz',
  LOADING: 'loading',
  FORM: 'form',
  RESULT: 'result',
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HERO)
  const [answers, setAnswers] = useState({})
  const [lead, setLead] = useState(null)

  return (
    <div className="min-h-[100dvh] w-full max-w-md mx-auto relative">
      {screen === SCREENS.HERO && <HeroScreen onStart={() => setScreen(SCREENS.QUIZ)} />}

      {screen === SCREENS.QUIZ && (
        <QuizScreen
          onComplete={(finalAnswers) => {
            setAnswers(finalAnswers)
            setScreen(SCREENS.LOADING)
          }}
        />
      )}

      {screen === SCREENS.LOADING && <LoadingScreen onDone={() => setScreen(SCREENS.FORM)} />}

      {screen === SCREENS.FORM && (
        <LeadFormScreen
          answers={answers}
          onSubmitted={(leadData) => {
            setLead(leadData)
            setScreen(SCREENS.RESULT)
          }}
        />
      )}

      {screen === SCREENS.RESULT && <ResultScreen answers={answers} lead={lead} />}
    </div>
  )
}
