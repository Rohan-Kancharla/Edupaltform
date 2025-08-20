import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { WaveLab } from './WaveLab' // Import the new WaveLab component

type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the relationship between wavelength (λ), frequency (f), and wave speed (v)?",
    options: ["λ = v × f", "λ = v ÷ f", "λ = f ÷ v", "λ = v + f"],
    correctAnswer: 1,
    explanation: "The correct relationship is λ = v ÷ f. This means wavelength equals wave speed divided by frequency. Higher frequency waves have shorter wavelengths when speed is constant."
  },
  {
    id: 2,
    question: "Which wave property determines the amount of energy carried by the wave?",
    options: ["Frequency", "Wavelength", "Amplitude", "Phase"],
    correctAnswer: 2,
    explanation: "Amplitude determines the energy carried by a wave. The energy is proportional to the square of the amplitude (E ∝ A²). Higher amplitude means more energy."
  },
  {
    id: 3,
    question: "What happens to the wavelength when frequency increases while wave speed remains constant?",
    options: ["Wavelength increases", "Wavelength decreases", "Wavelength stays the same", "Wavelength becomes zero"],
    correctAnswer: 1,
    explanation: "When frequency increases and wave speed is constant, wavelength decreases. This is because λ = v/f, so if f increases, λ must decrease."
  },
  {
    id: 4,
    question: "Which type of wave moves perpendicular to the direction of energy transfer?",
    options: ["Longitudinal wave", "Transverse wave", "Surface wave", "Compression wave"],
    correctAnswer: 1,
    explanation: "A transverse wave moves perpendicular to the direction of energy transfer. Examples include light waves, water waves, and electromagnetic waves."
  },
  {
    id: 5,
    question: "What is the unit of frequency?",
    options: ["Meters (m)", "Seconds (s)", "Hertz (Hz)", "Meters per second (m/s)"],
    correctAnswer: 2,
    explanation: "Frequency is measured in Hertz (Hz), which represents the number of complete cycles per second. 1 Hz = 1 cycle/second."
  },
  {
    id: 6,
    question: "What does the phase of a wave represent?",
    options: ["The wave's speed", "The wave's position in its cycle", "The wave's amplitude", "The wave's frequency"],
    correctAnswer: 1,
    explanation: "Phase represents the wave's position in its cycle. It determines where the wave starts and can be used to compare two waves or shift a wave horizontally."
  },
  {
    id: 7,
    question: "If a wave has a frequency of 2 Hz and a wavelength of 3 meters, what is its speed?",
    options: ["1.5 m/s", "3 m/s", "6 m/s", "9 m/s"],
    correctAnswer: 2,
    explanation: "Using the formula v = f × λ: v = 2 Hz × 3 m = 6 m/s. The wave travels 6 meters per second."
  },
  {
    id: 8,
    question: "Which wave property affects the pitch of sound?",
    options: ["Amplitude", "Frequency", "Wavelength", "Phase"],
    correctAnswer: 1,
    explanation: "Frequency affects the pitch of sound. Higher frequency produces higher pitch, while lower frequency produces lower pitch. Amplitude affects volume, not pitch."
  },
  {
    id: 9,
    question: "What happens when two waves with the same frequency and amplitude meet in phase?",
    options: ["They cancel each other out", "They create a wave with double amplitude", "They create a wave with half amplitude", "They create a standing wave"],
    correctAnswer: 1,
    explanation: "When two waves meet in phase (crest meets crest), they constructively interfere, creating a wave with double amplitude. This is called constructive interference."
  },
  {
    id: 10,
    question: "Which of the following is NOT a characteristic of all waves?",
    options: ["They transfer energy", "They have amplitude", "They require a medium", "They have frequency"],
    correctAnswer: 2,
    explanation: "Not all waves require a medium. Electromagnetic waves (like light) can travel through vacuum, while mechanical waves (like sound) require a medium to travel."
  }
]

type ContentSection = 'overview' | 'transverse' | 'longitudinal'

