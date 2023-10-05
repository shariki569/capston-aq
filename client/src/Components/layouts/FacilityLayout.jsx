import React from 'react'
import { Outlet } from 'react-router-dom'

const FacilityLayout = () => {
  return (
    <div>
        <h2 className="dashboard-header">Facilities</h2>
      <Outlet/>
    </div>
  )
}

export default FacilityLayout
