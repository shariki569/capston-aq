import React, { useState } from 'react'
import { navLinks } from './Links'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ShareButton from '../SEO/ShareButton';
const MobileNav = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(new Array(navLinks.length).fill(false));
    const handeClick = e => {
        setIsOpen(true)
    }
    const handleToggle = (index) => {
        setShowDropdown((prevShowDropdown) => {
            const updatedDropdown = [...prevShowDropdown];
            updatedDropdown[index] = !updatedDropdown[index];
            return updatedDropdown;
        });
    };

    const handleClose = (e) => {
        if (e.target.classList.contains('dismiss')) {
            setIsOpen()
        }
    }

    // const handleClose = e => {
    //     setIsOpen()
    // }

    return (
        <div className='mobile-nav-container'>
            <div className='mobile-nav' >
                <div className="burger-icon" onClick={handeClick}>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>

                </div>
                {isOpen && (
                    <div className={`menu-mobile dismiss ${isOpen ? 'animate' : ''}`} onClick={handleClose}>
                        <div className='close-button dismiss' onClick={handleClose}>X</div>
                        <div className='mobile-links'>
                            {navLinks.map((item, index) => (
                                <li className='mobile-link' key={index}>
                                    <div className='mobile-link-title'>
                                        <Link to={item.path} key={index}>
                                            <span className='mobile-title'>{item.title}</span>
                                        </Link>
                                        {item.children &&
                                            (<span className='mobile-toggle' onClick={() => handleToggle(index)}>
                                                {showDropdown[index] ? <FiChevronDown size={25} /> : <FiChevronUp size={25} />}
                                            </span>)
                                        }
                                    </div>

                                    {item.children && (
                                        <div className='mobile-sublinks-container'>
                                            {showDropdown[index] && (
                                                <ul className='mobile-sublinks'>
                                                    {item.children.map((subLink) => (
                                                        <Link key={subLink.id}>
                                                            <li className='mobile-sublink'>
                                                                {subLink.name}
                                                            </li>
                                                        </Link>
                                                    ))}
                                                </ul>)
                                            }
                                        </div>
                                    )}

                                </li>

                            ))}
                            <div className='share-container'>
                                <div className="share-title">
                                    <h4>Share us</h4>
                                </div>
                                <ShareButton />
                            </div>
                        </div>

                    </div>


                )}
            </div>
        </div >

    )
}

export default MobileNav
