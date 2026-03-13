const Landing = ({ showScreen, startNewTest }) => {
  return (
    <div className="landing">
      <div className="hero">
        <div className="hero-layout">
          <div className="hero-left">
            <div className="hero-eyebrow fade-in">Practice Smarter. Score Higher.</div>
            <h1 className="fade-in stagger-1">Adaptive Mock SAT<br />Practice Tests</h1>
            <p className="fade-in stagger-2">
              Realistic, timed practice with detailed performance breakdowns. Know exactly where you stand and what to focus on next.
            </p>
            <div className="hero-actions fade-in stagger-3">
              <button className="btn btn-primary btn-lg" onClick={startNewTest}>
                Begin Practice Test →
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => showScreen('results')}>
                See how it works
              </button>
            </div>
            <div className="hero-tags fade-in stagger-4">
              <span className="tag">Pre-built curriculum</span>
              <span className="tag">Progress dashboards</span>
              <span className="tag">Exportable reports</span>
              <span className="tag">Adaptive study plans</span>
            </div>
          </div>

          <div className="hero-preview fade-in stagger-3">
            <div className="preview-card">
              <h4>Your Score Preview</h4>
              <div className="big-num">1280 <span>/ 1600</span></div>
              <div className="preview-mini-stats">
                <div className="preview-mini-stat">
                  <strong>640</strong>
                  Reading & Writing
                </div>
                <div className="preview-mini-stat">
                  <strong>640</strong>
                  Math
                </div>
              </div>
            </div>

            <div className="preview-card highlight">
              <h4>Focus Areas</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Problem Solving & Data</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--danger)' }}>55%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--bg-elevated)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ width: '55%', height: '100%', background: 'var(--danger)', borderRadius: '100px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Standard English Conv.</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--warning)' }}>67%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--bg-elevated)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ width: '67%', height: '100%', background: 'var(--warning)', borderRadius: '100px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-bar">
        <div className="marquee-content">
          <span>Personalized Study plan</span><span className="star">★</span>
          <span>Constant Adaption</span><span className="star">★</span>
          <span>Unlimited Practice</span><span className="star">★</span>
          <span>Mock Exams</span><span className="star">★</span>
          <span>Progress tracking</span><span className="star">★</span>
          <span>Parent Reports</span><span className="star">★</span>
          <span>Tutor Reports</span><span className="star">★</span>
          <span>Tutor Management</span><span className="star">★</span>
          <span>Personalized Study plan</span><span className="star">★</span>
          <span>Constant Adaption</span><span className="star">★</span>
          <span>Unlimited Practice</span><span className="star">★</span>
          <span>Mock Exams</span><span className="star">★</span>
          <span>Progress tracking</span><span className="star">★</span>
          <span>Parent Reports</span><span className="star">★</span>
          <span>Tutor Reports</span><span className="star">★</span>
          <span>Tutor Management</span><span className="star">★</span>
        </div>
      </div>

      <div className="test-overview">
        <div className="container">
          <h2 className="fade-in">What's Inside</h2>
          <p className="subtitle fade-in">Two sections, just like the real digital SAT</p>
          <div className="overview-grid">
            <div className="overview-card rw fade-in stagger-1">
              <div className="card-icon">📖</div>
              <h3>Reading & Writing</h3>
              <p className="desc">
                Passage-based questions testing comprehension, vocabulary in context, and evidence-based reasoning.
              </p>
              <div className="card-stats">
                <div className="card-stat"><strong>27</strong>Questions</div>
                <div className="card-stat"><strong>32:00</strong>Time Limit</div>
                <div className="card-stat"><strong>Module 1</strong>Adaptive</div>
              </div>
            </div>

            <div className="overview-card math fade-in stagger-2">
              <div className="card-icon">📐</div>
              <h3>Math</h3>
              <p className="desc">
                Algebra, advanced math, problem-solving, and data analysis. Calculator allowed throughout.
              </p>
              <div className="card-stats">
                <div className="card-stat"><strong>22</strong>Questions</div>
                <div className="card-stat"><strong>35:00</strong>Time Limit</div>
                <div className="card-stat"><strong>Module 1</strong>Adaptive</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing