import React from 'react'
import styles from "./ActiveBids.module.css";
import { useNavigate } from 'react-router-dom';

function ActiveBids({bids}) {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Highest Bid</th>
            <th>Your Bid</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td className={styles.item}>{bid.item}</td>
              <td>${bid.highestBid}</td>
              <td>${bid.yourBid}</td>
              <td>
                <span className={`${styles.status} ${(bid.status === "Winning" || bid.status === "Win") ? styles.winning : bid.status === "Outbid" ? styles.outbid : styles.won}`}>
                  {bid.status}
                </span>
              </td>
              <td>{bid.date}</td>
              <td>
                <button className={styles.view} onClick={() => navigate(`/auctions/${bid.auctionId}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveBids