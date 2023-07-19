import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../img/sepalon-icon.svg"
import { AuthContext } from '../../context/authContext'
import Dropdown from '../ui/Dropdown'
import Submenu from '../ui/Submenu'
import SidebarItem from '../ui/SidebarItem'
import { HiUserCircle } from 'react-icons/hi'
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
            path: `/dashboard`,
            icon: "",
        },
        {
            title: "Posts",
            path: "/write",
        },
        {
            title: "Pages",
            path: "/pages",
            submenu: [
                {
                    title: "About Us",
                    path: "pages?edit=about-us",
                }
            ],
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
                {sidebarLinks.map((item, index) => <SidebarItem key={index} item={item}/>
                
                )}
            </div>
            <div className="bottom-section">
                <span className='side-links' onClick={handleLogout}>Logout</span>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
