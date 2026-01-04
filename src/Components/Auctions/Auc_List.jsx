import React from 'react'
import Auc_card from './Auc_card'
import style from './Auc_List.module.css'


function Auc_List({ auctions }) {
  return (
    <div className={style.grid}>
      {auctions.map((auction) => (
        <Auc_card key={auction.id} auction={auction} />
      ))}
    </div>
  )
}

export default Auc_List