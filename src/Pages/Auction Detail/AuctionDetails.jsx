import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import mockAuctions from "../../Components/Auctions/testdata";
import styles from "./AuctionDetails.module.css";

function AuctionDetails() {
    const {id} = useParams();
    const auction = mockAuctions.find((a)=> a.id === Number(id));
    const [bidValue, setBidValue] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleIncrement = (multiplier) =>{
        const increment = auction.bidJump * multiplier;
        
        setBidValue((prevBid) => {
            if (prevBid === 0) {
                return auction.currentBid + increment;
            }
            return prevBid + increment;
        });
    };

    const handleClear = ()=> {
        setBidValue(0);
    }

    const handlePlaceBidClick = () => {
        if (bidValue <= auction.currentBid) return;
        setShowConfirm(true);
    };

    const handleConfirmBid = () => {
        setIsSubmitting(true);

        setTimeout(() => {

            setIsSubmitting(false);
            setShowConfirm(false);
            setBidValue(0);

        }, 1000);
    };

    const handleCancelBid = () => {
        setShowConfirm(false);
    };


    return (
        <div>
            <div className={styles.header}>
                <h1>Auction Details</h1>
            </div>
            <div className={styles.body}>
                
                <div className={styles.leftSec}>
                    
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={auction.image} alt="image of product"/>
                    </div>

                    <h2 className={styles.h2}>{auction.title}</h2>

                    <b className={styles.Theader}>Description</b>
                    <p className={styles.text}>{auction.description}</p>

                    <b className={styles.Theader}>Seller:</b>
                    <p className={styles.text}>{auction.sellerName}</p>
                </div>

                <div className={styles.rightSec}>
                    <div className={styles.bidCard}>
                        <b className={styles.Theader}>Current Bid</b>
                        <p className={styles.currentBid}>${auction.currentBid}</p>

                        <b className={styles.Theader}>Auction ends in</b>
                        <p className={styles.timer}>{auction.endsIn}</p>

                        <b className={styles.Theader}>Your Bid Amount</b>

                        <input type="text" className={styles.bidInput} value={bidValue} readOnly/>

                        <div className={styles.bidIncrements}>
                            <button onClick={() => handleIncrement(1)} className={styles.incrementBtn}> {auction.bidJump * 1} </button>
                            <button onClick={() => handleIncrement(2)} className={styles.incrementBtn}> {auction.bidJump * 2} </button>
                            <button onClick={() => handleIncrement(3)} className={styles.incrementBtn}> {auction.bidJump * 3} </button>
                            <button onClick={() => handleIncrement(4)} className={styles.incrementBtn}> {auction.bidJump * 4} </button>
                            <button onClick={() => handleIncrement(5)} className={styles.incrementBtn}> {auction.bidJump * 5} </button>
                        </div>
                        <button className={styles.clearBtn} onClick={handleClear} disabled={bidValue === 0}>Clear</button>
                        
                        <button onClick={handlePlaceBidClick} className={styles.placeBidBtn}>Place Bid</button>
                    </div>
                    <div className={styles.historyCard}>
                        <h3 className={styles.historyTitle}>Bid History</h3>

                        <table className={styles.historyTable}>
                        <thead>
                            <tr>
                            <th>Bidder</th>
                            <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                            <td>User123</td>
                            <td>$1000</td>
                            </tr>
                            <tr>
                            <td>BidMaster</td>
                            <td>$950</td>
                            </tr>
                            <tr>
                            <td>AuctionFan</td>
                            <td>$900</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Confirm Your Bid</h2>

                        <p className={styles.pPlacing}>You are about to place a bid of<strong> ${bidValue}</strong></p>

                        <p className={styles.modalSubText}>This action cannot be undone.</p>

                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={handleCancelBid} disabled={isSubmitting}>Cancel</button>

                            <button className={styles.confirmBtn} onClick={handleConfirmBid} disabled={isSubmitting}>
                                {isSubmitting ? "Placing..." : "Confirm Bid"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default AuctionDetails