import { useState } from 'react'
import Navigation from './components/Navigation'
import Landing from './components/Landing'
import SectionSelection from './components/SectionSelection'
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
    currentModule: 'module1',
    flagged: new Set()
  })

  const timer = useTimer(960) // 16 minutes for reading modules

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
      currentModule: 'module1',
      flagged: new Set()
    })
    timer.resetTimer(960) // Reset to 16 minutes for reading module 1
    setCurrentScreen('sectionSelection')
  }

  const onSectionSelect = (section) => {
    const moduleTime = section === 'reading' ? 960 : 1050 // 16:00 for reading, 17:30 for math
    setTestData({
      currentQuestion: 0,
      answers: {},
      currentSection: section,
      currentModule: 'module1',
      flagged: new Set()
    })
    timer.resetTimer(moduleTime)
    timer.startTimer() // Start the timer immediately
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

      {currentScreen === 'sectionSelection' && (
        <SectionSelection onSectionSelect={onSectionSelect} />
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
