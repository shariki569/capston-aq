import React, { useContext, useEffect, useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import logo from "../../img/sepalon-icon.svg"
import { AuthContext } from '../../context/authContext';
import Dropdown from '../ui/Dropdown';
import { FaPenNib } from "react-icons/fa6";


const Nav = () => {

  const {currentUser, logout } = useContext(AuthContext);
  const catLinks = [
    {
      name: "Art",
      path: "/?cat=art"
    },
    {
      name: "Science",
      path: "/?cat=science"
    },
    {
      name: "Technology",
      path: "/?cat=technology"
    },
    {
      name: "Cinema",
      path: "/?cat=cinema"
    },
    {
      name: "Design",
      path: "/?cat=design"
    },
    {
      name: "Foods",
      path: "/?cat=foods"
    },
  ]

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className='main-link'>
          {/* main links */}
          
          <Link className="link"to="/about-us">
            <h6>About Us</h6>
          </Link>

          <Dropdown  label="Posts">
            {catLinks.map((link, index) => (
              <Link className='link' key={index} to={link.path}>
                  <h6>{link.name}</h6>
              </Link>
            ))}
          </Dropdown>
          
        </div>
  
        <div className='user-link'>
          <Link className='link' to="/dashboard">
            <span>
              {currentUser?.username}
            </span>
          </Link>
          {currentUser ? (
            <span onClick={logout}>
            Logout
            </span>
          ) : (
          <Link className="link" to="/login">
            Login
          </Link>
          )}
          {/* { currentUser && (<span className='write'>
            <Link 
              className="link" 
              to="/write">
                <FaPenNib size={20}/>
            </Link>
          </span>)} */}
        </div>
      </div>
    </div>
  )
}

export default Nav
