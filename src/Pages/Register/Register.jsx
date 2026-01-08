import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import logo from "../../assets/Logo.png";
import eyeIcon from "../../assets/eyeIcon.png";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "", 
    username: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => { 
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log(form); 
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authLogo}><img src={logo} alt="Logo" /></div>
        <h2 className={styles.title}>Create an Account</h2>
        <p className={styles.subtitle}>Join BidRush and start bidding today</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Choose a username" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Create a password" className={styles.input} autoComplete="new-password" required />
              <img src={eyeIcon} className={`${styles.eyeIcon} ${showPassword ? styles.eyeActive : ""}`} onClick={() => setShowPassword((p) => !p)} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password</label>
            <div className={styles.inputWrapper}>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className={styles.input} autoComplete="new-password" required />
              <img src={eyeIcon} className={`${styles.eyeIcon} ${showConfirmPassword ? styles.eyeActive : ""}`} onClick={() => setShowConfirmPassword((p) => !p)} />
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
          </div>
          <button type="submit" className={styles.submitBtn}>Create Account</button>
        </form>
        <p className={styles.authFooter}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
