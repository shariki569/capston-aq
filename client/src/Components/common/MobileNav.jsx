import React, { useState } from 'react'
import { navLinks } from './Links'
import { Link } from 'react-router-dom'

const MobileNav = () => {

    const [isOpen, setIsOpen] = useState(false)

    const handeClick = e => {
        setIsOpen(true)
    }

    const handleClose = e => {
        setIsOpen()
    }

    return (
        <div className='mobile-nav-container'>
            <div className='mobile-nav' >
                <div className="burger-icon" onClick={handeClick}>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>

                </div>
                {isOpen && (
                    <div className={`menu-mobile ${isOpen ? 'animate' : ''}`}>
                        <div className='close-button' onClick={handleClose}>X</div>
                        <div className='mobile-links'>
                            {navLinks.map((item, index) => (
                                <Link to={item.path} key={index}>
                                    <li className='mobile-link'>
                                        {item.title}
                                        {item.children && (
                                            <ul className='mobile-sublinks'>
                                                {item.children.map((subLink) => (
                                                    <Link key={subLink.id}>
                                                        <li className='mobile-sublink'>
                                                            {subLink.name}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default MobileNav
