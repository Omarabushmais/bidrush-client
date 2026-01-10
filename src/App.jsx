import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './Pages/Home/Home'
import Auctions from './Pages/Auctions/Auctions'
import About from './Pages/About/About'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import AuctionDetails from './Pages/Auction Detail/AuctionDetails'
import ForgotPassword from './Pages/Forget Password/ForgotPassword'
import ResetPassword from './Pages/Forget Password/ResetPassword'
import NotFound from './Pages/Not Found/NotFound'
import UserDashboard from './Pages/UserDashboard/UserDashboard'
import MyAuctions from './Pages/My Auctions/MyAuctions'
import BidHistory from './Pages/Bid History/BidHistory'
import CreateAuction from './Pages/Create Edit Auction/CreateAuction'
import EditAuction from './Pages/Create Edit Auction/EditAuction'
import Profile from './Pages/Profile/Profile'


function App() {

  return (
    <MainLayout>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auctions' element={<Auctions/>} />
        <Route path='/auctions/:id' element={<AuctionDetails/>}/>
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/my-auctions" element={<MyAuctions />} />
        <Route path="/bid-history" element={<BidHistory />} />
        <Route path="/create-auction" element={<CreateAuction />} />
        <Route path="/edit-auction/:id" element={<EditAuction />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />


      </Routes>

    </MainLayout>
  )
}

export default App
