import React, { useState } from 'react'
import { NavLink, useNavigate  } from 'react-router-dom'
import logo from "../../assets/Logo.png"
import style from "./NavBar.module.css"

function NavBar() {

  const [menuOpen, setMenuOpen] = useState(false)

  const isLoggedIn = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  const handleLogout =() =>{

    localStorage.clear();
    setMenuOpen(false);
    navigate("/login");
    window.location.reload();

  }

  const closeMenu = () => setMenuOpen(false);

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
        {!isLoggedIn && (
          <>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/">Home</NavLink>
            </li>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/auctions">Auctions</NavLink>
            </li>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/about">About</NavLink>
            </li>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/login">Login</NavLink>
            </li>
            <li className={`${style.navitem} ${style.regbut}`}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/register">Register</NavLink>
            </li>
          </>
        )}

        {isLoggedIn && role !== "admin" && (
          <>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/">Home</NavLink>
            </li>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/auctions">Auctions</NavLink>
            </li>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/user-dashboard">Dashboard</NavLink>
            </li>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/bid-history">Bid History</NavLink>
            </li>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/profile">Profile</NavLink>
            </li>
            <li className={`${style.navitem} ${style.regbut}`}>
              <span onClick={handleLogout} className={style.navlink}>Logout</span>
            </li>
          </>
        )}

        {isLoggedIn && role ==="admin" && (
          <>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/admin-dashboard">Dashboard</NavLink>
            </li>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/manage-users">Manage Users</NavLink>
            </li>
            <li className={style.navitem}>
              <NavLink onClick={closeMenu} className={style.navlink} to="/manage-auctions">Manage Auctions</NavLink>
            </li>
            <li className={`${style.navitem} ${style.regbut}`}>
              <span onClick={handleLogout} className={style.navlink}>Logout</span>
            </li>
          </>
        )}

      </ul>
    </nav>
  )
}

export default NavBar