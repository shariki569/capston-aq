import React from 'react'
import { Outlet } from 'react-router-dom'

const AmenitiesLayout = () => {
  return (
    <>
         <h2 className='dashboard-header'>Resort Amenities</h2>
         <Outlet/>
    </>
  )
}

export default AmenitiesLayout
