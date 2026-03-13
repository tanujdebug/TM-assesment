import { useState } from 'react'
import Navigation from './components/Navigation'
import Landing from './components/Landing'
import Test from './components/Test'
import Results from './components/Results'
import ReviewDetail from './components/ReviewDetail'
import { useTimer } from './hooks/useTimer'

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing')
  const [testData, setTestData] = useState({
    currentQuestion: 0,
    answers: {},
    currentSection: 'reading',
    flagged: new Set()
  })

  const timer = useTimer(1920) // 32 minutes for reading section

  const showScreen = (screen) => {
    setCurrentScreen(screen)

    // Start timer when entering test screen
    if (screen === 'test' && !timer.isRunning) {
      timer.startTimer()
    }

    // Pause timer when leaving test screen
    if (screen !== 'test' && timer.isRunning) {
      timer.pauseTimer()
    }
  }

  const updateTestData = (updates) => {
    setTestData(prev => ({ ...prev, ...updates }))
  }

  const startNewTest = () => {
    setTestData({
      currentQuestion: 0,
      answers: {},
      currentSection: 'reading',
      flagged: new Set()
    })
    timer.resetTimer(1920) // Reset to 32 minutes
    setCurrentScreen('test')
  }

  return (
    <div className="app">
      <Navigation
        currentScreen={currentScreen}
        testData={testData}
        timer={timer}
        showScreen={showScreen}
      />

      {currentScreen === 'landing' && (
        <Landing showScreen={showScreen} startNewTest={startNewTest} />
      )}

      {currentScreen === 'test' && (
        <Test
          testData={testData}
          updateTestData={updateTestData}
          timer={timer}
          showScreen={showScreen}
        />
      )}

      {currentScreen === 'results' && (
        <Results
          testData={testData}
          showScreen={showScreen}
          startNewTest={startNewTest}
        />
      )}

      {currentScreen === 'review' && (
        <ReviewDetail
          testData={testData}
          showScreen={showScreen}
        />
      )}
    </div>
  )
}

export default App
