import React from 'react'
import auc from "../mock Data/myauction.js";
import bid from "../mock Data/activebids.js";

import bidsIcon from "../../assets/bids.png";
import trophyIcon from "../../assets/aucWin.png";
import usersIcon from "../../assets/Users.png";

import styles from "./UserDashboard.module.css"

import MyAuctionsTable from '../../Components/My auctions Table/MyAuctionsTable.jsx';
import ActiveBids from '../../Components/Active Bids/ActiveBids.jsx';
import AuctionWonCard from '../../Components/Auction Won Card/AuctionWonCard.jsx';
import StatCard from '../../Components/Stats Card/StatCard.jsx';
import { Link } from 'react-router-dom';

const activeAuctions = auc.filter(
    (auction) => auction.status === "Active"
    );
const activeBids = bid.filter(
    (bids) => bids.status === "Active"
    );

function UserDashboard() {
  return (
    <div>
        <div className={styles.header}>
            <div>
                <h1>Dashboard</h1>
                <p>Welcome back, User123</p>
            </div>

            <Link to={"/my-auctions"} className={styles.viewBtn}>View My Auctions</Link>

        </div>
        <div className={styles.statsWrapper}>
            <div className={styles.stats}>
                <StatCard icon={bidsIcon} title="Active Bids" value="3 Bids" />
                <StatCard icon={trophyIcon} title="Auctions Won" value="1 Auction" />
                <StatCard icon={usersIcon} title="Auctions Participated" value="7 Auctions" />
            </div>
        </div>

        <h2 className={styles.sectionTitle}>My Active Bids</h2>
        <div className={styles.myAuctionsActive}>
            <MyAuctionsTable auctions={activeAuctions} />
        </div>
        
        <h2 className={styles.sectionTitle}>My Auctions</h2>
        <div className={styles.myAuctionsActive}>
            <ActiveBids bids={activeBids} />
        </div>

        <h2 className={styles.sectionTitle}>Auctions Won</h2>
        <div className={styles.wonGrid}>
            {bid.filter(a => a.status === "Won").map(a => (
                <AuctionWonCard key={a.id} auction={a} />
            ))}
        </div>

    </div>
  )                                      
}

export default UserDashboard