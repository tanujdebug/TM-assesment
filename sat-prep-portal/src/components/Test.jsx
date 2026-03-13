import { useState, useEffect } from 'react'
import { mockQuestions } from '../data/questions.js'

const Test = ({ testData, updateTestData, showScreen }) => {
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState('')

  useEffect(() => {
    // Set up questions based on current section
    if (testData.currentSection === 'reading') {
      setCurrentQuestions(mockQuestions.reading)
    } else {
      setCurrentQuestions(mockQuestions.math)
    }
  }, [testData.currentSection])

  useEffect(() => {
    // Load previously selected answer for current question
    const currentQuestionId = currentQuestions[testData.currentQuestion]?.id
    if (currentQuestionId && testData.answers[currentQuestionId]) {
      setSelectedAnswer(testData.answers[currentQuestionId])
    } else {
      setSelectedAnswer('')
    }
  }, [testData.currentQuestion, currentQuestions, testData.answers])

  const currentQuestionData = currentQuestions[testData.currentQuestion] || mockQuestions.reading[0]
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
      // End of section/test
      showScreen('results')
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

  return (
    <div className="test-screen">
      <div className="container">
        <div className="test-layout">
          <div className="question-area">
            <div className={`section-label ${testData.currentSection === 'reading' ? 'rw-label' : ''}`}>
              {testData.currentSection === 'reading' ? 'Reading & Writing' : 'Math'} — Module 1
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
                  {testData.currentQuestion === totalQuestions - 1 ? 'Submit Section' : 'Next'} →
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

            <div className="sidebar-card" style={{ textAlign: 'center' }}>
              <h4>Section</h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {testData.currentSection === 'reading' ? 'Reading & Writing' : 'Math'}
              </div>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '4px',
                  borderRadius: '100px',
                  background: testData.currentSection === 'reading' ? 'var(--accent)' : 'var(--border)'
                }}></div>
                <div style={{
                  width: '32px',
                  height: '4px',
                  borderRadius: '100px',
                  background: testData.currentSection === 'math' ? 'var(--accent)' : 'var(--border)'
                }}></div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                Section {testData.currentSection === 'reading' ? '1' : '2'} of 2
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => showScreen('results')}
            >
              Submit Section →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test