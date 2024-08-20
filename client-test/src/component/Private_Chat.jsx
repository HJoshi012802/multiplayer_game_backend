import {useEffect,useState} from "react";
import './App.css'
import io from "socket.io-client";

const socket =io.connect("http://192.168.0.159:6069");

function App() {
  const [room,setRoom]=useState("");
  const [id,setId]=useState("");
  const [message,setMessage]=useState("");
  const [recivedmessage,setRecivedMessage]=useState([]);
 const sendMessage =()=>{
     socket.emit("send_message",{message,room});
     setMessage("");
 }

 useEffect(()=>{
  socket.on("connect",()=>{
    setId(socket.id)
  });
      socket.on("recive_message",(data)=>{
        
        setRecivedMessage((prv)=>[data,...prv]);
      
      });
      return () => {
        socket.off("connect");
        socket.off("recive_message");
      };
 },[socket])

 console.log(recivedmessage);

  return (
    <>
      <h1>Socket.io Testing Client</h1>
      <h4>{id}</h4>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <input placeholder='Join Room' style={{padding:"0.6em 1.2em", margin:"3px"}} value={room} onChange={(e)=>setRoom(e.target.value)}/>
        {/* <button onClick={joinRoom} >
          Join Room
        </button> */}
      </div>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <input placeholder='Write Message' style={{padding:"0.6em 1.2em", margin:"3px"}} value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <button onClick={sendMessage} >
          Send Message
        </button>
      </div>
      <h3>Message:</h3>
      {recivedmessage.map((msg, index) => {
      return (<p key={index}>{msg}</p>);
       })}
       
    </>
  )
}

export default App