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
const Sidebar = () => {

    const {currentUser, logout } = useContext(AuthContext)
    const navigate = useNavigate(); 
    const [pageData, setPageData] = useState(null)
    const handleLogout = () => {
        logout();
        navigate('/login')
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get('/api/pages/about-us')
            setPageData(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [])

  return (
    <div className='sidebar'>
        <div className="container">
            <div className="top-section">
                <Link to="/dashboard">
                    <img src={logo} alt="" />
                </Link>
                <span>{currentUser?.username}</span>
            </div>
            <div className="mid-section">
                {sidebarLinks.map((item, index) => 
                    <SidebarItem key={index} item={item}/>
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
