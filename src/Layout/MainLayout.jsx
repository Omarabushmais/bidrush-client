import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import style from "./MainLayout.module.css"


function MainLayout({children}) {
  return (
    <div className={style.layout}>
      <NavBar />
      <main className={style.content}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout