import React from 'react'
import styles from "./AdminTables.module.css";
import { Link } from 'react-router-dom';


function AuctionsTable({ auctions }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Seller</th>
            <th>Category</th>
            <th>Current Bid</th>
            <th>Status</th>
            <th>Ends In</th>
            <th className={styles.actionCol}>Action</th>
          </tr>
        </thead>

        <tbody>
          {auctions.map((auction) => (
            <tr key={auction.id}>
              <td className={styles.item}>{auction.title}</td>
              <td>{auction.sellerName}</td>
              <td>{auction.category}</td>
              <td>${auction.currentBid}</td>
              <td>{auction.status}</td>
              <td>{auction.endsIn}</td>
              <td className={styles.actionCol}>
                {auction.status === "Active" ? (
                  <div className={styles.actions}>
                    <button className={styles.view}>View</button>
                    <button className={styles.view}>End</button>
                    <button className={styles.delete}>Delete</button>
                  </div>
                ) : (
                    <div className={styles.actions}>
                        <button className={styles.view}>View</button>
                        <button className={styles.delete}>Delete</button>
                    </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuctionsTable