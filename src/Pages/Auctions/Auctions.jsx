import React, { useEffect, useState } from 'react'
import mockAuctions from "../../Components/Auctions/testdata.js";
import Auc_List from '../../Components/Auctions/Auc_List.jsx';
import styles from './Auctions.module.css';


function Auctions() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filteredAuctions = mockAuctions.filter((auction)=> {
    const matchSearch = auction.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || auction.category === category;

    return matchSearch && matchCategory;

  });

  useEffect(()=>{
    setCurrentPage(1);
  }, [search, category]);

  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const startIndex = (currentPage -1) * itemsPerPage;
  const paginatedAuction = filteredAuctions.slice(startIndex, startIndex+itemsPerPage);


  return (

    <>
      <div className={styles.header}>
        <h1>All Acutions</h1>
        <p>Browse active auctions and place your bids.</p>
      </div>
      <div className={styles.filterBar}>
        <input className={styles.searchInput} type="text" placeholder='Search Auctions...' value={search} onChange={(e)=> setSearch(e.target.value)}/>
        <select className={styles.categorySelect} value={category} onChange={(e)=> setCategory(e.target.value)}>
          <option className='options' value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
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