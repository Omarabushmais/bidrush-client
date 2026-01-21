import React, { useEffect, useState } from 'react'
import Auc_List from '../../Components/Auctions/Auc_List.jsx';
import styles from './Auctions.module.css';
import { getAllAuctions } from "../../Api/auctions.js";


function Auctions() {

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
  const calculateItemsPerPage = () => {
    const width = window.innerWidth;

    if (width < 1024) {
      setItemsPerPage(6);
    } else if (width < 1400) {
      setItemsPerPage(6);
    } else if (width < 1750) {
      setItemsPerPage(8);
    } else {
      setItemsPerPage(10);
    }
  };

  calculateItemsPerPage();
  window.addEventListener("resize", calculateItemsPerPage);

  return () => window.removeEventListener("resize", calculateItemsPerPage);
}, []);

useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAllAuctions();
        const activeOnly = data.filter(a => a.status === 'active' || a.status === 'Active');
        setAuctions(activeOnly);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch auctions", err);
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  useEffect(()=>{
    setCurrentPage(1);
  }, [search, category, itemsPerPage]);

  const uniqueCategories = [...new Set(auctions.map(a => a.category))];

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const filteredAuctions = auctions.filter((auction)=> {
    const matchSearch = auction.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || auction.category === category;

    const isNotMyAuction =!userId || Number(auction.seller_id) !== Number(userId);

    return matchSearch && matchCategory && isNotMyAuction;
  });

  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const startIndex = (currentPage -1) * itemsPerPage;
  const paginatedAuction = filteredAuctions.slice(startIndex, startIndex+itemsPerPage);

  if (loading) return <div style={{padding:"50px", textAlign:"center"}}>Loading Auctions...</div>;
  

  return (

    <>
      <div className={styles.header}>
        <h1>All Auctions</h1>
        <p>Browse active auctions and place your bids.</p>
      </div>
      <div className={styles.filterBar}>
        <input className={styles.searchInput} type="text" placeholder='Search Auctions...' value={search} onChange={(e)=> setSearch(e.target.value)}/>
        <select className={styles.categorySelect} value={category} onChange={(e)=> setCategory(e.target.value)}>
          <option className='options' value="all">All Categories</option>
          {uniqueCategories.map((cat) => (
             <option key={cat} value={cat}>
               {capitalize(cat)}
             </option>
          ))}
        </select>
      </div>

      {paginatedAuction.length === 0 ? (<p className={styles.noFound}>No Auctions Found</p>):(<Auc_List auctions={paginatedAuction} />)}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button className={styles.pageBtn} disabled={currentPage===1} onClick={()=> setCurrentPage(currentPage-1)}>Prev</button>

          {Array.from({length: totalPages}, (_, i) => i+1).map((page)=> (
            <button key={page} onClick={() => setCurrentPage(page)} disabled={page === currentPage} className={`${styles.pageBtn} ${page === currentPage ? styles.activePage : ""}`}>{page}</button>
          ))}

          <button className={styles.pageBtn} disabled={currentPage===totalPages} onClick={()=> setCurrentPage(currentPage+1)}>Next</button>
        </div>
      )}
    </>

  )
}

export default Auctions