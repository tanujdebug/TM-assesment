const Navigation = ({ currentScreen, testData, timer, showScreen }) => {
  const getTimerClass = () => {
    if (timer.timerState === 'danger') return 'timer-pill danger'
    if (timer.timerState === 'warning') return 'timer-pill warning'
    return 'timer-pill'
  }

  const renderNavCenter = () => {
    if (currentScreen === 'test') {
      const sectionName = testData.currentSection === 'reading' ? 'Reading & Writing' : 'Math'
      return (
        <div className="nav-center">
          <div className={getTimerClass()}>
            <div className="dot"></div>
            <span>{timer.formatTime}</span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {sectionName}
          </span>
        </div>
      )
    }
    return null
  }

  const renderNavRight = () => {
    if (currentScreen === 'test') {
      return (
        <div className="nav-user">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            User
          </span>
        </div>
      )
    } else if (currentScreen === 'results' || currentScreen === 'review') {
      return (
        <div className="nav-meta">
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Practice Test Results
          </span>
        </div>
      )
    } else {
      return (
        <div className="nav-meta">
          <button
            className="nav-cta"
            onClick={() => showScreen('test')}
          >
            Take a free diagnostic →
          </button>
        </div>
      )
    }
  }

  return (
    <nav id="main-nav">
      <div className="container">
        <div className="logo">
          SAT <span>Prep</span>
        </div>
        <div className={`nav-links ${currentScreen === 'test' ? 'hidden' : ''}`}>
          <a
            href="#"
            className={currentScreen === 'landing' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); showScreen('landing') }}
          >
            HOME
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>PRACTICE</a>
          <a
            href="#"
            className={currentScreen === 'results' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); showScreen('results') }}
          >
            RESULTS
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>RESOURCES</a>
        </div>
        {renderNavCenter()}
        {renderNavRight()}
      </div>
    </nav>
  )
}

export default Navigation