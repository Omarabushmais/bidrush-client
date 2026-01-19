import React, { useEffect, useState } from 'react'
import styles from "./MyAuctions.module.css"
import MyAuctionsTable from '../../Components/My auctions Table/MyAuctionsTable.jsx';
import { Link } from 'react-router-dom';
import { getMyAuctions } from "../../Api/auctions.js";


function MyAuctions() {

  const [auctions, setAuctions] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredAuctions = auctions.filter((auction)=> {
    const matchSearch = auction.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || auction.category === category;
    const matchStatus = status === "all" || auction.status === status;

    return matchSearch && matchCategory && matchStatus;
  });

  const categories = [
    ...new Set(auctions.map(a => a.category))
    ];

  const statuses = [
    ...new Set(auctions.map(a => a.status))
    ];


  useEffect(() => {
    const fetchMyAuctions = async () => {
      try {
        const data = await getMyAuctions();
        setAuctions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyAuctions();
  }, []);

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

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
            <div className={styles.innerfilter}>
                <select className={styles.categorySelect} value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {capitalize(cat)}
                        </option>
                    ))}
                </select>

                <select className={styles.categorySelect} value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    {statuses.map(stat => (
                        <option key={stat} value={stat}>
                          {capitalize(stat)}
                        </option>
                    ))}
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