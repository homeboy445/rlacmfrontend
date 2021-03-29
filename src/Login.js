import React,{useState} from 'react';
import './App.css';
import axios from 'axios';
import Cookie from 'js-cookie';
import Logo from './rlacmlogo.png';
import Image from './students.jpg';

const Login=({loader,CallPopUp})=>{

  const [email,UpdateEmail]=useState('');
  const [password,UpdatePassword]=useState('');
  const [ForgotPass,UpdateFPStatus]=useState(false);

  const HandleEmailChange=(evt)=>{
    if(evt.target.value.trim()){
      UpdateEmail(evt.target.value.trim());
    }
  }

  const HandlePasswordChange=(evt)=>{
    if(evt.target.value.trim()){
      UpdatePassword(evt.target.value.trim());
    }
  }

  const HandleLogin=(evt)=>{
    evt.preventDefault();
    console.log('-----');
    if(!(email.trim()||password.trim())){
      return;
    }
    loader(true);
    axios.post('https://rlacmbk.herokuapp.com/login',{email:email.trim(),
    password:password.trim()})
    .then(response=>{
      console.log(response);
      Cookie.set('AccessToken',response.data.accessToken);
      Cookie.set('name',response.data.name)
      Cookie.set('email',response.data.email);
      loader(false);
      window.location.href='/';
    })
    .catch(err=>{
      CallPopUp("Invalid Login Credentials!");
      loader(false);
      return;
    })
  }

  return(
    <div className="mainer">
      <img src={Logo} alt="Logo" className="logo"/>
      <img src={Image} alt="$" className="image"/>
      {
        !ForgotPass?<form className="login" onSubmit={HandleLogin}>
          <h1>Log In</h1>
          <input type="email" required onChange={HandleEmailChange} placeholder="email" />
          <input type="password" required onChange={HandlePasswordChange} placeholder="password" />
          <button type="submit">SignIn</button>
          <a onClick={()=>UpdateFPStatus(true)}>Forgot Password ?</a>
        </form>
        :<div className="login">
          <h1>Enter Email!</h1>
          <input type="email" required onChange={HandleEmailChange} placeholder="email" />
          <button onClick={()=>{
            axios.get(`https://rlacmbk.herokuapp.com/ForgotPass/${email.trim()}`)
            .then(response=>{
              CallPopUp("If you're a registered user,you will recieve an email please check it!");
            }).catch(err=>{
              CallPopUp("Some Error occured try again!");
            }); UpdateFPStatus(false);
          }}>Next</button>
          <a onClick={()=>UpdateFPStatus(false)}>Back</a>
        </div>
      }
    </div>
  )
}
export default Login;