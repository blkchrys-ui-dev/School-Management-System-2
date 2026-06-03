import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';

import Button from '../../../components/ui/Button/Button';
import '../auth.css';

const ForgotPasswordPage = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="auth-page auth-page--compact">
      <section className="auth-card forgot-card" aria-labelledby="forgot-title">
        <div className="auth-card__icon"><MailCheck size={30} /></div>
        <h2 id="forgot-title">Reset your password</h2>
        <p>Enter your registered email and we will send password reset instructions.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email address</span>
            <div className="auth-input"><input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="name@oasis.edu" required /></div>
          </label>
          {sent && <div className="auth-success">If this email exists, reset instructions have been sent.</div>}
          <Button type="submit" fullWidth>Send reset link</Button>
        </form>
        <Link className="auth-link" to="/login">Back to login</Link>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
