import React, { useEffect, useState } from 'react'
import auc from "../mock Data/myauction.js";
import styles from "./MyAuctions.module.css"
import MyAuctionsTable from '../../Components/My auctions Table/MyAuctionsTable.jsx';
import { Link } from 'react-router-dom';

function MyAuctions() {
    
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredAuctions = auc.filter((auction)=> {
    const matchSearch = auction.item.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || auction.category === category;
    const matchStatus = status === "all" || auction.status === status;

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div>
        <div className={styles.header}>
            <div>
                <h1>My Auctions</h1>
                <p>Manage auctions you have created.</p>
            </div>

            <Link to={"/create-auction"} className={styles.viewBtn}>Create Auction</Link>

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
            <div className={styles.myAuctionsActive}>
                <MyAuctionsTable auctions={filteredAuctions} />
            </div>
        ) : (
            <div className={styles.noFound}>
                No auctions found
            </div>
        )}
    </div>
  )
}

export default MyAuctions