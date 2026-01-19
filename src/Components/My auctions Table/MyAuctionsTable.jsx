import React, { useEffect, useState } from 'react'
import styles from "./MyAuctionsTable.module.css";
import { Link } from 'react-router-dom';
import { deleteAuction } from '../../Api/auctions';

function MyAuctionsTable({ auctions }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [auctionToDelete, setAuctionToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const getTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  
    const [, setTick] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setTick((t) => t + 1);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const handleDeleteClick = (id) => {
      setAuctionToDelete(id);
      setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
      setShowDeleteModal(false);
      setAuctionToDelete(null);
    };

  const confirmDelete = async () => {
    if (!auctionToDelete) return;

    setIsDeleting(true);
    try {
      await deleteAuction(auctionToDelete);

      window.location.reload();
      closeDeleteModal();

    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to delete auction");
    } finally {
      setIsDeleting(false);
    }
  };

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
              <td className={styles.item}>{capitalize(auction.title)}</td>
              <td>{capitalize(auction.category)}</td>
              <td>${auction.current_price}</td>
              <td>
                <span className={ auction.status === "active" ? styles.active : styles.completed}>
                  {capitalize(auction.status)}
                </span>
              </td>
              <td>{getTimeLeft(auction.end_time)}</td>
              <td>
                {auction.status === "active" ? (
                  <div className={styles.actions}>
                    <Link to={`/auctions/${auction.id}`} className={`${styles.linkButton} ${styles.view}`}>View</Link>
                    <Link to={`/edit-auction/${auction.id}`} className={`${styles.linkButton} ${styles.edit}`}>Edit</Link>
                    <button className={styles.delete} onClick={() => handleDeleteClick(auction.id)}>Delete</button>
                  </div>
                ) : (
                  <Link to={`/auctions/${auction.id}`} className={`${styles.linkButton} ${styles.view}`}>View</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Delete Auction</h3>
            <p>Are you sure you want to delete this auction? This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeDeleteModal} disabled={isDeleting}>Cancel</button>
              <button className={styles.confirmBtn} onClick={confirmDelete} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyAuctionsTable