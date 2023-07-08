import React from 'react'
import Sidebar from '../common/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='dashboard-layout'>
      <Sidebar/>
      <div className='content-container'>
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLayout
