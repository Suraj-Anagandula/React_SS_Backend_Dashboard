import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showLogOut,logOutHandler}) => {
 // console.log(showLoginHandler);
  //console.log(showRegisterHandler);
  const firmName=localStorage.getItem("firmName");

  return (
     <div className="navSection">

        <div className="company">
            Vendor Company
        </div>
        <div className="firmName">
         <h4> Firm Name:{firmName}</h4>
        </div>
        <div className="userAuth">
           {!showLogOut ?  <>  
             <span onClick={showLoginHandler}>Login /</span>
            <span onClick={showRegisterHandler}>Register</span></>
            : <span onClick={logOutHandler}>Logout</span> }
            
             
        </div>
     </div>
  )
}

export default Navbar
