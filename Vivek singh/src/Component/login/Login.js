import React from 'react'
import {  useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import './login.css'

function Login() {
    const history = useHistory()
    const responseSuccessGoogle = (response) => {
        console.log("Success", response)
        axios({
          method:"POST",
          url:"http://localhost:3002/api/loginwithemail",
          data:{tokenId:response.tokenId}
    
        })
        .then(function (response) {
          console.log(response.data)
          console.log(response.data.user)
          console.log(response.data.accessToken)
          console.log(response.data.refreshToken)
          /* console.log(response.data._id) */
          localStorage.setItem("userId",response.data.user._id)
          /* const data = {...response.data.user, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }
          dispatch(handleLogin(data))
          history.push(getHomeRouteForLoggedInUser(data.role)) */
          history.push('/chat')
        })
      }

      const responseFailureGoogle = (response) => {
        console.log("Failure", response)
      }
    return (
        <div>
            <div className="card">
   <form>
      <h2 className="title"> Log in</h2>
      <p className="subtitle">Don't have an account? <a > sign Up</a></p>

      <div className="social-login">
      <GoogleLogin
    clientId="77392047805-dgbmea4mpn9debule7j1al0u2mkq36nu.apps.googleusercontent.com"
    buttonText="Login with Gmail"
    onSuccess={responseSuccessGoogle}
    onFailure={responseFailureGoogle}
    cookiePolicy={'single_host_origin'}
  />
  
              
      </div>
      <p style={{textAlign:'center'}}> Please Login With Only Email</p>

      <p className="or"><span>or</span></p>

      <div className="email-login">
         <label > <b>Email</b></label>
         <input type="text" placeholder="Enter Email ID not required" name="uname" required   disabled/>
         <label ><b>Password</b></label>
         <input type="password" placeholder="Enter Email ID not required" name="psw" required disabled/>
      </div>
      <button className="cta-btn">Log In</button>
     
   </form>
</div>
        </div>
    )
}

export default Login
