import React, { useEffect, useState } from 'react'
import styles from "./Manage.module.css"
import AuctionsTable from '../../Components/Admin/AuctionsTable';
import { getAllAuctions } from '../../Api/auctions';

function ManageAuctions() {
    
  const [allAuctions, setAllAuctions] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAuctions();
        setAllAuctions(data);
      } catch (err) {
        console.error("Error fetching auctions:", err);
      }
    };
    fetchData();
  }, []);


  const uniqueCategories = ["all", ...new Set(allAuctions.map(a => a.category).filter(Boolean))];
  const uniqueStatuses = ["all", ...new Set(allAuctions.map(a => a.status).filter(Boolean))];


  const filteredAuctions = allAuctions.filter((auction)=> {
    const matchSearch = auction.title.toLowerCase().includes(search.toLowerCase());
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
                    {uniqueCategories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
                    ))}
                </select>
                
                <select className={styles.categorySelect} value={status} onChange={(e) => setStatus(e.target.value)}>
                    {uniqueStatuses.map((stat, idx) => (
                        <option key={idx} value={stat}>{stat === "all" ? "All Status" : stat}</option>
                    ))}
                </select>
            </div>
        </div>
        {filteredAuctions.length > 0 ? (
            <div className={styles.Active}>
                <AuctionsTable auctions={filteredAuctions}/>
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