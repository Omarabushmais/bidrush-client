import React, { useEffect, useState } from 'react'
import style from "./Auc_card.module.css"
import { Link } from 'react-router-dom'
import { API_URL } from "../../Api/axios";

import placeholderImg from "../../assets/imagePlaceholder.png";

function Auc_card({ auction }) {
  
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };


  const coverImage = auction?.image 
    ? `${API_URL}${auction.image}` 
    : placeholderImg;

  return (
    <div className={style.card}>

      <div className={style.imageContainer}>
          <img className={style.blurBackground} src={coverImage} alt="" />
          <img className={style.image} src={coverImage} alt={auction.title} />
      </div>
      <h3 className={style.title}>{auction.title}</h3>
      <p className={style.bid}>Current Bid: ${auction.current_price}</p>
      <p className={style.ends}>Ends in: {getTimeLeft(auction.end_time)}</p>
      <Link to={`/auctions/${auction.id}`} className={style.button}>View Auction</Link>

    </div>
  )
}

export default Auc_card