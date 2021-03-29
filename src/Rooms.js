import React,{useState,useEffect} from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import RequestBox from './RequestPopup';

const Rooms = ({loader,CallPopUp}) => {

    const [flag,toggle]=useState(false);
    const [current,toggleCurrent]=useState([]);
    const [data,UpdateData]=useState([]);

    const ToggleRequestBox=(item)=>{
        toggleCurrent(item)
        toggle(!flag);
    }

    const GetDay=()=>{
        switch(new Date().getDay()){
            case 1:return "Monday";
            case 2:return "Tuesday";
            case 3:return "Wednesday";
            case 4:return "Thursday";
            case 5:return "Friday";
            case 6:return "Saturday";
            default:return "Sunday";
        }
    }

    const GetDate=()=>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    useEffect(()=>{
        if(GetDay()=="Saturday"||GetDay()=="Sunday"){
            return;
        }
        axios.get('https://rlacmbk.herokuapp.com/GetEmptyRooms',{
            headers: {
                Authorization: 'Bearer ' + Cookie.get('AccessToken')
            }
        })
        .then(response=>{
            if(!response){
                return Cookie.remove('AccessToken');
            }
            var arr=[];
            for(const item in response.data){
                response.data[item].map(it=>{
                    arr.push([item,it]);
                });
            }
            UpdateData(arr);
        })
        .catch(err=>{
            return;
        });
    },[]);

    return (
        <div className="rooms">
            <h3 className='ddt'>{GetDay()},{GetDate()}</h3>
            <h1>
                {GetDay()=="Saturday"||GetDay()=="Sunday"?"Hey! It's a Holiday! Go Chill!":"Available Rooms for Today"}</h1>
            {data.length>0?<div className="Rmbx">
                {

                    data.map(item=>{
                    return (<div  key={item[0]+item[1]} className="room-box" onClick={()=>{ToggleRequestBox(item)}}>
                                <h2>{item[0]}</h2>
                                <h3>{item[1]}</h3>
                            </div>)
                    })
                }
            </div>:<h1>{GetDay()=="Saturday"||GetDay()=="Sunday"
            ?"Really? You need a room on weekend! We would instead recommend that you go out with your friends & Chill! 😉"
            :"No Rooms Availaible today!"}</h1>}
            {
                flag?<RequestBox ToggleRequestBox={ToggleRequestBox}
                data={current} ReRequestPopUP={CallPopUp}/>:null
            }
            <a href="/">Take Me Home</a>
        </div>
    )
}

export default Rooms;