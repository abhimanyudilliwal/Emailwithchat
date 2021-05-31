import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState([]);


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.user);
    console.log("friends",friendId)

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:3002/api/get-all?_id=" + friendId);
        setUser(res.data.results);
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
           
        <span className="conversationName">Abhimanyu</span>
        </div>
        
    </div>
  );
}