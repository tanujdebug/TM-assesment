import { useState } from 'react'
import { mockQuestions, skillsData } from '../data/questions.js'

const Results = ({ testData, showScreen, startNewTest }) => {
  const [activeFilters, setActiveFilters] = useState(['all'])

  // Calculate results
  const allQuestions = [
    ...mockQuestions.reading.module1,
    ...mockQuestions.reading.module2,
    ...mockQuestions.math.module1,
    ...mockQuestions.math.module2
  ]
  const correctAnswers = allQuestions.filter(q =>
    testData.answers[q.id] === q.correctAnswer
  ).length

  const incorrectAnswers = allQuestions.filter(q =>
    testData.answers[q.id] && testData.answers[q.id] !== q.correctAnswer
  ).length

  const skippedAnswers = allQuestions.filter(q =>
    !testData.answers[q.id]
  ).length

  const totalScore = Math.round((correctAnswers / allQuestions.length) * 1600)
  const rwScore = Math.round((correctAnswers / allQuestions.length) * 800) // Simplified calculation
  const mathScore = totalScore - rwScore

  const toggleFilter = (filter) => {
    if (filter === 'all') {
      setActiveFilters(['all'])
    } else {
      const newFilters = activeFilters.includes(filter)
        ? activeFilters.filter(f => f !== filter && f !== 'all')
        : [...activeFilters.filter(f => f !== 'all'), filter]

      setActiveFilters(newFilters.length === 0 ? ['all'] : newFilters)
    }
  }

  const getQuestionStatus = (question) => {
    const userAnswer = testData.answers[question.id]
    if (!userAnswer) return 'skipped'
    return userAnswer === question.correctAnswer ? 'correct' : 'incorrect'
  }

  const getFilteredQuestions = () => {
    if (activeFilters.includes('all')) return allQuestions

    return allQuestions.filter(question => {
      const status = getQuestionStatus(question)
      const isFlagged = testData.flagged.has(question.id)

      return (
        (activeFilters.includes('correct') && status === 'correct') ||
        (activeFilters.includes('incorrect') && status === 'incorrect') ||
        (activeFilters.includes('skipped') && status === 'skipped') ||
        (activeFilters.includes('flagged') && isFlagged)
      )
    })
  }

  const filteredQuestions = getFilteredQuestions()
  const flaggedCount = allQuestions.filter(q => testData.flagged.has(q.id)).length

  return (
    <div className="results-screen">
      {/* Hero Section */}
      <div className="results-hero">
        <div className="score-display fade-in">
          <svg className="score-ring" viewBox="0 0 170 170">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#C9A96E' }} />
                <stop offset="50%" style={{ stopColor: '#4DAF8B' }} />
                <stop offset="100%" style={{ stopColor: '#F5C842' }} />
              </linearGradient>
            </defs>
            <circle className="bg" cx="85" cy="85" r="75" />
            <circle className="fill" cx="85" cy="85" r="75" />
          </svg>
          <div className="score-value">
            <div className="number">{totalScore}</div>
            <div className="total">out of 1600</div>
          </div>
        </div>
        <h2 className="fade-in stagger-1">
          {totalScore >= 1200 ? 'Strong performance!' : 'Good effort!'}
        </h2>
        <p className="date fade-in stagger-2">Practice Test · {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>

      {/* Score Breakdown */}
      <div className="score-breakdown container-wide">
        <div className="breakdown-card rw fade-in stagger-1">
          <div className="breakdown-header">
            <h3>📖 Reading & Writing</h3>
            <div className="breakdown-score">{rwScore}</div>
          </div>
          <div className="breakdown-bar">
            <div className="breakdown-bar-fill" style={{ width: `${(rwScore/800) * 100}%` }}></div>
          </div>
          <div className="breakdown-stats">
            <div className="b-stat correct">
              <div className="num">{[...mockQuestions.reading.module1, ...mockQuestions.reading.module2].filter(q => testData.answers[q.id] === q.correctAnswer).length}</div>
              <div className="label">Correct</div>
            </div>
            <div className="b-stat incorrect">
              <div className="num">{[...mockQuestions.reading.module1, ...mockQuestions.reading.module2].filter(q => testData.answers[q.id] && testData.answers[q.id] !== q.correctAnswer).length}</div>
              <div className="label">Incorrect</div>
            </div>
            <div className="b-stat skipped">
              <div className="num">{[...mockQuestions.reading.module1, ...mockQuestions.reading.module2].filter(q => !testData.answers[q.id]).length}</div>
              <div className="label">Skipped</div>
            </div>
          </div>
        </div>

        <div className="breakdown-card math fade-in stagger-2">
          <div className="breakdown-header">
            <h3>📐 Math</h3>
            <div className="breakdown-score">{mathScore}</div>
          </div>
          <div className="breakdown-bar">
            <div className="breakdown-bar-fill" style={{ width: `${(mathScore/800) * 100}%` }}></div>
          </div>
          <div className="breakdown-stats">
            <div className="b-stat correct">
              <div className="num">{[...mockQuestions.math.module1, ...mockQuestions.math.module2].filter(q => testData.answers[q.id] === q.correctAnswer).length}</div>
              <div className="label">Correct</div>
            </div>
            <div className="b-stat incorrect">
              <div className="num">{[...mockQuestions.math.module1, ...mockQuestions.math.module2].filter(q => testData.answers[q.id] && testData.answers[q.id] !== q.correctAnswer).length}</div>
              <div className="label">Incorrect</div>
            </div>
            <div className="b-stat skipped">
              <div className="num">{[...mockQuestions.math.module1, ...mockQuestions.math.module2].filter(q => !testData.answers[q.id]).length}</div>
              <div className="label">Skipped</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section container-wide">
        <h3 className="fade-in">Performance by Skill</h3>
        <div className="skill-bars">
          {skillsData.map((skill, index) => (
            <div key={skill.name} className="skill-row">
              <div className="skill-name">{skill.name}</div>
              <div className="skill-bar-bg">
                <div
                  className={`skill-bar-fill ${skill.category}`}
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
              <div
                className="skill-pct"
                style={{
                  color: skill.category === 'strong' ? '#4DAF8B' :
                         skill.category === 'medium' ? 'var(--warning)' : 'var(--danger)'
                }}
              >
                {skill.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Section */}
      <div className="review-section container-wide">
        <h3 className="fade-in">Review Your Answers</h3>
        <p className="subtitle fade-in">Click any question to see the full explanation</p>

        <div className="review-filters fade-in">
          <div
            className={`filter-chip ${activeFilters.includes('all') ? 'active' : ''}`}
            onClick={() => toggleFilter('all')}
          >
            All ({allQuestions.length})
          </div>
          <div
            className={`filter-chip ${activeFilters.includes('correct') ? 'active' : ''}`}
            onClick={() => toggleFilter('correct')}
          >
            ✓ Correct ({correctAnswers})
          </div>
          <div
            className={`filter-chip ${activeFilters.includes('incorrect') ? 'active' : ''}`}
            onClick={() => toggleFilter('incorrect')}
          >
            ✗ Incorrect ({incorrectAnswers})
          </div>
          <div
            className={`filter-chip ${activeFilters.includes('skipped') ? 'active' : ''}`}
            onClick={() => toggleFilter('skipped')}
          >
            — Skipped ({skippedAnswers})
          </div>
          <div
            className={`filter-chip ${activeFilters.includes('flagged') ? 'active' : ''}`}
            onClick={() => toggleFilter('flagged')}
          >
            ⚑ Flagged ({flaggedCount})
          </div>
        </div>

        <div className="review-list">
          {filteredQuestions.map((question, index) => {
            const status = getQuestionStatus(question)
            const questionLabel = `${question.section === 'reading' ? 'R&W' : 'Math'} · Question ${question.id}`

            return (
              <div
                key={question.id}
                className="review-item"
                onClick={() => showScreen('review')}
              >
                <div className={`review-status ${status}`}>
                  {status === 'correct' ? '✓' : status === 'incorrect' ? '✗' : '—'}
                </div>
                <div className="review-info">
                  <div className="q-label">{questionLabel}</div>
                  <div className="q-text">
                    {question.question.length > 80
                      ? question.question.substring(0, 80) + '...'
                      : question.question
                    }
                  </div>
                </div>
                <div className="review-tag">{question.skill}</div>
                <div className="review-arrow">›</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="container-wide" style={{
        paddingBottom: '48px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          className="btn btn-primary btn-lg"
          onClick={startNewTest}
        >
          Retake Test
        </button>
        <button className="btn btn-secondary btn-lg">
          Download Report (PDF)
        </button>
      </div>
    </div>
  )
}

export default Results