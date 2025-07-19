import React,{useState}from 'react'
import API_URL from '../../data/apiPath';

const Register = ({showLoginHandler}) => {

  const [userName,setUsername]=useState("");
  const [userEmail,setuserEmail]=useState("");
  const [userPassword,setuserPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(true);

const handleSubmit=async(e)=>{
  e.preventDefault();
   setLoading(false);
    setError('');
     

  try {
    const response=await fetch(`${API_URL}/vendor/register`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        username:userName,
        email:userEmail,
        password:userPassword,
      }),
    });
  
      const data=await response.json();
      if(response.ok){
        console.log(data);
        alert("Vendor Register success");
        setUsername('');
        setuserEmail('');
        setuserPassword('');
        showLoginHandler();
        
      }
    
  } catch (error) {
    console.log("Registration failed",error);
    alert("Registration failed");
    
  }
};

  return (
    <div className='registerSection'>

        <form action="" className='authForm' onSubmit={handleSubmit}>
             <h3>Vendor Registration</h3> 
             <label>Username:</label>
            <input type="text" name="username" value={userName} onChange=
            {(e)=>setUsername(e.target.value)} placeholder='Enter your name' /><br/>
            <label>Email:</label>
            <input type="text" name="email" value={userEmail} onChange=
            {(e)=>setuserEmail(e.target.value)} placeholder='Enter your email' /><br/>
            <label>Password:</label>
            <input type="password" name="password" value={userPassword} onChange={(e)=>setuserPassword(e.target.value)} placeholder='Enter your password' /><br/>
            <div className="btnSubmit">
                <button type='submit'>Register</button>
            </div>
        </form>
      
    </div>
  )
}

export default Register
