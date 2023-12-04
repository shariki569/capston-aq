import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/Cainta Logo.png";
import { AuthContext } from "../../context/authContext";
import { accommType, catLinks } from "../common/MenuItems";
import Dropdown from "../ui/Dropdown";
import { FaPenNib, FaS } from "react-icons/fa6";
import MobileNav from "./MobileNav";
import { navLinks } from "./Links";
import './AdminNav/adminNav.scss';
import { FiGrid, FiLogOut, FiUser, FiUsers } from "react-icons/fi";
import Modal from "../ui/Modal/Modal";
import Profile from "../admin/Profile/Profile";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const location = useLocation();
  const handleClick = () => {
    setShowDropdown(!showDropdown)
  }


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openProfile = (e) => {
    setShowProfile(!showProfile)
  }
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <ul className="main-link">
          {navLinks.map((items, index) => (
            <li className="link-item" key={index}>
              <Link className="link" to={items.path}>
                <h6 className={location.pathname === items.path ? "active" : ""}>{items.title}</h6>
              </Link>
              {items.children &&
                (<Dropdown>
                  {items.children.map((subLink) => (
                    <Link key={subLink.id} className="sub-link" to={subLink.path}>
                      <li >
                        {subLink.name}
                      </li>
                    </Link>
                  ))}
                </Dropdown>
                )}
            </li>
          ))}
        </ul>
        <div className="user-link">
          {/* <Link className="main-link-item " to="/dashboard">
            <span>{currentUser?.username}</span>
          </Link>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )} */}

          {currentUser ? <div className="admin__nav__user">
            <div onClick={handleClick} className="admin__nav__imageWrap">
              {currentUser?.img ? (<img src={currentUser?.img} alt="" />) : (<img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="" />)}
            </div>
            <div className={showDropdown ? 'admin__nav__dropdown active homepage__nav' : 'admin__nav__dropdown'}>
              <p className='admin__nav__display__name'>{currentUser?.display_name ? currentUser?.display_name : currentUser?.username}</p>
              <p className='admin__nav__username'>({currentUser?.username})</p>
              <ul>
                {currentUser?.Role_Name !== 'User'  && <Link onClick={handleClick} className='admin__nav__link' to='/dashboard'><li><FiGrid />Dashboard</li></Link>}
                {currentUser.Role_Name === 'Admin' || currentUser.Role_Name === 'Staff' ?
                  (<Link onClick={handleClick} className='admin__nav__link' to='/dashboard/profile'><li><FiUsers />Profile</li></Link>

                  ) : (<Link onClick={openProfile} className='admin__nav__link'><li><FiUsers />Profile</li></Link>)
                }

                <li onClick={logout}><FiLogOut />Logout</li>
              </ul>
            </div>

          </div> : (
            <Link className="link" to="/login">Login</Link>
          )}

        </div>
        <MobileNav />
      </div>
      {showProfile &&
        <Modal closeModal={openProfile}>
          <Profile />
        </Modal>
      }
    </nav>
  );
};

export default Nav;
