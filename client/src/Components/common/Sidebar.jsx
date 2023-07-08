import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../img/sepalon-icon.svg"
import { AuthContext } from '../../context/authContext'
import Dropdown from '../ui/Dropdown'
const Sidebar = () => {

    const {currentUser, logout } = useContext(AuthContext)
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout();
        navigate('/login')
    }
    const sidebarLinks = [
        {
            title: "User",
            path: "/dashboard",
        },
        {
            title: "Posts",
            path: "/add-posts",
        },
        {
            title: "Pages",
            path: "/edit-pages",
        },
    ]


  return (
    <div className='sidebar'>
        <div className="container">
            <div className="top-section">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
                <span>{currentUser?.username}</span>
            </div>
            <div className="mid-section">
                {sidebarLinks.map((links, index) => (
                    <Link className='side-links' key={index} to={links.path}>
                        {links.title}
                    </Link>
                ))}
            </div>
            <div className="bottom-section">
                <span className='side-links' onClick={handleLogout}>Logout</span>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
