import React from 'react'
import './notFound.scss';
import NotfoundImg from '../../img/404NotFound.png'
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className='notFound__container'>
        <h1>Error</h1>
        <div className="notFound__image">
            <img src={NotfoundImg} alt="404" />
        </div>
        <h2>Page Not Found</h2>
        <Link to='/'>Go Back</Link>
    </div>
  )
}

export default NotFound
