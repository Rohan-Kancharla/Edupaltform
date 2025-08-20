import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login({ onLogin }: { onLogin: (user: { email: string; name: string }) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate()

  const validateEmail = (value: string) => value.includes('@') && value.includes('.')
  const validatePassword = (value: string) => /[A-Z]/.test(value) && /\d/.test(value) && value.length >= 8

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: { email?: string; password?: string } = {}
    if (!validateEmail(email)) nextErrors.email = 'Email must contain @ and be valid'
    if (!validatePassword(password)) nextErrors.password = 'Min 8 chars, 1 uppercase, 1 number'

    if (Object.keys(nextErrors).length === 0) {
      onLogin({ email, name: email.split('@')[0] })
      navigate('/dashboard')
    } else {
      setErrors(nextErrors)
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
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={errors.email ? 'error' : ''} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={errors.password ? 'error' : ''} />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" className="auth-button">Sign In</button>
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
