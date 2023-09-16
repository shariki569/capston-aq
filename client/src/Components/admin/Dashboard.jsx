import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'



const Dashboard = () => {

    const {currentUser} = useContext(AuthContext);

  return (
    <div className='dashboard'>
        <h1>WELCOMEE!! <span>{currentUser?.username}</span></h1>
    </div>
  )
}

export default Dashboard
