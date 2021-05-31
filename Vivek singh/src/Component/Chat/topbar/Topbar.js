import "./topbar.css";

import { Link } from "react-router-dom";
import Logout from '../../logout/logout'

export default function Topbar() {

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

        </div>
        
        <Logout />
      </div>
    </div>
  );
}