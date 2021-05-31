import "./topbar.css";
import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import Logout from '../../logout/logout'

export default function Topbar() {
  const [username,setUsername]=useState('')
  const user=localStorage.getItem("userId")

  useEffect(() => {
  

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:3002/api/get-Login-one/" + user);
        setUsername(res.data.results[0].name);
        console.log("login user detils",res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user]);
  

  console.log("login user ",username)

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Chat App</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
      
          <input
            placeholder="Search"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">message</span>
          <span className="topbarLink">UserName:-{username}</span>

        </div>
        
        <Logout />
      </div>
    </div>
  );
}