import React,{useState} from 'react';
import API_URL from '../../data/apiPath';
 
 


const Login=({showWelcomeHandler})=>{
  const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const loginHandler= async(e)=>{
  e.preventDefault();

  try {
     const response=await fetch(`${API_URL}/vendor/login`,{
           method:"POST",
           headers:{
             'Content-Type':"application/json"
           },
           body: JSON.stringify({email,password})
          })
          const data=await  response.json();
            alert("Login success");
            localStorage.setItem("loginToken",data.token);
           
            
             

    
          const vendorId=data.vendorId
          console.log("checking for vendorId",vendorId);
           
         const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
          const vendorData=await vendorResponse.json();

          if(vendorResponse.ok){


          const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendorFirmName;

        console.log("Firm ID:", vendorFirmId);
        console.log("Firm Name:", vendorFirmName);

        localStorage.setItem("firmId", vendorFirmId);
        localStorage.setItem("firmName", vendorFirmName);

          
            window.location.reload();

          }

           setEmail("");
            setPassword("");
            showWelcomeHandler();

    
  }catch (error) {
    console.error(error);

    
  }
}

 
 

 
return (
    <div className='loginSection'>
        
        <form action="" className='authForm' onSubmit={loginHandler}>
             <h3 >Vendor Login</h3> 
            <label>Email:</label>
            <input type="text" name='email' value={email} onChange={(e)=>
              setEmail(e.target.value)} placeholder='Enter your email' /><br/>
            <label>Password:</label>
            <input type="password" name='password' value={password} onChange={(e)=>
              setPassword(e.target.value)} placeholder='Enter your password' /><br/>
            <div className="btnSubmit">
                <button type='submit'>Login</button>
            </div>
        </form>
      
    </div>
  )
  }

export default Login
