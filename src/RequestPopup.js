import React,{useState} from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

const RequestPopup = ({ToggleRequestBox,data,ReRequestPopUP}) => {
    
    const [title,ToggleTitle]=useState('');
    const [description,ToggleDesc]=useState('');
    const [evtname,ToggleEvt]=useState('');

    const HandleTitle=(evt)=>{
        if(evt.target.value.trim()){
            ToggleTitle(evt.target.value.trim());
        }
    }

    const HandleDesc=(evt)=>{
        if(evt.target.value.trim()){
            ToggleDesc(evt.target.value.trim());
        }
    }

    const HandleEvt=(evt)=>{
        if(evt.target.value.trim()){
            ToggleEvt(evt.target.value.trim());
        }
    }

    const trimtime=(time)=>{
        var str=time.split("to"),res='';
        str.map(item=>{
            for(var i=0;i<item.length;i++){
                if(isNaN(item[i])||item[i]==' '){
                    continue;
                }res+=item[i];
            }res+='to';
        });
        return res.slice(0,res.length-2);
    }

    const HandleSubmission=()=>{
        axios.post('https://rlacmbk.herokuapp.com/MakeRequest',{
            title:title,
            description:description,
            evtname:evtname,
            forRoom:data[0],
            time:trimtime(data[1])
        },{headers: {
            Authorization: 'Bearer ' + Cookie.get('AccessToken')
        }})
        .then(response=>{
            if(response){
                axios.post('https://rlacmbk.herokuapp.com/StoretoInbox',{
                    topic:`Requested Room ${data[0]}`
                },{headers: {
                    Authorization: 'Bearer ' + Cookie.get('AccessToken')
                }})
                .then(response=>{
                    console.log(response);
                    return;
                })
                .catch(err=>{
                    console.log(err);
                    return;
                });
            }ReRequestPopUP("You're Request has been Recorded Successfully!");
        })
        .catch(err=>{
            ReRequestPopUP("You've Already Requested this room!");
        });
        ToggleRequestBox();
    }

    return (
        <div className="req-pop">
            <h2>Request your Room!</h2>
            <h3>{`${typeof data == undefined ? "room" : data[0]}
            for ${typeof data == undefined ? "11AM to 12AM" : data[1]}`}</h3>
            <div className="evt">
                <h3>Event Name:</h3>
                <input type="text" onChange={HandleEvt}/>
            </div>
            <h3>Why do you need the room?</h3>
            <input type="text" onChange={HandleTitle}/>
            <h3>Explain your cause here</h3>
            <textarea onChange={HandleDesc}></textarea>
            <div className="butns">
                <button onClick={HandleSubmission}>Request</button>
                <button onClick={ToggleRequestBox}>Cancel</button>
            </div>
        </div>
    )
}

export default RequestPopup;