import './App.css';
import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';

function App() {
  const[reminderMsg,setreminderMsg]=useState("");
  const[remindAt,setRemindAt]=useState();
  const[reminderList,setreminderList]=useState([])


  useEffect(()=>{
    getAllData();
  },[])

  const getAllData=()=>{
     axios.get("http://localhost:3000/getAllReminder").then((res)=>setreminderList(res.data))
  }

  const addReminder=()=>{
      axios.post("http://localhost:3000/addReminder",{reminderMsg,remindAt}).then((res)=>setreminderList(res.data))
      setreminderMsg("");
      setRemindAt();                                                                                                      
  }

  const deleteReminder=async(id)=>{
  //  await axios.delete("http://localhost:3000/deleteReminder",{id}).then((res)=>setreminderList(res.data))
    let result= await fetch("http://localhost:3000/deleteReminder",{
      method:'delete',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({id})                                                                                       
     })
       result=await result.json();
       setreminderList(result);
   }
  return (
      <div className='homepage'>
        <div className="homepage__header">
          <h1>Remind me🙋</h1>
          <input className="input-box" placeholder='Type reminder Notes Here' type="text" value={reminderMsg} onChange={(e)=>setreminderMsg(e.target.value)} />
          <DateTimePicker
          className="date-box"
          value={remindAt}
          onChange={setRemindAt}
          minDate={new Date()}
          minutePlaceholder="mm"
          hourPlaceholder='hh'                
          dayPlaceholder='DD'
          monthPlaceholder='MM'
          yearPlaceholder='YYYY'
          />
          <div className="btn" onClick={addReminder}>Add Reminder</div>
        </div>

        <div className="homepage__body">
          {
            reminderList?.map((element)=>{

            return <div key={element._id} className="reminder__card">
              <h2>{element.reminderMsg}</h2>
              <h3>Remind Me at:</h3>
              <p>{String(new Date(element.remindAt.toLocaleString()))}</p>
              <div className="btn" onClick={()=>deleteReminder(element._id)}>Delete</div>
            </div>
            })
          }
        </div>

                                                    
      </div>
  );
}

export default App;
