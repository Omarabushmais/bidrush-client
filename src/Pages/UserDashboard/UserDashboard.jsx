import React, { useEffect, useState } from 'react'

import bidsIcon from "../../assets/bids.png";
import trophyIcon from "../../assets/aucWin.png";
import usersIcon from "../../assets/Users.png";

import styles from "./UserDashboard.module.css"

import MyAuctionsTable from '../../Components/My auctions Table/MyAuctionsTable.jsx';
import ActiveBids from '../../Components/Active Bids/ActiveBids.jsx';
import AuctionWonCard from '../../Components/Auction Won Card/AuctionWonCard.jsx';
import StatCard from '../../Components/Stats Card/StatCard.jsx';
import { Link } from 'react-router-dom';

import { getMyAuctions } from "../../Api/auctions.js";
import { getMyBids } from '../../Api/bids.js';

function UserDashboard() {
    const username = localStorage.getItem("username");

    const [myBids, setMyBids] = useState([]);
    const [activeBids, setActiveBids] = useState([]);
    const [wonAuctions, setWonAuctions] = useState([]);

    const [myAuctions, setMyAuctions] = useState([]);

    const capitalize = (str) =>
        str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const bidsData = await getMyBids();
                const processedBids = bidsData.map(bid => {
                    const isAuctionEnded = bid.auction_status === 'completed' || new Date(bid.end_time) < new Date();
                    
                    let displayStatus = bid.status;

                    if ((bid.status === 'Winning' || bid.status === 'Win') && isAuctionEnded) {
                        displayStatus = 'Won';
                    }

                    return {
                        ...bid,
                        item: bid.title,               
                        highestBid: bid.auction_current_price,
                        yourBid: bid.amount,
                        date: new Date(bid.created_at).toLocaleDateString(),
                        status: displayStatus,
                        auctionId: bid.auction_id
                    };
                });

                setMyBids(processedBids);
                setActiveBids(
                    processedBids.filter(b => b.auction_status === "active")
                );
                setWonAuctions(
                    processedBids.filter(b => b.status === "Won")
                );

            } catch (err) {
                console.error("Failed to load bids", err);
            }
        };

        fetchBids();
    }, []);

    useEffect(() => {
    const fetchMyAuctions = async () => {
        try {
            const data = await getMyAuctions();

            const activeAuctions = data.filter(
                a => a.status?.toLowerCase() === "active"
            );

            setMyAuctions(activeAuctions);
        } catch (err) {
            console.error("Failed to load my auctions", err);
        }
    };
    fetchMyAuctions();
    }, []);

  
  return (
    <div>
        <div className={styles.header}>
            <div>
                <h1>Dashboard</h1>
                <p>Welcome back, {capitalize(username)}</p>
            </div>

            <Link to={"/my-auctions"} className={styles.viewBtn}>View My Auctions</Link>

        </div>
        <div className={styles.statsWrapper}>
            <div className={styles.stats}>
                <StatCard icon={bidsIcon} title="Active Bids" value={`${activeBids.length} Bids`}/>
                <StatCard icon={trophyIcon} title="Auctions Won" value={`${wonAuctions.length} Auction`}/>
                <StatCard icon={usersIcon} title="Auctions Participated" value={`${new Set(myBids.map(b => b.auction_id)).size} Auctions`}/>
            </div>
        </div>

        <h2 className={styles.sectionTitle}>My Active Bids</h2>
        <div className={styles.myAuctionsActive}>
            {activeBids.length === 0 ? (
            <p className={styles.emptyText}>You have no active bids.</p>
            ) : (
            <ActiveBids bids={activeBids} />
            )}
        </div>
        
        <h2 className={styles.sectionTitle}>My Auctions</h2>
        <div className={styles.myAuctionsActive}>
        {myAuctions.length === 0 ? (
            <p className={styles.emptyText}>You have no auctions.</p>
        ) : (
            <MyAuctionsTable auctions={myAuctions} />
        )}
        </div>

        <h2 className={styles.sectionTitle}>Auctions Won</h2>
        <div className={styles.wonGrid}>
        {wonAuctions.length === 0 ? (
            <p className={styles.emptyText}>You haven’t won any auctions yet.</p>
        ) : (
            wonAuctions.map(bid => (
                <AuctionWonCard key={bid.id} auction={bid} />
            ))
        )}
        </div>

    </div>
  )                                      
}

export default UserDashboard