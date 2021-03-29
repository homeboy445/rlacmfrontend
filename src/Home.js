import React from 'react';
import Cookie from 'js-cookie';
import InboxLogo from './Inbox.svg';

const Home = () => {

    const HandleClick=()=>{
        window.location.href='/Rooms';
    }
    const GetName=()=>{
        if(Cookie.get('name')){
            return Cookie.get('name');
        }return "User";
    }
    return (
        <div className="home">
            <img src={InboxLogo} alt='Inbox' className="Inbxlgo" onClick={()=>{window.location.href="/CurActives";}}/>
            <button className="logOut" onClick={()=>{
                Cookie.remove('AccessToken');
                window.location.href='/';
                }}>LogOut</button>
            <h1>Welcome {GetName()}, to the Ram Lal College Manager.</h1>
            <h2>Would you like to book any room for some event?</h2>
            <button onClick={HandleClick} className="tkme">Take Me</button>
        </div>
    )
}

export default Home;