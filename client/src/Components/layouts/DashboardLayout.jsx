import React from 'react'
import Sidebar from '../common/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import AdminNav from '../common/AdminNav/AdminNav'

const DashboardLayout = () => {
  return (
    <div className='dashboard-layout'>
      <Sidebar />
      <div className='dashboard-container'>
        <div className="nav-container">
          <AdminNav />
        </div>
        <div className='content-container'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
