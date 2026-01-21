import React, { useState } from 'react'
import styles from "./AdminTables.module.css";
import { useNavigate } from 'react-router-dom';

function UsersTable({ Users, onSuspend, onDelete }) {

  const navigate = useNavigate();

  const [viewUser, setViewUser] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Role</th>
            <th className={styles.actionCol}>Action</th>
          </tr>
        </thead>

        <tbody>
          {Users.map((User) => (
            <tr key={User.id}>
              <td className={styles.item}>{User.username}</td>
              <td>{User.email}</td>
              
              <td>
                <span className={User.status === 'suspended' ? styles.statusSuspended : styles.statusActive}>
                   {User.status}
                </span>
              </td>
              
              <td>{formatDate(User.created_at)}</td>
              
              <td>{User.role}</td>
              
              <td className={styles.actionCol}>
                  <div className={styles.actions}>
                    <button className={styles.view} onClick={() => setViewUser(User)}>
                        View
                    </button>

                    {User.role !== 'admin' && (
                        <>
                            <button className={styles.view} onClick={() => onSuspend(User.id)}>
                                Suspend
                            </button>
                            <button className={styles.delete} onClick={() => onDelete(User.id)}>
                                Delete
                            </button>
                        </>
                    )}
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewUser && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>User Details</h2>
                    <button className={styles.closeBtn} onClick={() => setViewUser(null)}>×</button>
                </div>
                
                <div className={styles.modalBody}>
                    <div className={styles.detailRow}>
                        <label>Full Name:</label>
                        <span>{viewUser.fullname || "N/A"}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Username:</label>
                        <span>{viewUser.username}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Email:</label>
                        <span>{viewUser.email}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Phone:</label>
                        <span>{viewUser.phone_number || "N/A"}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Role:</label>
                        <span>{viewUser.role}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Status:</label>
                        <span className={viewUser.status === 'suspended' ? styles.textSuspended : styles.textActive}>
                            {viewUser.status}
                        </span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Joined:</label>
                        <span>{formatDate(viewUser.created_at)}</span>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.closeButtonAction} onClick={() => setViewUser(null)}>Close</button>
                </div>
            </div>
        </div>
      )}

      
    </div>
  )
}

export default UsersTable