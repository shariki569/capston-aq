import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../../img/Cainta Logo.png"
import { AuthContext } from '../../../context/authContext'
import Dropdown from '../../ui/Dropdown'
import Submenu from '../../ui/Submenu'
import SidebarItem from './SidebarItem'
import { HiUserCircle } from 'react-icons/hi'
import { sidebarLinks } from '../MenuItems'
import axios from 'axios'
import { FiHome } from 'react-icons/fi'
const Sidebar = () => {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    return (
        <div className='sidebar'>
            <div className="container">
                <div className="top-section">
                    <div className="logo">
                        <Link to="/dashboard">
                            <img src={logo} alt="" />
                        </Link>
                        <Link to="/dashboard">
                            <h3>Aqua Cainta Dashboard</h3>
                        </Link>
                    </div>
                    <Link className='home-link' to="/"><FiHome /> Go to Homepage</Link>
                </div>
                <div className="mid-section">
                    {sidebarLinks.map((item, index) =>
                        <SidebarItem key={index} item={item} icon={item.icon} />
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
