import React from 'react'
import './signup.css';
import {Link} from "react-router-dom";



function Signin() {
  return (
   <>
   <header> 
    <div className='logo'>
        <Link to="/" className='head'><h2>Naira <b>₦</b> </h2></Link>
        
        </div>
        </header>
    <div className='container'>
    <div className='check'>
                <p>Please check that you are visiting the correct URL <b>https://app.naira.com</b></p>
            </div>
        <div className='rigt'>
           
            <h2>Get Started</h2>
            <div className="input-container int ">
                <label>Email Address </label>
                <input type="email" name="uname" required placeholder='example@gmail.com'/>
               </div>
               <div className="input-container ">
                <label>Phone Number </label>
                <input type="password" name="uname" required placeholder= 'enter phone number' />
               </div>
               <div className="input-container  ">
                <label>Password </label>
                <input type="password" name="uname" required placeholder= '..........' />
                <p>Have an account? <Link to="/signup" className='link'><b> Signin</b> </Link> </p>
               </div>
               <button type="button" className='btn-t' >Sign Up</button>

        </div>
       
    </div>

    
    <div className='foote'> Made with 👽 by Bigjoe.js</div>

   
   
   </>
  



  )
}

export default Signin