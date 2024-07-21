import React from 'react';
import Google from '../imgs/google.png';
// import Facebook from '../imgs/facebook.png';
import Github from '../imgs/github.png';

const Login1 = () => {

  const google = () => {
    window.open("https://login-page-pi-umber.vercel.app/auth/google", "_self")
  }
  const github = () => {
    window.open("https://login-page-pi-umber.vercel.app/auth/github", "_self")
  }
  // const facebook = () => {
  //   window.open("https://login-page-pi-umber.vercel.app/auth/facebook", "_self")
  // }
      

  return (
    <div className='login'>
     <h1 className='loginTitle'>Choose a Login Method</h1> 
    <div className='wrapper'>
      <div className='left'>
        <div className='loginButton google' onClick={google}>
          <img src={Google} alt="" className="icon" />
          Google
        </div>

        {/* <div className='loginButton facebook' onClick={facebook}>
          <img src={Facebook} alt="" className="icon" />
          Facebook
        </div> */}

        <div className='loginButton github' onClick={github}>
           <img src={Github} alt="" className="icon" />
          Github
        </div>
      </div>
      {/* <div className='center'>
        <div className='line'></div>
        <div className='or'>OR</div>
      </div> */}
      {/* <div className='right'>
      <input className="input" type='text' placeholder='Username' />
      <input className="input" type='text' placeholder='Password' />
      <button className='submit'>Login</button>
      </div> */}
    </div>
  </div>
)
}

export default Login1;