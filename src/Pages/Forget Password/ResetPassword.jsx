import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import logo from "../../assets/Logo.png";
import eyeIcon from "../../assets/eyeIcon.png";
import { resetPassword } from "../../Api/auth";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword(id, token, password);
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authLogo}>
          <img src={logo} alt="Logo" />
        </div>

        <h2 className={styles.title}>Change Password</h2>
        <p className={styles.subtitle}>Enter a new password</p>

        {!success ? (
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <div className={styles.inputWrapper}>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { 
                      setPassword(e.target.value); 
                      setError("");
                      }}
                      placeholder="Create a new password" className={styles.input} autoComplete="new-password" required/>
                  <img src={eyeIcon} className={`${styles.eyeIcon} ${showPassword ? styles.eyeActive : ""}`} onClick={() => setShowPassword((p) => !p)}/>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <div className={styles.inputWrapper}>
                <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                    }}
                    placeholder="Confirm your new password" className={styles.input} autoComplete="new-password" required/>
                <img src={eyeIcon} className={`${styles.eyeIcon} ${ showConfirmPassword ? styles.eyeActive : "" }`}
                    onClick={() => setShowConfirmPassword((p) => !p)}/>
                </div>
                {error && <p className={styles.errorText}>{error}</p>}
            </div>

            <button type="submit" className={styles.submitBtn}>Change Password</button>
            </form>
        ) : (
            <div className={styles.success}>
                <h3>Success!</h3>
                <p>Your password has been updated.</p>
                <p>Redirecting to login...</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