export function WavesCourse() {
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>(() => {
    // Get active tab from localStorage, default to content
    const savedTab = localStorage.getItem('waves-course-tab')
    return (savedTab === 'quiz' || savedTab === 'content') ? savedTab : 'content'
  })
  const [contentSection, setContentSection] = useState<ContentSection>('overview')
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const navigate = useNavigate()

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waves-course-tab', activeTab)
  }, [activeTab])

  // Reset quiz state when switching to quiz tab
  useEffect(() => {
    if (activeTab === 'quiz') {
      // Reset quiz state when entering quiz tab
      setQuizAnswers({})
      setQuizSubmitted(false)
      setQuizScore(0)
    }
  }, [activeTab])

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmitQuiz = () => {
    let correct = 0
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct += 1
      }
    })
    setQuizScore(correct)
    setQuizSubmitted(true)
  }

  const handleRetakeQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
  }

  const renderContentSection = () => {
    switch (contentSection) {
      case 'overview':
        return (
          <div className="content-section">
            <h2>🌊 Waves: Complete Learning Module</h2>
            
            {/* Theory Section */}
            <div className="content-panel">
              <h3>🌊 Wave Fundamentals</h3>
              <div className="theory-content">
                <p>A wave is a disturbance that travels through a medium, transferring energy without permanently displacing the medium itself. Waves are fundamental to understanding many natural phenomena.</p>
                
                <h4>Key Concepts:</h4>
                <ul>
                  <li><strong>Amplitude (A):</strong> Maximum displacement from equilibrium position</li>
                  <li><strong>Frequency (f):</strong> Number of complete cycles per second (measured in Hertz)</li>
                  <li><strong>Wavelength (λ):</strong> Distance between consecutive identical points on the wave</li>
                  <li><strong>Period (T):</strong> Time for one complete cycle (T = 1/f)</li>
                  <li><strong>Wave Speed (v):</strong> How fast the wave travels (v = f × λ)</li>
                  <li><strong>Phase (φ):</strong> Position of the wave in its cycle</li>
                </ul>
              </div>
            </div>

            {/* Interactive Lab Section */}
            <div className="content-panel">
              <h3>🧪 Interactive Wave Laboratory</h3>
              <p>Explore wave phenomena through hands-on simulations. Adjust parameters to see how they affect wave behavior.</p>
              <WaveLab />
            </div>

            {/* Wave Properties Section */}
            <div className="content-panel">
              <h3>⚡ Wave Properties & Behavior</h3>
              <div className="properties-grid">
                <div className="property-item">
                  <h4>🔄 Interference</h4>
                  <p>When two or more waves meet, they combine according to the principle of superposition.</p>
                  <ul>
                    <li><strong>Constructive:</strong> Waves in phase create larger amplitude</li>
                    <li><strong>Destructive:</strong> Waves out of phase can cancel each other</li>
                  </ul>
                </div>
                
                <div className="property-item">
                  <h4>🔄 Reflection</h4>
                  <p>Waves bounce back when they encounter a boundary or obstacle.</p>
                  <ul>
                    <li>Echo in sound</li>
                    <li>Mirror reflection of light</li>
                    <li>Wave bouncing off a wall</li>
                  </ul>
                </div>
                
                <div className="property-item">
                  <h4>🔄 Refraction</h4>
                  <p>Waves change direction when they pass from one medium to another.</p>
                  <ul>
                    <li>Light bending through a prism</li>
                    <li>Sound changing direction in air</li>
                    <li>Water waves changing speed</li>
                  </ul>
                </div>
                
                <div className="property-item">
                  <h4>🔄 Diffraction</h4>
                  <p>Waves bend around obstacles and spread out through openings.</p>
                  <ul>
                    <li>Light spreading through a slit</li>
                    <li>Sound going around corners</li>
                    <li>Water waves around barriers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mathematical Section */}
            <div className="content-panel">
              <h3>📐 Mathematical Foundation</h3>
              <div className="math-content">
                <h4>Wave Equation:</h4>
                <div className="equation">
                  <p><strong>y(x,t) = A sin(2π(x/λ - ft) + φ)</strong></p>
                  <p>Where:</p>
                  <ul>
                    <li>y(x,t) = displacement at position x and time t</li>
                    <li>A = amplitude</li>
                    <li>λ = wavelength</li>
                    <li>f = frequency</li>
                    <li>φ = phase constant</li>
                  </ul>
                </div>
                
                <h4>Key Relationships:</h4>
                <div className="relationships">
                  <p><strong>Wave Speed:</strong> v = f × λ</p>
                  <p><strong>Period:</strong> T = 1/f</p>
                  <p><strong>Angular Frequency:</strong> ω = 2πf</p>
                  <p><strong>Wave Number:</strong> k = 2π/λ</p>
                </div>
              </div>
            </div>

            {/* Applications Section */}
            <div className="content-panel">
              <h3>🌍 Real-World Applications</h3>
              <div className="applications-grid">
                <div className="app-card">
                  <h4>🎵 Sound & Music</h4>
                  <p>Understanding frequency, amplitude, and harmonics in musical instruments and audio technology.</p>
                </div>
                
                <div className="app-card">
                  <h4>📡 Communication</h4>
                  <p>Radio waves, microwaves, and optical fibers for transmitting information over long distances.</p>
                </div>
                
                <div className="app-card">
                  <h4>🏥 Medical Imaging</h4>
                  <p>Ultrasound, MRI, and X-rays using different types of waves for diagnostic purposes.</p>
                </div>
                
                <div className="app-card">
                  <h4>🌊 Oceanography</h4>
                  <p>Studying ocean waves, tides, and tsunami prediction using wave mechanics.</p>
                </div>
                
                <div className="app-card">
                  <h4>🏗️ Engineering</h4>
                  <p>Designing structures to withstand seismic waves and vibrations.</p>
                </div>
                
                <div className="app-card">
                  <h4>🔬 Quantum Physics</h4>
                  <p>Wave-particle duality and quantum wave functions in modern physics.</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'transverse':
        return (
          <div className="content-section">
            <h2>🌊 Transverse Waves</h2>
            
            <div className="content-panel">
              <h3>📏 What are Transverse Waves?</h3>
              <p>Transverse waves are waves where the particles of the medium oscillate perpendicular to the direction of wave propagation. The wave moves forward while the particles move up and down or side to side.</p>
              
              <h4>Key Characteristics:</h4>
              <ul>
                <li><strong>Particle Motion:</strong> Perpendicular to wave direction</li>
                <li><strong>Wave Shape:</strong> Crests and troughs</li>
                <li><strong>Examples:</strong> Light waves, water waves, string vibrations</li>
                <li><strong>Polarization:</strong> Can be polarized (light waves)</li>
              </ul>
            </div>

            <div className="content-panel">
              <h3>🧪 Transverse Wave Simulation</h3>
              <p>Explore transverse wave behavior with this interactive simulation. Adjust amplitude, frequency, and phase to see how they affect the wave pattern.</p>
              <WaveLab />
            </div>

            <div className="content-panel">
              <h3>🔑 Key Ideas</h3>
              <div className="key-ideas">
                <div className="idea-item">
                  <h4>🌊 Wave Propagation</h4>
                  <p>Energy travels through the medium while individual particles oscillate in place. The wave moves forward, but the medium doesn't.</p>
                </div>
                
                <div className="idea-item">
                  <h4>⚡ Energy Transfer</h4>
                  <p>Energy is transferred from one particle to the next through the restoring forces in the medium.</p>
                </div>
                
                <div className="idea-item">
                  <h4>🔄 Oscillation</h4>
                  <p>Particles move in simple harmonic motion, creating the characteristic wave pattern.</p>
                </div>
              </div>
            </div>

            <div className="content-panel">
              <h3>📐 Mathematical Foundation</h3>
              <div className="math-content">
                <h4>Transverse Wave Equation:</h4>
                <div className="equation">
                  <p><strong>y(x,t) = A sin(kx - ωt + φ)</strong></p>
                  <p>Where:</p>
                  <ul>
                    <li>y(x,t) = vertical displacement</li>
                    <li>A = amplitude</li>
                    <li>k = wave number (2π/λ)</li>
                    <li>ω = angular frequency (2πf)</li>
                    <li>φ = phase constant</li>
                  </ul>
                </div>
                
                <h4>Wave Speed:</h4>
                <p><strong>v = √(T/μ)</strong> for string waves</p>
                <p>Where T is tension and μ is mass per unit length</p>
              </div>
            </div>

            <div className="content-panel">
              <h3>🎯 Controls & Parameters</h3>
              <div className="controls-info">
                <h4>Adjustable Parameters:</h4>
                <ul>
                  <li><strong>Amplitude:</strong> Controls wave height and energy</li>
                  <li><strong>Frequency:</strong> Determines wave speed and wavelength</li>
                  <li><strong>Phase:</strong> Shifts wave position horizontally</li>
                  <li><strong>Wave Speed:</strong> Affects how fast the wave travels</li>
                </ul>
                
                <h4>Visual Features:</h4>
                <ul>
                  <li><strong>Grid:</strong> Reference lines for measurements</li>
                  <li><strong>Markers:</strong> Highlight wave characteristics</li>
                  <li><strong>Pause/Resume:</strong> Control animation speed</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'longitudinal':
        return (
          <div className="content-section">
            <h2>📏 Longitudinal Waves</h2>
            
            <div className="content-panel">
              <h3>📏 What are Longitudinal Waves?</h3>
              <p>Longitudinal waves are waves where the particles of the medium oscillate parallel to the direction of wave propagation. The wave creates compressions and rarefactions in the medium.</p>
              
              <h4>Key Characteristics:</h4>
              <ul>
                <li><strong>Particle Motion:</strong> Parallel to wave direction</li>
                <li><strong>Wave Pattern:</strong> Compressions and rarefactions</li>
                <li><strong>Examples:</strong> Sound waves, seismic P-waves, spring compressions</li>
                <li><strong>Medium Required:</strong> Cannot travel through vacuum</li>
              </ul>
            </div>

            <div className="content-panel">
              <h3>🧪 Longitudinal Wave Simulation</h3>
              <p>Explore longitudinal wave behavior with this interactive simulation. Observe how compressions and rarefactions travel through the medium.</p>
              <WaveLab />
            </div>

            <div className="content-panel">
              <h3>🔑 Key Ideas</h3>
              <div className="key-ideas">
                <div className="idea-item">
                  <h4>🗜️ Compression & Rarefaction</h4>
                  <p>Regions of high pressure (compression) and low pressure (rarefaction) travel through the medium.</p>
                </div>
                
                <div className="idea-item">
                  <h4>🌬️ Pressure Variations</h4>
                  <p>The wave creates alternating regions of high and low pressure that propagate through the medium.</p>
                </div>
                
                <div className="idea-item">
                  <h4>🔊 Sound Production</h4>
                  <p>Sound waves are longitudinal waves that create pressure variations in air, water, or other media.</p>
                </div>
              </div>
            </div>

            <div className="content-panel">
              <h3>📐 Mathematical Foundation</h3>
              <div className="math-content">
                <h4>Longitudinal Wave Equation:</h4>
                <div className="equation">
                  <p><strong>P(x,t) = P₀ + ΔP sin(kx - ωt + φ)</strong></p>
                  <p>Where:</p>
                  <ul>
                    <li>P(x,t) = pressure at position x and time t</li>
                    <li>P₀ = equilibrium pressure</li>
                    <li>ΔP = pressure amplitude</li>
                    <li>k = wave number (2π/λ)</li>
                    <li>ω = angular frequency (2πf)</li>
                    <li>φ = phase constant</li>
                  </ul>
                </div>
                
                <h4>Wave Speed in Air:</h4>
                <p><strong>v = √(γP/ρ)</strong></p>
                <p>Where γ is the adiabatic index, P is pressure, and ρ is density</p>
              </div>
            </div>

            <div className="content-panel">
              <h3>🎯 Controls & Parameters</h3>
              <div className="controls-info">
                <h4>Adjustable Parameters:</h4>
                <ul>
                  <li><strong>Amplitude:</strong> Controls pressure variations</li>
                  <li><strong>Frequency:</strong> Determines pitch (for sound)</li>
                  <li><strong>Phase:</strong> Shifts wave timing</li>
                  <li><strong>Wave Speed:</strong> Affects propagation velocity</li>
                </ul>
                
                <h4>Visual Features:</h4>
                <ul>
                  <li><strong>Grid:</strong> Reference lines for measurements</li>
                  <li><strong>Markers:</strong> Highlight wave characteristics</li>
                  <li><strong>Pause/Resume:</strong> Control animation speed</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="waves-course">
      <header className="course-header">
        <div className="header-content">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1>Waves Course</h1>
          <div className="course-tabs">
            <button 
              className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              Content
            </button>
            <button 
              className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              Quiz (10 Questions)
            </button>
          </div>
        </div>
      </header>

      <main className="course-main">
        {activeTab === 'content' && (
          <div className="content-layout">
            {/* Side Navigation */}
            <aside className="content-sidebar">
              <h3>📚 Course Topics</h3>
              <nav className="topic-nav">
                <button 
                  className={`topic-btn ${contentSection === 'overview' ? 'active' : ''}`}
                  onClick={() => setContentSection('overview')}
                >
                  🌊 Wave Overview
                </button>
                <button 
                  className={`topic-btn ${contentSection === 'transverse' ? 'active' : ''}`}
                  onClick={() => setContentSection('transverse')}
                >
                  📏 Transverse Waves
                </button>
                <button 
                  className={`topic-btn ${contentSection === 'longitudinal' ? 'active' : ''}`}
                  onClick={() => setContentSection('longitudinal')}
                >
                  📏 Longitudinal Waves
                </button>
              </nav>
            </aside>

            {/* Main Content Area */}
            <div className="content-main">
              {renderContentSection()}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="quiz-section">
            <h2>Waves Quiz</h2>
            <p>Test your understanding of wave concepts. Answer all 10 questions to see your results and explanations.</p>
            
            {!quizSubmitted ? (
              <div className="quiz-questions">
                {quizQuestions.map((q) => (
                  <div key={q.id} className="question-card">
                    <h3>Question {q.id}</h3>
                    <p className="question-text">{q.question}</p>
                    <div className="options">
                      {q.options.map((option, index) => (
                        <label key={index} className="option">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            checked={quizAnswers[q.id] === index}
                            onChange={() => handleOptionClick(q.id, index)}
                          />
                          <span className="option-text">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="quiz-actions">
                  <button 
                    className="submit-btn"
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  >
                    Submit Quiz
                  </button>
                  <p className="quiz-note">
                    {Object.keys(quizAnswers).length}/{quizQuestions.length} questions answered
                  </p>
                </div>
              </div>
            ) : (
              <div className="quiz-results">
                <div className="score-display">
                  <h3>Quiz Results</h3>
                  <div className="score-circle">
                    <span className="score-number">{quizScore}</span>
                    <span className="score-total">/{quizQuestions.length}</span>
                  </div>
                  <p className="score-text">
                    {quizScore >= quizQuestions.length * 0.8 ? 'Excellent! You have a strong understanding of waves.' :
                     quizScore >= quizQuestions.length * 0.6 ? 'Good job! You understand most wave concepts.' :
                     quizScore >= quizQuestions.length * 0.4 ? 'Not bad! Review the explanations to improve.' :
                     'Keep studying! Review the concepts and try again.'}
                  </p>
                </div>

                <div className="question-review">
                  <h4>Question Review</h4>
                  {quizQuestions.map((q) => (
                    <div key={q.id} className="review-item">
                      <div className="review-header">
                        <span className="question-number">Q{q.id}</span>
                        <span className={`answer-status ${quizAnswers[q.id] === q.correctAnswer ? 'correct' : 'incorrect'}`}>
                          {quizAnswers[q.id] === q.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                        </span>
                      </div>
                      <p className="review-question">{q.question}</p>
                      <div className="review-answers">
                        <p><strong>Your answer:</strong> {q.options[quizAnswers[q.id] || 0]}</p>
                        <p><strong>Correct answer:</strong> {q.options[q.correctAnswer]}</p>
                      </div>
                      <div className="explanation">
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="quiz-actions">
                  <button className="retry-btn" onClick={handleRetakeQuiz}>
                    Retake Quiz
                  </button>
                  <button className="back-to-content" onClick={() => setActiveTab('content')}>
                    Back to Content
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
