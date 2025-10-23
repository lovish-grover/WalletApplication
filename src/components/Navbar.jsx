import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar({data}) {
  const islogedin = () => {
      if (localStorage.getItem('custId') != null) {
            return true;
      }else{
        return false;
      }
    };

    const logout = () => {
      localStorage.removeItem('custId');
      window.location.reload();
    }
  return (
    <nav className="navbar">
        <Link to={"/"} href="#" className="logo">Digi Wallet</Link>
        <div className="nav-links">
            <Link to={"/"} className="nav-link">Home</Link>
            
            {islogedin() ? 
            (<><Link to={"/documents"} className="nav-link">Document</Link>
            <button onClick={logout} className="nav-link">Logout</button></>) : 
            (
            <><Link to={"/login"} className="nav-link">Login</Link>
            <Link to={"/signup"} className="nav-link">SignUp</Link></>
            )
            }
        </div>
    </nav>
  );
}
