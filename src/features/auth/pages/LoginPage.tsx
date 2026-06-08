import { useState, type FormEvent } from 'react';
import { GraduationCap, LockKeyhole, UserRound, UsersRound } from 'lucide-react';

import Button from '../../../components/ui/Button/Button';
import { DEMO_USERS, useLogin } from '../hooks/useLogin';
import type { UserRole } from '../../../types/auth.types';
import '../auth.css';

const ROLES: Array<{ value: UserRole; label: string }> = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'admin', label: 'Admin' },
];

const LoginPage = (): React.ReactElement => {
  const { submitLogin, isLoading, error } = useLogin();
  const [formData, setFormData] = useState({
    userId: DEMO_USERS.student.userId,
    password: DEMO_USERS.student.password,
    role: 'student' as UserRole,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void submitLogin(formData);
  };

  const handleRoleSelect = (role: UserRole): void => {
    setFormData({
      userId: DEMO_USERS[role].userId,
      password: DEMO_USERS[role].password,
      role,
    });
  };

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <div className="auth-hero__badge"><GraduationCap size={22} /> Oasis Academy</div>
        <h1>Powerful school management for students, teachers, and admins.</h1>
        <p>Track attendance, notices, homework, reports, fees, and school communication from one polished dashboard.</p>
        <div className="auth-stats">
          <span><strong>1.2k+</strong> Students</span>
          <span><strong>80+</strong> Staff</span>
          <span><strong>99%</strong> Digital workflows</span>
        </div>
      </section>

      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-card__icon"><UsersRound size={30} /></div>
        <h2 id="login-title">Welcome back</h2>
        <p>Use the role-specific demo credentials below or connect your backend with VITE_API_BASE_URL.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>User ID</span>
            <div className="auth-input"><UserRound size={18} /><input value={formData.userId} onChange={event => setFormData(prev => ({ ...prev, userId: event.target.value }))} placeholder="Enter user id" required /></div>
          </label>

          <label>
            <span>Password</span>
            <div className="auth-input"><LockKeyhole size={18} /><input type="password" value={formData.password} onChange={event => setFormData(prev => ({ ...prev, password: event.target.value }))} placeholder="Enter password" required /></div>
          </label>

          <label>
            <span>Login as</span>
            <div className="auth-role-grid">
              {ROLES.map(role => (
                <button key={role.value} type="button" className={formData.role === role.value ? 'active' : ''} onClick={() => handleRoleSelect(role.value)}>{role.label}</button>
              ))}
            </div>
          </label>

          <div className="auth-demo-hint" aria-live="polite">
            <span>Demo login:</span>
            <strong>{DEMO_USERS[formData.role].userId}</strong>
            <code>{DEMO_USERS[formData.role].password}</code>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <Button type="submit" isLoading={isLoading} fullWidth>Sign in securely</Button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
