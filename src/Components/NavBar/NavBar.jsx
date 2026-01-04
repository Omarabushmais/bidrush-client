import React, { useState } from 'react'
import { NavLink  } from 'react-router-dom'
import logo from "../../assets/Logo.png"
import style from "./NavBar.module.css"

function NavBar() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={style.navbar}>
      <NavLink to="/" className={style.logo}>
        <img src={logo} alt="BidRush Logo" />
      </NavLink>

      <button className={style.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>

      <ul className={`${style.navlist} ${menuOpen ? style.open : ""}`}>
        <li className={style.navitem}>
          <NavLink onClick={() => setMenuOpen(false)} className={style.navlink} to="/">Home</NavLink>
        </li>
        <li className={style.navitem}>
          <NavLink onClick={() => setMenuOpen(false)} className={style.navlink} to="/auctions">Auctions</NavLink>
        </li>
        <li className={style.navitem}>
          <NavLink onClick={() => setMenuOpen(false)} className={style.navlink} to="/about">About</NavLink>
        </li>
        <li className={style.navitem}>
          <NavLink onClick={() => setMenuOpen(false)} className={style.navlink} to="/login">Login</NavLink>
        </li>
        <li className={`${style.navitem} ${style.regbut}`}>
          <NavLink onClick={() => setMenuOpen(false)} className={style.navlink} to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar