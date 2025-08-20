import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { WavesCourse } from './components/WavesCourse'

type User = { email: string; name: string }

function App() {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage on app initialization
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const handleLogin = (userData: User) => {
    setUser(userData)
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    // Remove user from localStorage
    localStorage.removeItem('user')
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/waves-course" 
            element={user ? <WavesCourse /> : <Navigate to="/" />} 
          />
          {/* Catch all other routes and redirect to dashboard if logged in */}
          <Route 
            path="*" 
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
