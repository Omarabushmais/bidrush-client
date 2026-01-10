import React from 'react'
import styles from "./AdminTables.module.css";
import { Link } from 'react-router-dom';


function UsersTable({ Users }) {
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
              <td>{User.status}</td>
              <td>{User.memberSince}</td>
              <td>{User.role}</td>
              <td className={styles.actionCol}>
                {User.role === "admin" ? (
                  <div className={styles.actions}>
                    <button className={styles.view}>View</button>
                    <button className={styles.view}>Suspend</button>
                    <button className={styles.delete}>Delete</button>
                  </div>
                ) : (
                  <button className={styles.view}>View</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable