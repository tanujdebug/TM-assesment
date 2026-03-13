import { mockQuestions } from '../data/questions.js'

const ReviewDetail = ({ testData, showScreen }) => {
  // For demo purposes, showing the first reading question
  // In a real app, you'd pass the specific question ID to review
  const currentQuestion = mockQuestions.reading[0]
  const userAnswer = testData.answers[currentQuestion.id]
  const isCorrect = userAnswer === currentQuestion.correctAnswer

  const getChoiceClass = (choiceLetter) => {
    if (choiceLetter === currentQuestion.correctAnswer) {
      return 'choice correct'
    }
    if (choiceLetter === userAnswer && !isCorrect) {
      return 'choice incorrect'
    }
    return 'choice'
  }

  return (
    <div className="container review-detail">
      <button
        className="back-btn"
        onClick={() => showScreen('results')}
      >
        ← Back to Results
      </button>

      <div className="question-area">
        <div className="section-label rw-label">
          {currentQuestion.section === 'reading' ? 'Reading & Writing' : 'Math'} — Question {currentQuestion.id}
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          margin: '8px 0 18px'
        }}>
          <span
            className="review-tag"
            style={{
              background: isCorrect ? 'var(--success-bg)' : 'var(--danger-bg)',
              color: isCorrect ? 'var(--success)' : 'var(--danger)',
              fontWeight: '600'
            }}
          >
            {isCorrect ? 'Correct' : 'Incorrect'}
          </span>
          <span className="review-tag">{currentQuestion.skill}</span>
        </div>

        {currentQuestion.passage && (
          <div className="passage rw-passage">
            <p>{currentQuestion.passage}</p>
            {currentQuestion.attribution && (
              <div className="attribution">{currentQuestion.attribution}</div>
            )}
          </div>
        )}

        <div className="question-text">{currentQuestion.question}</div>

        <div className="choices">
          {currentQuestion.choices.map((choice) => (
            <div
              key={choice.letter}
              className={getChoiceClass(choice.letter)}
            >
              <div className="choice-letter">{choice.letter}</div>
              <div className="choice-text">{choice.text}</div>
            </div>
          ))}
        </div>

        {currentQuestion.explanation && (
          <div className="explanation-box">
            <h4>💡 Explanation</h4>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '18px'
      }}>
        <button className="btn btn-secondary">
          ← Previous Question
        </button>
        <button className="btn btn-primary">
          Next Question →
        </button>
      </div>
    </div>
  )
}

export default ReviewDetail