import React from 'react'
import styles from "./AdminTables.module.css";
import { useNavigate } from 'react-router-dom';

function AuctionsTable({ auctions}) {

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/auctions/${id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this auction?");
    
    if (confirmDelete) {
      try {
        await deleteAuction(id);
        window.location.reload(); 
      } catch (err) {
        console.error("Error deleting auction:", err);
        alert("Failed to delete auction.");
      }
    }
  };

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
              
              <td>{auction.username || `User ${auction.seller_id}`}</td> 
              
              <td>{auction.category}</td>
              
              <td>${auction.current_price}</td>
              
              <td>{auction.status}</td>
              
              <td>{formatDate(auction.end_time)}</td>
              
              <td className={styles.actionCol}>
                  <div className={styles.actions}>
                    <button className={styles.view} onClick={() => handleView(auction.id)}>
                      View
                    </button>
                    <button className={styles.delete} onClick={() => handleDelete(auction.id)}>
                        Delete
                    </button>
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuctionsTable