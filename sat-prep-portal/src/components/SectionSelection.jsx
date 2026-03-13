const SectionSelection = ({ onSectionSelect }) => {
  return (
    <div className="section-selection">
      <div className="container-wide">
        <div className="selection-hero">
          <div className="selection-content">
            <h1 className="fade-in">Choose Your Starting Section</h1>
            <p className="fade-in stagger-1">
              Select which section you'd like to begin with. Each section contains two modules with adaptive difficulty.
            </p>

            <div className="section-options fade-in stagger-2">
              <div
                className="section-option reading-option"
                onClick={() => onSectionSelect('reading')}
              >
                <div className="section-icon">📖</div>
                <h3>Reading & Writing</h3>
                <div className="section-details">
                  <div className="module-info">
                    <span className="module">Module 1</span>
                    <span className="questions">5 Questions</span>
                    <span className="time">16:00 mins</span>
                  </div>
                  <div className="module-info">
                    <span className="module">Module 2</span>
                    <span className="questions">5 Questions</span>
                    <span className="time">16:00 mins</span>
                  </div>
                </div>
                <p className="section-desc">
                  Passage-based questions testing comprehension, vocabulary, and evidence-based reasoning.
                </p>
                <button className="btn btn-primary">Start Reading & Writing →</button>
              </div>

              <div
                className="section-option math-option"
                onClick={() => onSectionSelect('math')}
              >
                <div className="section-icon">📐</div>
                <h3>Math</h3>
                <div className="section-details">
                  <div className="module-info">
                    <span className="module">Module 1</span>
                    <span className="questions">5 Questions</span>
                    <span className="time">17:30 mins</span>
                  </div>
                  <div className="module-info">
                    <span className="module">Module 2</span>
                    <span className="questions">5 Questions</span>
                    <span className="time">17:30 mins</span>
                  </div>
                </div>
                <p className="section-desc">
                  Algebra, advanced math, problem-solving, and data analysis with calculator allowed.
                </p>
                <button className="btn btn-primary">Start Math →</button>
              </div>
            </div>

            <div className="selection-note fade-in stagger-3">
              <p>💡 After completing your chosen section, you'll automatically proceed to the other section.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionSelection