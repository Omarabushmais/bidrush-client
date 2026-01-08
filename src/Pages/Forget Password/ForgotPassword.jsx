import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import logo from "../../assets/Logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log({ email });
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authLogo}><img src={logo} alt="Logo" /></div>
        <h2 className={styles.title}>Forgot Your Password?</h2>
        <p className={styles.subtitle}>Enter your email address and we’ll send you a password reset link.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={styles.input} required />
            </div>
            <button type="submit" className={styles.submitBtn}>Send Reset Link</button>
          </form>
        ) : (
          <p className={styles.successText}>A reset email link has been sent.</p>
        )}

        <p className={styles.authFooter}>Back to <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default ForgotPassword;
