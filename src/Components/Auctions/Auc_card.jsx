import React from 'react'
import style from "./Auc_card.module.css"

function Auc_card({ auction }) {
  return (
    <div className={style.card}>

      <img className={style.image} src={auction.image} alt={auction.title} />
      <h3 className={style.title}>{auction.title}</h3>
      <p className={style.bid}>Current Bid: ${auction.currentBid}</p>
      <p className={style.ends}>Ends in: {auction.endsIn}</p>
      <button className={style.button}>View Auction</button>

    </div>
  )
}

export default Auc_card