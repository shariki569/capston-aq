import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import logo from "../img/sepalon-icon.svg"
import { AuthContext } from '../context/authContext';


const Nav = () => {

  const {currentUser, logout } = useContext(AuthContext);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);


  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=art">
            <h6>Art</h6>
          </Link>
          <Link className='link' to="/?cat=science">
            <h6>Science</h6>
          </Link>
          <Link className='link' to="/?cat=technology">
            <h6>Technology</h6>
          </Link>
          <Link className='link' to="/?cat=cinema">
            <h6>Cinema</h6>
          </Link>
          <Link className='link' to="/?cat=design">
            <h6>Design</h6>
          </Link>
          <Link className='link' to="/?cat=food">
            <h6>Food</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
          <span onClick={logout}>Logout</span>
          ) : (
          <Link className="link" to="/login">Login</Link>
          )}
          <span className='write'>
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Nav
