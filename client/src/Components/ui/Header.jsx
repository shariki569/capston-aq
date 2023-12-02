import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
// import EditableText from '../util/EditableText'

const Header = ({ imageUrl, title, pageSlug, state, small }) => {
    const { currentUser } = useContext(AuthContext)
    const customContainerClass = `header ${small ? 'small' : ''}`
    const textSizeClass = small ? 'text-small' : 'text-normal';

    return (
        <div className={customContainerClass}>

            <picture>
                <source srcSet={`${imageUrl}`} />
                <img className="header-background" src={`${imageUrl}`} alt="" />
            </picture>

            <div className='header-title'>
                <h1 className={textSizeClass}>{title}</h1>
                {currentUser && (
                    <div className="edit">
                        {state && <Link to={`/dashboard/pages?edit=${pageSlug}`} state={state}>
                            <AiFillEdit className='icon icon-edit' />
                        </Link>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
