import "./messanger.css";
import Topbar from "../topbar/Topbar";
import Conversation from "../Conversation/conversation";
import Message from "../Message/Message"

import {  useEffect, useRef, useState } from "react";

import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
   const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef();

  const scrollRef = useRef();
  const user=localStorage.getItem("userId")

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {
      /* setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      ); */
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      
      try {
      const user=localStorage.getItem("userId")
        const res = await axios.get("http://localhost:3002/api/get-conversation-one/" + user);
        setConversations(res.data.results);
        console.log(res.data.results)
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/get-message-one/" + currentChat?._id);
        setMessages(res.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  console.log("message",messages)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user
    );

    socket.current.emit("sendMessage", {
      senderId: user,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:3002/api//message", message);
      setMessages([...messages, res.data.results]);
console.log(res.data.results)
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  } ;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); 

  console.log(currentChat)

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
            <Conversation  conversation={c} currentUser={user} />
            </div>
            ))}
              {/*  */}
             {/*  <Conversation  /> */}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                   <div ref={scrollRef}>
                  <Message message={m}   own={m.sender === user}  />
                  </div> 
                  ))}
                  {/*  <Message />  {/*  */}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
             ) : ( 
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
           )} 
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
          
          </div>
        </div>
      </div>
    </>
  );
}