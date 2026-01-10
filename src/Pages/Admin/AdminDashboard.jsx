import React from 'react'
import auc from "../mock Data/myauction.js";

import bidsIcon from "../../assets/bids.png";
import trophyIcon from "../../assets/aucWin.png";
import usersIcon from "../../assets/Users.png";
import totalUsersIcon from "../../assets/TotalUser.png";

import styles from "./AdminDashboard.module.css"
import AuctionsTable from '../../Components/Admin/AuctionsTable.jsx';
import StatCard from '../../Components/Stats Card/StatCard.jsx';

function AdminDashboard() {
    const activeAuctions = auc.filter(
        (auction) => auction.status === "Active"
    );

  return (
    <div>
        <div className={styles.header}>
            <div>
                <h1>Admin Dashboard</h1>
                <p>Overview of platform activity and management tools.</p>
            </div>
        </div>
        <div className={styles.statsWrapper}>
            <div className={styles.stats}>
                <StatCard icon={totalUsersIcon} title="Total Users" value="128 Users" />
                <StatCard icon={bidsIcon} title="Total Bids" value="1,432 bids" />
                <StatCard icon={usersIcon} title="Active Auctions" value="45 Auctions" />
                <StatCard icon={trophyIcon} title="Auctions Done" value="210 Auctions" />
            </div>
        </div>
        
        <h2 className={styles.sectionTitle}>Recent Auctions</h2>
        <div className={styles.myAuctionsActive}>
            <AuctionsTable auctions={activeAuctions} />
        </div>

    </div>
  )
}

export default AdminDashboard