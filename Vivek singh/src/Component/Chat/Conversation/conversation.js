import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState([]);


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    console.log("friends",friendId)
    console.log("friends",currentUser.user)

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:3002/api/get-Login-one/" + friendId);
        setUser(res.data.results[0].name);
        console.log("match",res.data.results)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]); 

  return (
    <div className="conversation">
     
     
         <div >
           
        <span className="conversationName">{user}</span>
        </div>
        
    </div>
  );
}