import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
// import EditableText from '../util/EditableText'

const Header = ({imageUrl, title, pageSlug, state}) => {
    const {currentUser} = useContext(AuthContext)

    
 return (
    <div className='header'>
        
        <picture>
            <source srcSet={`${imageUrl}`} />
            <img className="header-background" src={`${imageUrl}`} alt="" />
        </picture>
    
        <div className='header-title'>
            <h1>{title}</h1>
            {currentUser && (
                <div className="edit">
                    <Link to={`/pages?edit=${pageSlug}`} state={state}>
                        <AiFillEdit className='icon icon-edit'/>
                    </Link>
                </div>
             )}
        </div>
    </div>
  )
}

export default Header
