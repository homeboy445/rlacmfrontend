import React,{useState,useEffect} from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';

const CurrentActivity = () => {

    const [InboxItems,UpdateInbox]=useState([
        {
            topic:"No item in your inbox"
        }
    ]);

    useEffect(()=>{
        axios.get(`https://rlacmbk.herokuapp.com/CurActives/${Cookie.get('name')}`,{
            headers: {
                Authorization: 'Bearer ' + Cookie.get('AccessToken')
            }
        }).then(response=>{
            UpdateInbox(response.data);
        }).catch(err=>{
            return;
        });
    },[]);

    return (
        <div className="Activity">
            <h1>Current Activities</h1>
            {
                InboxItems.length>0?InboxItems.map(item=>{
                    return (<div className="inbx" key={item.topic}>
                        <h1>{item.topic}</h1>
                    </div>)
                }):<h1>Nothing's in your Inbox.</h1>
            }
            {
                InboxItems.length>0?
                <button onClick={
                    ()=>{
                        axios.get(`https://rlacmbk.herokuapp.com/EmptyInbox/${Cookie.get('name')}`,{
                            headers: {
                                Authorization: 'Bearer ' + Cookie.get('AccessToken')
                            }
                        }).then(response=>{
                            window.location.href='/';
                        }).catch(err=>{
                            return;
                        });
                    }
                }>Wipe Inbox</button>:null
            }
            <a href="/">Take Me Home</a>
        </div>
    )
}

export default CurrentActivity;