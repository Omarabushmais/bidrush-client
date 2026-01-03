import React from 'react'
import { NavLink  } from 'react-router-dom'
import logo from "../../assets/Logo.png"
import style from "./NavBar.module.css"

function NavBar() {
  return (
    <nav className={style.navbar}>
      <NavLink to="/" className={style.logo}>
        <img src={logo} alt="BidRush Logo" />
      </NavLink>

      <ul className={style.navlist}>
        
        <li className={style.navitem}>
          <NavLink className={style.navlink} to="/">
            Home
          </NavLink>
        </li>

        <li className={style.navitem}>
          <NavLink className={style.navlink} to="/auctions">
            Auctions
          </NavLink>
        </li>

        <li className={style.navitem}>
          <NavLink className={style.navlink} to="/about">
            About
          </NavLink>
        </li>

        <li className={style.navitem}>
          <NavLink className={style.navlink} to="/login">
            Login
          </NavLink>
        </li>

        <li className={`${style.navitem} ${style.regbut}`}>
          <NavLink className={style.navlink} to="/register">
            Register
          </NavLink>
        </li>
        
      </ul>
    </nav>
  )
}

export default NavBar