import React, { useEffect, useState } from 'react'
import styles from "./BidHistory.module.css"
import ActiveBids from '../../Components/Active Bids/ActiveBids.jsx';

import { getMyBids } from '../../Api/bids.js';

function BidHistory() {

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const fetchBids = async () => {
        try {
            const data = await getMyBids();

            const processedBids = data.map((bid) => {
                const now = new Date();
                const endTime = new Date(bid.end_time);
                const isEnded = endTime < now || bid.auction_status === 'completed';

                let displayStatus = bid.status; 

                if ((bid.status === 'Winning' || bid.status === 'Win') && isEnded) {
                    displayStatus = 'Won';
                }

                return {
                    id: bid.id,
                    auctionId: bid.auction_id,
                    item: bid.title,
                    highestBid: bid.auction_current_price,
                    yourBid: bid.amount,
                    status: displayStatus,
                    date: new Date(bid.created_at).toLocaleDateString(),
                };
            });

            setBids(processedBids);
        } catch (err) {
            console.error("Failed to fetch bids", err);
        } finally {
            setLoading(false);
        }
    };
    fetchBids();
  }, []);

  const filteredBids = bids.filter((bid)=> {
    const matchSearch = bid.item.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "all" || bid.status === status;

    return matchSearch && matchStatus;
  });
  

  if (loading) return <div className={styles.loading}>Loading history...</div>;

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
                <option value="Winning">Winning</option>
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