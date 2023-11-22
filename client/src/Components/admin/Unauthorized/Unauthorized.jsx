import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div>
      <h1>SORRY FOR NOW U CAN'T ACCESS THE DASHBOARD
        <br />
        You need to be authorized to access the dashboard
      </h1>
      <Link to="/">Go to homepage</Link>
    </div>
  )
}

export default Unauthorized
