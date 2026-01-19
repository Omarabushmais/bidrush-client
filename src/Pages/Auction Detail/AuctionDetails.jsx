import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import styles from "./AuctionDetails.module.css";

import { getAuctionById } from "../../Api/auctions";
import { API_URL } from "../../Api/axios";

import placeholderImg from "../../assets/imagePlaceholder.png";


function AuctionDetails() {
    const {id} = useParams();

    const [auction, setAuction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [bidValue, setBidValue] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAuctionById(id);
                setAuction(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load auction details.");
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const nextSlide = () => {
        if (!auction?.images) return;
        setCurrentImageIndex((prev) => 
            prev === auction.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        if (!auction?.images) return;
        setCurrentImageIndex((prev) => 
            prev === 0 ? auction.images.length - 1 : prev - 1
        );
    };

   const handleIncrement = (multiplier) => {
        const jump = Number(auction.bid_increment); 
        const currentPrice = Number(auction.current_price || auction.starting_price);
        const increment = jump * multiplier;
        
        setBidValue((prevBid) => {
            if (prevBid === 0) {
                return currentPrice + increment;
            }
            return prevBid + increment;
        });
    };

    const handleClear = () => {
        setBidValue(0);
    }

    const handlePlaceBidClick = () => {
        const currentPrice = auction.current_bid || auction.starting_price;
        if (bidValue <= currentPrice) return;
        setShowConfirm(true);
    };

    const handleConfirmBid = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowConfirm(false);
            setBidValue(0);
            alert("Bid placed! (Connect this to your backend)");
        }, 1000);
    };

    const handleCancelBid = () => {
        setShowConfirm(false);
    };

    useEffect(() => {
        if (auction?.images) {
            console.log("Images received from API:", auction.images);
        }
    }, [auction]);

    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick((t) => t + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getTimeLeft = (endTime) => {
        if (!endTime) return "Loading...";
        
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


    if (loading) return <div className={styles.loading}>Loading...</div>;

    const currentImgUrl = auction?.images?.[currentImageIndex]?.image_url 
        ? `${API_URL}${auction.images[currentImageIndex].image_url}` 
        : placeholderImg;

    return (
        <div>
            <div className={styles.header}>
                <h1>Auction Details</h1>
            </div>
            <div className={styles.body}>
                
                <div className={styles.leftSec}>
                    
                    <div className={styles.sliderContainer}>
                        <div className={styles.imageContainer}>
                            <img className={styles.blurBackground} src={currentImgUrl} alt=""/>
                            <img className={styles.image} src={currentImgUrl} alt="product"/>
                            
                            {auction?.images?.length > 0 && (
                                <div className={styles.imageCounter}>
                                    {currentImageIndex + 1} / {auction.images.length}
                                </div>
                            )}
                        </div>

                        {auction?.images?.length > 1 && (
                            <>
                                <button className={styles.leftArrow} onClick={prevSlide}>❮</button>
                                <button className={styles.rightArrow} onClick={nextSlide}>❯</button>
                            </>
                        )}
                    </div>
                    {auction?.images?.length > 1 && (
                        <div className={styles.thumbnailGrid}>
                            {auction.images.map((img, index) => (
                                <img 
                                    key={index}
                                    src={`${API_URL}${img.image_url}`} 
                                    alt={`thumb-${index}`}
                                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumb : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    )}

                    <h2 className={styles.h2}>{auction.title}</h2>

                    <b className={styles.Theader}>Description</b>
                    <p className={styles.text}>{auction.description}</p>

                    <b className={styles.Theader}>Seller:</b>
                    <p className={styles.text}>{username}</p>
                </div>

                <div className={styles.rightSec}>
                    <div className={styles.bidCard}>
                        <b className={styles.Theader}>Current Bid</b>
                        <p className={styles.currentBid}>${auction.current_price}</p>

                        <b className={styles.Theader}>Auction ends in</b>
                        <p className={styles.timer}>
                            {getTimeLeft(auction.end_time)}
                        </p>

                        <b className={styles.Theader}>Your Bid Amount</b>

                        <input type="text" className={styles.bidInput} value={bidValue} readOnly/>

                        <div className={styles.bidIncrements}>
                            <button onClick={() => handleIncrement(1)} className={styles.incrementBtn}> {auction.bid_increment * 1} </button>
                            <button onClick={() => handleIncrement(2)} className={styles.incrementBtn}> {auction.bid_increment * 2} </button>
                            <button onClick={() => handleIncrement(3)} className={styles.incrementBtn}> {auction.bid_increment * 3} </button>
                            <button onClick={() => handleIncrement(4)} className={styles.incrementBtn}> {auction.bid_increment * 4} </button>
                            <button onClick={() => handleIncrement(5)} className={styles.incrementBtn}> {auction.bid_increment * 5} </button>
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