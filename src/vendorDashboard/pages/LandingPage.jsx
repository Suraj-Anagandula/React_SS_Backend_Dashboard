import React,{useState,useEffect} from 'react'
 import Navbar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const[showLogin,setShowLogin]=useState(false);
  const[showRegister,setShowRegister]=useState(false);
  const[showFirm,setShowFirm]=useState(false);
   const[showProduct,setShowProduct]=useState(false);
   const[showWelcome,setShowWelcome]=useState(false);
   const[showAllProducts,setShowAllProducts]=useState(false);
   const[showLogOut,setShowLogOut]=useState(false);
   const[showFirmTitle,setShowFirmTitle]=useState(true);

   useEffect(() => {
  const loginToken = localStorage.getItem("loginToken");
  const firmId = localStorage.getItem("firmId");
  const firmName = localStorage.getItem("firmName");

  if (loginToken) {
    setShowLogOut(true);

    if (!firmId) {
      // No firmId → user hasn't created a firm yet
      setShowFirm(true);
      setShowFirmTitle(true);
      setShowWelcome(false);
      setShowLogin(false);
      setShowRegister(false);
      setShowProduct(false);
      setShowAllProducts(false);
    } else if (firmName !== null) {
      // Firm is already created
      setShowFirmTitle(false);
      setShowWelcome(true);
    }
  }
}, []);


    

   const logOutHandler=()=>{
    confirm("Are you sure to logout?");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    setShowLogOut(false);
    setShowFirmTitle(true);
   }
  

const showLoginHandler=()=>{

  const Fname=localStorage.getItem("firmName");
  if(Fname!=null){
    setShowFirmTitle(true);
  }
  setShowRegister(false);
   setShowFirm(false);
    setShowProduct(false);
  setShowLogin(true);
   setShowAllProducts(false);
  setShowWelcome(false);
   
}

const showRegisterHandler=()=>{
  setShowRegister(true);
  setShowLogin(false);
   setShowFirm(false);
    setShowProduct(false);
     setShowAllProducts(false);
    setShowWelcome(false);
}
const showFirmHandler=()=>{

  if(showLogOut){

  setShowRegister(false);
  setShowLogin(false);
  setShowFirm(true);
  setShowProduct(false);
   setShowAllProducts(false);
  setShowWelcome(false);
  }
  else{
    alert("Please login!");
    setShowLogin(true);
    
  }
}
const showProductHandler=()=>{

  if(showLogOut){
  setShowRegister(false);
  setShowLogin(false);
  setShowFirm(false);
   setShowAllProducts(false);
  setShowProduct(true);
   setShowWelcome(false);
  }
  else{
    alert("Please Login!");
    setShowLogin(true);
  }
}
const showWelcomeHandler=()=>{
  setShowRegister(false);
  setShowLogin(false);
  setShowFirm(false);
  setShowProduct(false);
  setShowAllProducts(false);
  setShowWelcome(true);
}

const showAllProductsHandler=()=>{

  if(showLogOut){
  setShowRegister(false);
  setShowLogin(false);
  setShowFirm(false);
  setShowProduct(false);
  setShowWelcome(false);
  setShowAllProducts(true);
  }
  else{
    alert("Please Login!");
    setShowLogin(true);
  }
}


  return (
    <>
    <section className='landingSection'>
        <Navbar showLoginHandler={showLoginHandler}  showRegisterHandler={showRegisterHandler} showLogOut={showLogOut}  logOutHandler={logOutHandler}/>
        <div className="collectionSection">
          <SideBar showFirmHandler={showFirmHandler}  showProductHandler={showProductHandler}  showAllProductsHandler={showAllProductsHandler}
          showFirmTitle={showFirmTitle}/>

          {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
          {showRegister && <Register showLoginHandler={showLoginHandler}/>}
          {showFirm &&showLogOut &&  <AddFirm/>}
          {showProduct &&  showLogOut && <AddProduct/>}
          {showWelcome && <Welcome/>}
          {showAllProducts && showLogOut && <AllProducts/>}

           
          
          
             
        </div>
       
        
         

    </section>
      
    </>
  )
}

export default LandingPage
