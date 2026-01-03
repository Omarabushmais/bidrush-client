import React from 'react'
import style from "./Footer.module.css"
import logo from "../../assets/Logo.png"

function Footer() {
  return (
    <footer className={style.footer}>
      <img src={logo} alt="BidRush logo" className={style.footerLogo} />

      <nav className={style.footerNav}>
        <a href="/">Home</a>
        <span>|</span>
        <a href="/auctions">Auctions</a>
        <span>|</span>
        <a href="/about">About</a>
      </nav>

      <p className={style.footerCopy}>
        © 2025 BidRush. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
