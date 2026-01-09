import React, { useEffect, useState } from 'react'
import bid from "../mock Data/activebids.js";
import styles from "./BidHistory.module.css"
import ActiveBids from '../../Components/Active Bids/ActiveBids.jsx';

function BidHistory() {
    
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredBids = bid.filter((bid)=> {
    const matchSearch = bid.item.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "all" || bid.status === status;

    return matchSearch && matchStatus;
  });

  return (
    <div>
        <div className={styles.header}>
            <div>
                <h1>Bid History</h1>
                <p>View all bids you have placed on auctions.</p>
            </div>
        </div>
        <div className={styles.filterBar}>
            <input className={styles.searchInput} type="text" placeholder='Search Bids...' value={search} onChange={(e)=> setSearch(e.target.value)}/> 
            <select className={styles.categorySelect} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Outbid">Outbid</option>
                <option value="Won">Won</option>
            </select>
            
        </div>
        {filteredBids.length > 0 ? (
            <div className={styles.myAuctionsActive}>
                <ActiveBids bids={filteredBids} />
            </div>
        ) : (
            <div className={styles.noFound}>
                No Bids found
            </div>
        )}
    </div>
  )
}

export default BidHistory