import React from 'react'
import styles from "./MyAuctionsTable.module.css";
import { Link } from 'react-router-dom';

function MyAuctionsTable({ auctions }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Current Bid</th>
            <th>Status</th>
            <th>Ends In</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {auctions.map((auction) => (
            <tr key={auction.id}>
              <td className={styles.item}>{auction.item}</td>
              <td>{auction.category}</td>
              <td>${auction.currentBid}</td>
              <td>
                <span className={ auction.status === "Active" ? styles.active : styles.completed}>
                  {auction.status}
                </span>
              </td>
              <td>{auction.endsIn}</td>
              <td>
                {auction.status === "Active" ? (
                  <div className={styles.actions}>
                    <Link to={`/edit-auction/${auction.id}`} className={`${styles.linkButton} ${styles.edit}`}>Edit</Link>
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

export default MyAuctionsTable