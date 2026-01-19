import React, { useEffect, useState } from 'react'
import style from "./Home.module.css"
import { NavLink  } from 'react-router-dom'
import homeImage from "../../assets/homeImage.png"
import Auc_List from '../../Components/Auctions/Auc_List'
import step1 from "../../assets/register.png";
import step2 from "../../assets/bids.png";
import step3 from "../../assets/aucWin.png";

import { getAllAuctions } from "../../Api/auctions.js";


function Home() {

  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getAllAuctions();
        
        const activeOnly = data.filter(a => a.status === 'active' || a.status === 'Active');
        
        setFeaturedAuctions(activeOnly.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch featured auctions", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <section className={style.secOne}>
        <div className={style.textContent}>
          <h1 className={style.h1Tag}>Bid. Compete. Win</h1>
          <p className={style.pTag}>Join online auctions and place bids on items you love from anywhere, anytime</p>
          <div className={style.buttons}>
            <NavLink className={style.GotoAuc} to="/auctions">
              Browse Auctions
            </NavLink>
            {!username && (
                <NavLink className={style.GotoReg} to="/register">
                  Create Account
                </NavLink>
            )}
          </div>
          
        </div>
        <img className={style.homeImage} src={homeImage} alt="Home Image" />
      </section>

      <section className={style.secTwo}>
        <h2 className={style.h2Tag}>Featured Auctions</h2>
        <Auc_List auctions={featuredAuctions} />
      </section>
      

      <section className={style.secThree}>
        <h2 className={style.h2Tag}>How it Works</h2>
        <div className={style.how}>
          <div>
            <img className={style.howImage} src={step1} alt="Create an Account" />
            <h3 className={style.h3Tag}>Create an Account</h3>
            <p className={style.howP}>Sign up for free and get access to live auctions</p>
          </div>
          <div>
            <img className={style.howImage} src={step2} alt="Place Your Bids" />
            <h3 className={style.h3Tag}>Place Your Bids</h3>
            <p className={style.howP}>Browse auctions and place bids on items you want</p>
          </div>
          <div className={style.gridCentered}>
            <img className={style.howImage} src={step3} alt="Win the Auction" />
            <h3 className={style.h3Tag}>Win the Auction</h3>
            <p className={style.howP}>When the timer ends, the highest bid wins the item</p>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default Home