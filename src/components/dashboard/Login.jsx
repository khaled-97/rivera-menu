import { useState } from 'react';
import styles from './Login.module.css';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple password check - in production, use proper authentication
    const correctPassword = 'rivera2026'; // Change this to your desired password
    
    if (password === correctPassword) {
      onLogin();
      setError('');
    } else {
      setError('كلمة المرور غير صحيحة. حاول مرة أخرى.');
      setPassword('');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox} dir="rtl">
        <div className={styles.logo}>
          <h1>Rivera</h1>
          <p>لوحة تحكم المدير</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة مرور لوحة التحكم"
              autoFocus
              required
              dir="ltr"
            />
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button type="submit" className={styles.btnLogin}>
            تسجيل الدخول
          </button>
        </form>
        
        <div className={styles.hint}>
          <p>كلمة المرور الافتراضية: <code>rivera2026</code></p>
          <p className={styles.note}>needs to be changed in production</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
