import React, { useState } from 'react'
import theauctions from "../mock Data/myauction"
import styles from "./Manage.module.css"
import AuctionsTable from '../../Components/Admin/AuctionsTable';

function ManageAuctions() {
    
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredAuctions = theauctions.filter((auction)=> {
    const matchSearch = auction.item.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || auction.category === category;
    const matchStatus = status === "all" || auction.status === status;

    return matchSearch && matchCategory && matchStatus;
  });
  return (
    <div>
        <div className={styles.header}>
            <div>
                <h1>Manage Auctions</h1>
                <p>View and manage all auctions on the platform.</p>
            </div>
        </div>
        <div className={styles.filterBar}>
            <input className={styles.searchInput} type="text" placeholder='Search Auctions...' value={search} onChange={(e)=> setSearch(e.target.value)}/>
            <div>
                <select className={styles.categorySelect} value={category} onChange={(e)=> setCategory(e.target.value)}>
                    <option className='options' value="all">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                </select>
                <select className={styles.categorySelect} value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        </div>
        {filteredAuctions.length > 0 ? (
            <div className={styles.Active}>
                <AuctionsTable auctions={filteredAuctions} />
            </div>
        ) : (
            <div className={styles.noFound}>
                No auctions found
            </div>
        )}
    </div>
  )
}

export default ManageAuctions