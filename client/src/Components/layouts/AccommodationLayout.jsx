import React from 'react'
import { Link, Outlet } from 'react-router-dom'


const AccommodationMenuLayout = () => {
  return (
    <div>
      <h2 className='dashboard-header'>Accommodation Menu</h2>
      <Outlet />
    </div>
  )
}

export default AccommodationMenuLayout