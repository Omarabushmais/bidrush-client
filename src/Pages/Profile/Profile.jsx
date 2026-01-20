import { getProfile, updateProfile } from '../../Api/auth';
import { useState, useEffect } from "react";
import styles from "./Profile.module.css";

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [quote, setQuote] = useState({ text: "Loading quote...", author: "" });

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone_number: "",
    created_at: ""
  });

  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();

        if (data.created_at) {
            data.created_at = new Date(data.created_at).toLocaleDateString();
        }

        setFormData(data);
        setOriginalData(data);

        const quoteRes = await fetch('https://dummyjson.com/quotes/random');
        const quoteData = await quoteRes.json();
        
        setQuote({
            text: quoteData.quote,
            author: quoteData.author
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to load profile", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
        await updateProfile({
            fullname: formData.fullname,
            username: formData.username,
            email: formData.email,
            phone_number: formData.phone_number
        });

        setOriginalData(formData);
        setIsEditing(false);
        alert("Profile updated successfully!");
    } catch (err) {
        console.error(err);
        alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  if (loading) return <div className={styles.loading}>Loading Profile...</div>;

  return (
    
    <div>
        <div className={styles.header}>
            <h1>Profile</h1>
            <p>Manage your personal information and account settings.</p>

            <div>
                <p><i>"{quote.text}"</i></p>
                <span>{quote.author}</span>
            </div>
        </div>
        
        <form onSubmit={handleSave} className={styles.card}>

            <label className={styles.label}>Full Name</label>
            <input name="fullname" value={formData.fullname} required disabled={!isEditing} onChange={handleChange} className={`${styles.input} ${isEditing ? styles.editable : ""}`} />
            <label className={styles.label}>Username</label>
            <input name="username" value={formData.username} required disabled={!isEditing} onChange={handleChange} className={`${styles.input} ${isEditing ? styles.editable : ""}`} />

            <label className={styles.label}>Email</label>
            <input type="email" name="email" value={formData.email} required disabled={!isEditing} onChange={handleChange} className={`${styles.input} ${isEditing ? styles.editable : ""}`} />

            <label className={styles.label}>Phone Number</label>
            <input name="phone_number" value={formData.phone_number || ""} disabled={!isEditing} onChange={handleChange} className={`${styles.input} ${isEditing ? styles.editable : ""}`} />

            <label className={styles.label}>Member Since</label>
            <input value={formData.created_at} disabled className={`${styles.input} ${styles.readOnly}`} />

            <div className={styles.actions}>
                {isEditing && (
                  <div className={styles.actions}>
                    <button type="submit" className={styles.saveBtn}>Save</button>
                    <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                      Cancel
                    </button>
                  </div>
                )}
            </div>
        </form>
        {!isEditing && (
          <div className={styles.centerActions}>
            <button type="button" onClick={() => setIsEditing(true)} className={styles.editBtn}>
              Edit Profile
            </button>
          </div>)}
    </div>
  );
};

export default Profile;
