import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export function WavesCourse() {
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content')
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const navigate = useNavigate()

  // Wave simulation state
  const [amplitude, setAmplitude] = useState(50)
  const [frequency, setFrequency] = useState(1)
  const [phase, setPhase] = useState(0)
  const [waveSpeed, setWaveSpeed] = useState(120)
  const [paused, setPaused] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const wavelength = frequency === 0 ? Infinity : waveSpeed / frequency

  return (
    <div className="waves-course">
      <header className="course-header">
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
      </header>

      <main className="course-main">
        {activeTab === 'content' && (
          <div className="content-section">
            <h2>Content Section - Coming Soon</h2>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="quiz-section">
            <h2>Quiz Section - Coming Soon</h2>
          </div>
        )}
      </main>
    </div>
  )
}
