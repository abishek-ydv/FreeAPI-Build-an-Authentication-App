import { useState, useEffect } from 'react';
import { registerUser, loginUser, logoutUser, getCurrentUser } from './api';
import './index.css';

const Icon = {
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  ),
  Login: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
  ),
  UserPlus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  Lock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  LogOut: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
  ),
  Eye: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  EyeOff: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
  ),
  AlertCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  ),
  Crown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
  ),
};

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    role: 'USER',
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData);
          setView('profile');
        }
      } catch {
        localStorage.removeItem('accessToken');
      } finally {
        setIsCheckingAuth(false);
      }
    })();
  }, []);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (status.message) setStatus({ type: '', message: '' });
  };

  const switchView = (newView) => {
    setView(newView);
    setStatus({ type: '', message: '' });
    setShowPassword(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const userData = await loginUser({
        username: form.username,
        password: form.password,
      });
      setUser(userData);
      setView('profile');
      setStatus({ type: 'success', message: `Welcome back! You're logged in.` });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    try {
      await registerUser({
        email: form.email,
        username: form.username,
        password: form.password,
        role: form.role,
      });
      setStatus({ type: 'success', message: 'Account created! Please sign in.' });
      switchView('login');
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setForm({ email: '', username: '', password: '', role: 'USER' });
      switchView('login');
      setStatus({ type: 'success', message: 'You have been logged out.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <div className="app-container">
          <div className="glass-card">
            <div className="page-loader">
              <div className="loader"></div>
              <span>Checking session…</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <div className="app-container">
        <div className="glass-card">
          {status.message && (
            <div className={`alert alert-${status.type}`}>
              {status.type === 'error' ? <Icon.AlertCircle /> : <Icon.CheckCircle />}
              <span>{status.message}</span>
            </div>
          )}

          {view === 'login' && (
            <div className="auth-form" key="login">
              <div className="header">
                <div className="header-icon"><Icon.Login /></div>
                <h1>Sign in with email</h1>
                <p>Enter your credentials to access your account</p>
              </div>

              <form onSubmit={handleLogin} id="login-form">
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      id="login-username"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                    />
                    <span className="input-icon"><Icon.User /></span>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                    />
                    <span className="input-icon"><Icon.Lock /></span>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(v => !v)}
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <Icon.EyeOff /> : <Icon.Eye />}
                    </button>
                  </div>
                </div>

                <button type="submit" id="login-submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? <div className="loader"></div> : 'Get Started'}
                </button>
              </form>

              <p className="toggle-text">
                Don't have an account?{' '}
                <span className="toggle-link" onClick={() => switchView('register')}>Create one</span>
              </p>
            </div>
          )}

          {view === 'register' && (
            <div className="auth-form" key="register">
              <div className="header">
                <div className="header-icon"><Icon.UserPlus /></div>
                <h1>Create an account</h1>
                <p>Fill in your details to get started</p>
              </div>

              <form onSubmit={handleRegister} id="register-form">
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      id="register-username"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                    />
                    <span className="input-icon"><Icon.User /></span>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      id="register-email"
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                    <span className="input-icon"><Icon.Mail /></span>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password (min 6 chars)"
                      value={form.password}
                      onChange={handleChange}
                      required
                      minLength="6"
                      autoComplete="new-password"
                    />
                    <span className="input-icon"><Icon.Lock /></span>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(v => !v)}
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <Icon.EyeOff /> : <Icon.Eye />}
                    </button>
                  </div>
                </div>

                <span className="role-label">Select your role</span>
                <div className="role-selector">
                  <div
                    className={`role-option ${form.role === 'USER' ? 'active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, role: 'USER' }))}
                    id="role-user"
                  >
                    <Icon.User />
                    <span className="role-option-label">User</span>
                    <span className="role-option-desc">Standard access</span>
                  </div>
                  <div
                    className={`role-option ${form.role === 'ADMIN' ? 'active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, role: 'ADMIN' }))}
                    id="role-admin"
                  >
                    <Icon.Crown />
                    <span className="role-option-label">Admin</span>
                    <span className="role-option-desc">Full access</span>
                  </div>
                </div>

                <button type="submit" id="register-submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? <div className="loader"></div> : 'Create Account'}
                </button>
              </form>

              <p className="toggle-text">
                Already have an account?{' '}
                <span className="toggle-link" onClick={() => switchView('login')}>Sign in</span>
              </p>
            </div>
          )}

          {view === 'profile' && user && (
            <div className="profile-view" key="profile">
              <div className="header">
                <h1>Your Profile</h1>
                <p>Manage your account details</p>
              </div>

              <div className="profile-avatar">
                {user.username?.charAt(0).toUpperCase()}
              </div>

              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">Username</span>
                  <span className="detail-value">@{user.username}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Role</span>
                  <span className="detail-value">
                    <span className="badge badge-role">{user.role}</span>
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Login Type</span>
                  <span className="detail-value">{user.loginType?.replace(/_/g, ' ')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email Status</span>
                  <span className="detail-value">
                    <span className={`badge ${user.isEmailVerified ? 'badge-verified' : 'badge-unverified'}`}>
                      {user.isEmailVerified ? '✓ Verified' : '✗ Unverified'}
                    </span>
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <button onClick={handleLogout} id="logout-btn" className="btn btn-logout" disabled={isLoading}>
                {isLoading ? <div className="loader"></div> : <><Icon.LogOut /> Sign Out</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme" id="theme-toggle">
      {theme === 'light' ? <Icon.Moon /> : <Icon.Sun />}
    </button>
  );
}

export default App;
