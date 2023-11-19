import React from 'react'
import { MoonLoader } from 'react-spinners'
import './container.scss'
const Container = ({ title, data, loading }) => {
  return (
    <div className='dashboardBox__container'>
      <h3 className='dashboardBox__title'>{title}</h3>
      <h4 className='dashboardBox__rating'>{loading ? <MoonLoader color="#03335b" size={30} /> : `${data}`}</h4>
    </div>
  )
}

export default Container
