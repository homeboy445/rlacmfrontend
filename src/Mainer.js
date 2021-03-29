import React,{useState,useEffect} from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import Loader from './loader.svg';
import Cookie from 'js-cookie';
import Login from './Login';
import Home from './Home';
import Room from './Rooms';
import CurrentActivity from './CurrentActivity';

const Mainer = () => {

    const [LoggedIn,UpdateStatus]=useState(Cookie.get('AccessToken'));
    const [Loading,UpdateLoadStatus]=useState(false);
    const [ReRequest,UpdateReReq]=useState('');

    const TriggerLoader=(status)=>{
        UpdateLoadStatus(status);
        setTimeout(()=>{
            UpdateLoadStatus(false);
        },10000);
    }
    
    useEffect(() => {
        if(Cookie.get('AccessToken')){
            return UpdateStatus(true);
        }UpdateStatus(false);
    },[LoggedIn]);

    return (
        <div onClick={()=>UpdateReReq('')}>
            {
                Loading?<img src={Loader} alt="Loading..." className="loader"/>
                :null
            }
            <div style={{opacity:ReRequest.length>0||Loading?0.6:1}}>
            <Switch>
                <Route path='/' exact component={()=>{
                    return LoggedIn?<Home loader={TriggerLoader} CallPopUp={UpdateReReq}/>:
                    <Login loader={TriggerLoader} CallPopUp={UpdateReReq}/>
                }}/>
                <Route path="/Rooms" component={()=>{
                    return LoggedIn?<Room CallPopUp={UpdateReReq} />:
                    <Redirect to="/" />
                }} />
                <Route path="/CurActives" component={()=>{
                    return LoggedIn?<CurrentActivity CallPopUp={UpdateReReq} />:
                    <Redirect to="/" />
                }} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
            </div>
            {
                ReRequest.length>0?
                <div className="rereq">
                    <h1>{ReRequest}</h1>
                </div>:null
            }
        </div>
    )
}

export default Mainer;