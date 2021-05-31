import React from 'react'
import {  useHistory } from 'react-router-dom'

function Logout() {
    const history = useHistory()
    const onHandlelogout = () => {
        localStorage.removeItem("userId")
        history.push('/')
    }
    return (
        <div>
            <button style={{background:"white",color:'black',borderRadius:'12px',cursor:'pointer'}} onClick={onHandlelogout}>Logout Account</button>
        </div>
    )
}

export default Logout
