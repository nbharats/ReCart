import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Topbar from './components/Topbar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'
import Compare from './pages/Compare'
import Notifications from './components/Notifications'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import Account from './pages/Account'
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import Help from './pages/Help';
import FAQs from './pages/FAQs';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';


function App() {

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
  
      const handleScroll = () => {
          if (window.scrollY > 300) {
              setShowBackToTop(true);
          } else {
              setShowBackToTop(false);
          }
      };
  
      window.addEventListener("scroll", handleScroll);

      return () => {
          window.removeEventListener("scroll", handleScroll);
      };
  
  }, []);

  const handleBackToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  };
  return (
    <>
    <ScrollToTop/>
    <Topbar/>
    <Navbar/>
    <Notifications/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/product/:id' element={<ProductDetails/>} />
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path="/compare" element={<Compare />} />
      <Route path="/order-success" element={<OrderSuccess />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} /> 
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    
    <Footer/>


    {showBackToTop && (
        <button
            type="button"
            className="btn btn-info back-to-top"
            onClick={handleBackToTop}
            aria-label="Back to top"
        >
            <i className="fa fa-angle-double-up"></i>
        </button>
    )}
    </>
  )
}

export default App
