import styles from "./AuctionWonCard.module.css";

function AuctionWonCard({ auction }) {
  return (
    <div className={styles.card}>
      <p className={styles.item}>
        {auction.item}
      </p>
      <p className={styles.bid}>
        Winning Bid: <span>${auction.yourBid}</span>
      </p>
    </div>
  );
}

export default AuctionWonCard;
