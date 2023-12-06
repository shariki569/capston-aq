import React, { useContext, useState } from 'react'
import { navLinks } from './Links'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiChevronUp, FiLogIn, FiLogOut } from "react-icons/fi";
import ShareButton from '../SEO/ShareButton';
import { AuthContext } from '../../context/authContext';
const MobileNav = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(new Array(navLinks.length).fill(false));
    const { currentUser, logout } = useContext(AuthContext)

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
                {/* {isOpen && ( */}
                    <div className={`menu-mobile dismiss ${isOpen ? 'animate' : ''}`} onClick={handleClose}>
                        <div className='close-button dismiss' onClick={handleClose}>X</div>
                        <div className={`mobile-links `}>
                            {currentUser &&
                                <div className='mobile-user-profile'>
                                    <div className='mobile-user-img'>
                                        {currentUser?.img ? (<img src={currentUser?.img} alt="" />) : (<img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="" />)}
                                    </div>
                                    <div className='mobile-user-name'>
                                        <p>{currentUser?.display_name ? currentUser?.display_name : currentUser?.username}</p>
                                        <span>@{currentUser?.username}</span>
                                    </div>
                                </div>
                            }
                            <div className='mobile-links-container'>

                                {navLinks.map((item, index) => (
                                    <li className='mobile-link' key={index}>
                                        <div className='mobile-link-title'>
                                            <Link to={item.path} key={index} onClick={handleClose} className='dismiss'>
                                                <span className='mobile-title' onClick={() => handleToggle(index)}>{item.title}</span>
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
                                                            <Link key={subLink.id} to={subLink.path}>
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
                            </div>
                            <div className='share-container'>
                                <div className="share-title">
                                    <h4>Share us</h4>
                                </div>
                                <ShareButton color={'#232422'} />
                            </div>
                            <div className='mobile-footer'>
                                {currentUser ?
                                    <div onClick={logout} className='mobile-logout'>
                                        <FiLogOut />
                                        <span>
                                            Logout
                                        </span>
                                    </div> :
                                    <Link to={'/login'} className='mobile-logout'>
                                        <FiLogIn />
                                        <span>
                                            Login
                                        </span>
                                    </Link>
                                }
                            </div>
                        </div>

                    </div>


                {/* )} */}
            </div>
        </div >

    )
}

export default MobileNav
