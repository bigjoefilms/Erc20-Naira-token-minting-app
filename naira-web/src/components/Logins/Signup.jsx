import React from 'react'
import './signup.css';
import {Link} from "react-router-dom";




function Signup() {

  
      
      
  return (
   <>
   <div>
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
           
            <h2>Sign In to Naira</h2>
            <p>To sign in, please type in the email address linked to your Naira account.</p>
            <div className="input-container int ">
                <label>Email Address </label>
                <input type="email" name="uname" required placeholder='example@gmail.com' />
               </div>
               <div className="input-container ">
                <label>Password </label>
                <input type="password" name="uname" required placeholder= '..........' />
                <p>Forgot Password? <b>Reset it</b></p>
                <p>Don't have an account? <Link to="/signin" className='link' ><b> SignUp</b> </Link> </p>

               </div>
               <button type="button" className='btn-t' >Sign in</button>

        </div>
       
    </div>
    <div className='foote'> Made with 👽 by Bigjoe.js</div>
    </div>


   </>
  )
}

export default Signup