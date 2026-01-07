import React from 'react'
import styles from "./About.module.css"
import about1 from "../../assets/about1.png"
import about2 from "../../assets/about2.png"

function About() {
  return (
    <div>
      <header className={styles.header}>
        <h1>About BidRush</h1>
        <p>A simple and secure online auction platform.</p>
      </header>
      <section>
        <div className={styles.imagecontainerR}>
          <img src={about1} alt="image"/>
          <div className={styles.first}>
            <h2>Who We Are</h2>
            <p>BidRush is an online auction platform that allows users to browse items, place bids, and compete in real-time auctions. The platform is designed to provide a simple, secure, and user-friendly bidding experience.</p>
          </div>
        </div>

      </section>
      <hr className={styles.hr}/>
      <section className={styles.mid}>
        <div className={styles.sec}>
          <h2>What We Offer</h2>
          <ul>
            <li>Live online auctions</li>
            <li>Secure user accounts</li>
            <li>Real-time bidding experience</li>
            <li>Simple and intuitive interface</li>
          </ul>
        </div>
      </section>
      
      <hr className={styles.hr}/>

      <section>
        <div className={styles.imagecontainerL}>
          <img src={about2} alt="image" />
          <div className={styles.third}>
            <h2>Our Goal</h2>
            <p>Our goal is to create a reliable auction platform where users can confidently bid on items, track auction progress, and enjoy a smooth and transparent bidding process.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About