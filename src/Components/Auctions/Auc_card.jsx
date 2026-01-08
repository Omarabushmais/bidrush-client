import React from 'react'
import style from "./Auc_card.module.css"
import { Link } from 'react-router-dom'

function Auc_card({ auction }) {
  return (
    <div className={style.card}>

      <img className={style.image} src={auction.image} alt={auction.title} />
      <h3 className={style.title}>{auction.title}</h3>
      <p className={style.bid}>Current Bid: ${auction.currentBid}</p>
      <p className={style.ends}>Ends in: {auction.endsIn}</p>
      <Link to={`/auctions/${auction.id}`} className={style.button}>View Auction</Link>

    </div>
  )
}

export default Auc_card