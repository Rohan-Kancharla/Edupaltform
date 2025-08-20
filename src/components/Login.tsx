import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login({ onLogin }: { onLogin: (user: { email: string; name: string }) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.')
  }

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasMinLength = password.length >= 8
    return hasUpperCase && hasNumber && hasMinLength
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { email?: string; password?: string } = {}

    if (!validateEmail(email)) {
      newErrors.email = 'Email must contain @ and be valid'
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase letter and number'
    }

    if (Object.keys(newErrors).length === 0) {
      // Simulate successful login
      onLogin({ email, name: email.split('@')[0] })
      navigate('/dashboard')
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome to EduPlatform</h2>
        <p className="auth-subtitle">Sign in to access your courses</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        <div className="password-requirements">
          <h4>Password Requirements:</h4>
          <ul>
            <li>At least 8 characters</li>
            <li>One uppercase letter (A-Z)</li>
            <li>One number (0-9)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
