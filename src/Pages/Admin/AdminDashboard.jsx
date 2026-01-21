import React, { useEffect, useState } from 'react';
import styles from "./AdminDashboard.module.css"
import AuctionsTable from '../../Components/Admin/AuctionsTable.jsx';
import StatCard from '../../Components/Stats Card/StatCard.jsx';

import bidsIcon from "../../assets/bids.png";
import trophyIcon from "../../assets/aucWin.png";
import usersIcon from "../../assets/Users.png";
import totalUsersIcon from "../../assets/TotalUser.png";

import { getAllAuctions } from '../../Api/auctions';
import { getAllUsers } from '../../Api/auth';
import { getAllBids } from '../../Api/bids';

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeAuctions: 0,
        completedAuctions: 0,
        totalBids: 0 
    });
    
    const [recentAuctions, setRecentAuctions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [usersData, auctionsData, bidsData] = await Promise.all([
                getAllUsers(),
                getAllAuctions(),
                getAllBids()
            ]);

            const activeCount = auctionsData.filter(a => a.status === 'Active' || a.status === 'active').length;
            const completedCount = auctionsData.filter(a => a.status === 'Ended' || a.status === 'ended').length;

            setStats({
                totalUsers: usersData.length,
                activeAuctions: activeCount,
                completedAuctions: completedCount,
                totalBids: bidsData.length
            });

            const activeList = auctionsData.filter(a => a.status === 'Active' || a.status === 'active');
            setRecentAuctions(activeList.slice(0, 5));

        } catch (err) {
            console.error("Error loading dashboard data:", err);
        }
        };

        fetchData();
    }, []);

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
                <StatCard icon={totalUsersIcon} title="Total Users" value={`${stats.totalUsers} Users`} />
                <StatCard icon={bidsIcon} title="Total Bids" value={stats.totalBids} />
                <StatCard icon={usersIcon} title="Active Auctions" value={`${stats.activeAuctions} Auctions`} />
                <StatCard icon={trophyIcon} title="Auctions Done" value={`${stats.completedAuctions} Auctions`} />
            </div>
        </div>
        
        <h2 className={styles.sectionTitle}>Recent Auctions</h2>
        <div className={styles.myAuctionsActive}>
            {recentAuctions.length > 0 ? (
                <AuctionsTable auctions={recentAuctions} />
            ) : (
                <p>No active auctions found.</p>
            )}
        </div>

    </div>
  )
}

export default AdminDashboard