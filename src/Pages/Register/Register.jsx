import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import logo from "../../assets/Logo.png";
import eyeIcon from "../../assets/eyeIcon.png";

import { registerUser } from "../../Api/auth";
const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "", 
    username: "", 
    email: "", 
    phone_number: "",
    password: "", 
    confirmPassword: "" 
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    setError("");
    setSuccess("");

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try{
      const body ={
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password
      }

      await registerUser(body);
      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login")
      }, 2000);

    }catch(err){
      setError(err.response?.data?.message || "Registration Failed");
    }    
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
            <input name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter your full name" className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Enter your Phone Number (optional)" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" className={styles.input} autoComplete="new-password" required />
              <img src={eyeIcon} className={`${styles.eyeIcon} ${showPassword ? styles.eyeActive : ""}`} onClick={() => setShowPassword((p) => !p)} />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password</label>
            <div className={styles.inputWrapper}>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className={styles.input} autoComplete="new-password" required />
              <img src={eyeIcon} className={`${styles.eyeIcon} ${showConfirmPassword ? styles.eyeActive : ""}`} onClick={() => setShowConfirmPassword((p) => !p)} />
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
          </div>

          {success && <p className={styles.success}>{success}</p>}
          <button type="submit" className={styles.submitBtn}>Create Account</button>
        </form>
        <p className={styles.authFooter}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
