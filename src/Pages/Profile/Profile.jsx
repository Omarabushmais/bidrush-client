import React, { useEffect } from 'react'
import usersMockData from "../mock Data/usersMockData.js"
import { useState } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
    const mockUser = usersMockData[0];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockUser);

//     useEffect(() => {
//     setFormData(mockUser);
//   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // setFormData(user);
    setFormData(mockUser);
    setIsEditing(false);
  };


  return (
    
    <div>
        <div className={styles.header}>
            <h1>Profile</h1>
            <p>Manage your personal information and account settings.</p>
        </div>
        <form onSubmit={handleSave} className={styles.card}>

            <label className={styles.label}>Full Name</label>
            <input name="fullName" value={formData.fullName} disabled={!isEditing} onChange={handleChange} className={`${styles.input} ${isEditing ? styles.editable : ""}`} />
                {/* className={styles.input(isEditing)} instead of className={styles.input} */}
            <label className={styles.label}>Username</label>
            <input name="username" value={formData.username} disabled={!isEditing} onChange={handleChange} className={`${styles.input} ${isEditing ? styles.editable : ""}`} />

            <label className={styles.label}>Email</label>
            <input type="email" name="email" value={formData.email} disabled={!isEditing} onChange={handleChange} className={`${styles.input} ${isEditing ? styles.editable : ""}`} />

            <label className={styles.label}>Member Since</label>
            {/* <input value={formData.memberSince} disabled className={styles.input(false)} /> */}
            <input value={formData.memberSince} disabled className={`${styles.input} ${styles.readOnly}`} />

            <div className={styles.actions}>
                {!isEditing ? (
                <button type="button" onClick={() => setIsEditing(true)} className={styles.editBtn}>
                    Edit Profile
                </button>
                ) : (
                <>
                    <button type="submit" className={styles.saveBtn}>Save</button>
                    <button type="button" onClick={handleCancel} className={styles.cancelBtn}>Cancel</button>
                </>
                )}
            </div>
        </form>
    </div>
  );
};

export default Profile;
