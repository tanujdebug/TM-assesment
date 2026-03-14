import { useState, useEffect } from 'react'
import { mockQuestions } from '../data/questions.js'

const Test = ({ testData, updateTestData, timer, showScreen }) => {
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showCalculator, setShowCalculator] = useState(false)

  useEffect(() => {
    // Set up questions based on current section and module
    if (testData.currentSection === 'reading') {
      setCurrentQuestions(mockQuestions.reading[testData.currentModule] || [])
    } else {
      setCurrentQuestions(mockQuestions.math[testData.currentModule] || [])
    }
  }, [testData.currentSection, testData.currentModule])

  useEffect(() => {
    // Load previously selected answer for current question
    const currentQuestionId = currentQuestions[testData.currentQuestion]?.id
    if (currentQuestionId && testData.answers[currentQuestionId]) {
      setSelectedAnswer(testData.answers[currentQuestionId])
    } else {
      setSelectedAnswer('')
    }
  }, [testData.currentQuestion, currentQuestions, testData.answers])

  const currentQuestionData = currentQuestions[testData.currentQuestion] || mockQuestions.reading.module1[0]
  const totalQuestions = currentQuestions.length || 3

  const handleChoiceSelect = (choice) => {
    setSelectedAnswer(choice)
    const questionId = currentQuestionData.id
    updateTestData({
      answers: {
        ...testData.answers,
        [questionId]: choice
      }
    })
  }

  const handleNext = () => {
    if (testData.currentQuestion < totalQuestions - 1) {
      updateTestData({
        currentQuestion: testData.currentQuestion + 1
      })
    } else {
      // End of current module - go to next module/section
      handleSubmitModule()
    }
  }

  const handleSubmitModule = () => {
    // Check what modules have been completed
    const readingQuestions = [...mockQuestions.reading.module1, ...mockQuestions.reading.module2]
    const mathQuestions = [...mockQuestions.math.module1, ...mockQuestions.math.module2]

    const hasReadingAnswers = readingQuestions.some(q => testData.answers.hasOwnProperty(q.id))
    const hasMathAnswers = mathQuestions.some(q => testData.answers.hasOwnProperty(q.id))

    // If both sections have answers, go to results
    if (hasReadingAnswers && hasMathAnswers) {
      showScreen('results')
      return
    }

    // Check for next module or next section
    if (testData.currentModule === 'module1') {
      // Move to module 2 of same section
      const nextModuleTime = testData.currentSection === 'reading' ? 960 : 1050
      updateTestData({
        currentModule: 'module2',
        currentQuestion: 0
      })
      // Reset timer for next module
      timer.resetTimer(nextModuleTime)
      timer.startTimer()
    } else {
      // Module 2 completed - switch to other section
      const nextSection = testData.currentSection === 'reading' ? 'math' : 'reading'
      const nextSectionTime = nextSection === 'reading' ? 960 : 1050
      updateTestData({
        currentSection: nextSection,
        currentModule: 'module1',
        currentQuestion: 0
      })
      // Reset timer for next section
      timer.resetTimer(nextSectionTime)
      timer.startTimer()
    }
  }

  const handlePrevious = () => {
    if (testData.currentQuestion > 0) {
      updateTestData({
        currentQuestion: testData.currentQuestion - 1
      })
    }
  }

  const handleQuestionJump = (questionIndex) => {
    updateTestData({
      currentQuestion: questionIndex
    })
  }

  const handleFlag = () => {
    const questionId = currentQuestionData.id
    const newFlagged = new Set(testData.flagged)

    if (newFlagged.has(questionId)) {
      newFlagged.delete(questionId)
    } else {
      newFlagged.add(questionId)
    }

    updateTestData({
      flagged: newFlagged
    })
  }

  const getQuestionStatus = (index) => {
    const question = currentQuestions[index]
    if (!question) return ''

    const hasAnswer = testData.answers[question.id]
    const isFlagged = testData.flagged.has(question.id)
    const isCurrent = index === testData.currentQuestion

    if (isCurrent) return 'current'
    if (hasAnswer) return 'answered'
    if (isFlagged) return 'flagged'
    return ''
  }

  const answeredCount = currentQuestions.filter(q => testData.answers[q.id]).length
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100)

  // Initialize Desmos calculator when component mounts
  useEffect(() => {
    if (testData.currentSection === 'math' && showCalculator && window.Desmos) {
      const calculatorElement = document.getElementById('calculator')
      if (calculatorElement) {
        // Clear any existing calculator
        calculatorElement.innerHTML = ''

        const calculator = window.Desmos.GraphingCalculator(calculatorElement, {
          expressionsCollapsed: false,
          settingsMenu: false,
          zoomButtons: true,
          keypad: true,
          graphpaper: true,
          expressions: true,
          border: false,
          keypadHeight: 200,
          autosize: true
        })
      }
    }
  }, [showCalculator, testData.currentSection])

  return (
    <div className="test-screen">
      <div className="container">
        <div className={`test-layout ${showCalculator ? 'with-calculator' : ''}`}>
          {/* Calculator Panel */}
          {testData.currentSection === 'math' && showCalculator && (
            <div className="calculator-panel-left">
              <div className="calculator-header">
                <h4>Graphing Calculator</h4>
                <button
                  className="calculator-close"
                  onClick={() => setShowCalculator(false)}
                >
                  ✕
                </button>
              </div>
              <div id="calculator" className="desmos-calculator-left"></div>
            </div>
          )}

          <div className="question-area">
            <div className="question-header">
              <div className={`section-label ${testData.currentSection === 'reading' ? 'rw-label' : ''}`}>
                {testData.currentSection === 'reading' ? 'Reading & Writing' : 'Math'} — Module {testData.currentModule === 'module1' ? '1' : '2'}
              </div>
              {testData.currentSection === 'math' && (
                <button
                  className={`calculator-toggle-left ${showCalculator ? 'active' : ''}`}
                  onClick={() => setShowCalculator(!showCalculator)}
                >
                  📊 Calculator
                </button>
              )}
            </div>
            <div className="question-counter">
              Question <span>{testData.currentQuestion + 1}</span> of <span>{totalQuestions}</span>
            </div>

            {/* Passage (for reading questions) */}
            {currentQuestionData.passage && (
              <div className={`passage ${testData.currentSection === 'reading' ? 'rw-passage' : ''}`}>
                <p>{currentQuestionData.passage}</p>
                {currentQuestionData.attribution && (
                  <div className="attribution">{currentQuestionData.attribution}</div>
                )}
              </div>
            )}

            <div className="question-text">{currentQuestionData.question}</div>

            <div className="choices">
              {currentQuestionData.choices.map((choice) => (
                <div
                  key={choice.letter}
                  className={`choice ${selectedAnswer === choice.letter ? 'selected' : ''}`}
                  onClick={() => handleChoiceSelect(choice.letter)}
                >
                  <div className="choice-letter">{choice.letter}</div>
                  <div className="choice-text">{choice.text}</div>
                </div>
              ))}
            </div>

            <div className="question-footer">
              <button
                className={`flag-btn ${testData.flagged.has(currentQuestionData.id) ? 'flagged' : ''}`}
                onClick={handleFlag}
              >
                ⚑ Flag for Review
              </button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                  disabled={testData.currentQuestion === 0}
                >
                  ← Previous
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                  {testData.currentQuestion === totalQuestions - 1
                    ? (testData.currentModule === 'module1' ? 'Submit Module 1' : 'Submit Module 2')
                    : 'Next'} →
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="test-sidebar">
            <div className="sidebar-card">
              <h4>Question Navigator</h4>
              <div className="q-map">
                {Array.from({ length: totalQuestions }, (_, i) => (
                  <div
                    key={i}
                    className={`q-dot ${getQuestionStatus(i)}`}
                    onClick={() => handleQuestionJump(i)}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h4>Progress</h4>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="progress-text">
                <span>{answeredCount} answered</span>
                <span>{totalQuestions - answeredCount} remaining</span>
              </div>
            </div>

            <div className="sidebar-card module-card" style={{ textAlign: 'center' }}>
              <h4>Section</h4>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '8px' }}>
                {testData.currentSection === 'reading' ? 'Reading & Writing' : 'Math'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Module {testData.currentModule === 'module1' ? '1' : '2'} of 2
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{
                    width: '20px',
                    height: '3px',
                    borderRadius: '100px',
                    background: testData.currentModule === 'module1' ? 'var(--text)' : 'var(--border)'
                  }}></div>
                  <div style={{
                    width: '20px',
                    height: '3px',
                    borderRadius: '100px',
                    background: testData.currentModule === 'module2' ? 'var(--text)' : 'var(--border)'
                  }}></div>
                </div>
              </div>
            </div>


            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleSubmitModule}
            >
              Submit Module →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test