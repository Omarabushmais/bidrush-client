import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { loginUser } from "../../Api/auth";

import logo from "../../assets/Logo.png";
import emailIcon from "../../assets/emailIcon.png";
import passIcon from "../../assets/lockIcon.png";
import eyeIcon from "../../assets/eyeIcon.png";

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] =useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{

      const data = await loginUser(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.userId);

      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    }catch(err){
      console.error(err);
      setError(err.response?.data?.message || "Login Failed");
    }

  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authLogo}>
          <img src={logo} alt="Logo" />
        </div>

        <h2 className={styles.title}>Login to Your Account</h2>
        <p className={styles.subtitle}> Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <img src={emailIcon} alt="Email icon" className={styles.inputIcon}/>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className={styles.input} required/>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <img src={passIcon} alt="Password icon" className={styles.inputIcon}/>
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" className={styles.input} required/>
              <img src={eyeIcon} alt="Toggle password visibility" className={`${styles.eyeIcon} ${showPassword ? styles.eyeActive : "" }`}onClick={() => setShowPassword((prev) => !prev)} />

            </div>
          </div>

          <div className={styles.forgotPassword}><Link to="/forgot-password">Forgot password?</Link></div>
          {error && <p className={styles.errorText}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>Login</button>
        </form>

        <p className={styles.authFooter}>Don’t have an account?{" "}<Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
