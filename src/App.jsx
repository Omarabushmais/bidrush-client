// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './Pages/Home/Home'
import Auctions from './Pages/Auctions/Auctions'
import About from './Pages/About/About'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import AuctionDetails from './Pages/Auction Detail/AuctionDetails'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <MainLayout>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Auctions' element={<Auctions/>} />
        <Route path='Auctions/:id' element={<AuctionDetails/>}/>
        <Route path='/About' element={<About/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />

      </Routes>

    </MainLayout>
  )
}

export default App
