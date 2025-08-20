import { useNavigate } from 'react-router-dom'

type User = {
  email: string
  name: string
}

export function Dashboard({ user, onLogout }: { user: User; onLogout: () => void }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const openWavesCourse = () => {
    navigate('/waves-course')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>EduPlatform</h1>
          <div className="user-info">
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome back, {user.name}!</h2>
          <p>Continue your learning journey with our interactive courses.</p>
        </section>

        <section className="classes-section">
          <h3>Your Classes</h3>
          <div className="course-grid">
            <div className="course-card" onClick={openWavesCourse}>
              <div className="course-icon">🌊</div>
              <h4>Waves Course</h4>
              <p>Learn about wave properties, simulations, and real-world applications</p>
              <div className="course-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <span>0% Complete</span>
              </div>
            </div>
            
            <div className="course-card coming-soon">
              <div className="course-icon">🔬</div>
              <h4>Chemistry Basics</h4>
              <p>Coming Soon - Interactive chemistry simulations</p>
              <span className="coming-soon-badge">Coming Soon</span>
            </div>

            <div className="course-card coming-soon">
              <div className="course-icon">📐</div>
              <h4>Mathematics</h4>
              <p>Coming Soon - Visual math concepts</p>
              <span className="coming-soon-badge">Coming Soon</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
