import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/sepalon-icon.svg";
import { AuthContext } from "../../context/authContext";
import { accommType, catLinks } from "../common/MenuItems";
import Dropdown from "../ui/Dropdown";
import { FaPenNib, FaS } from "react-icons/fa6";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

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

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <ul className="main-link">
          <li className="link-item">
            <Link className="link" to="/about-us">
              <h6>About Us</h6>
            </Link>
          </li>

          <li className="link-item">
            <Link className="link" to="/posts">
              <h6>Posts</h6>
            </Link>
            <Dropdown>
              {catLinks.map((items) => (
                <Link key={items.id} className="sub-link" to={items.path}>
                  <li >
                    {items.name}
                  </li>
                </Link>
              ))}
            </Dropdown>
          </li>

          <li className="link-item">
            <Link className="link" to="/contact-us">
              <h6>Contact Us</h6>
            </Link>
          </li>
          <li className="link-item">
            <Link className="link" to="/accommodations">
              <h6>Accommodation</h6>
            </Link>
            <Dropdown>
              {accommType.map((items) => (

                <Link key={items.id} className="sub-link" to={items.path}>
                  <li >
                    {items.name}
                  </li>
                </Link>
              ))}
            </Dropdown>
          </li>
        </ul>

        <div className="user-link">
          <Link className="main-link-item " to="/dashboard">
            <span>{currentUser?.username}</span>
          </Link>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          {/* { currentUser && (<span className='write'>
            <Link 
              className="link" 
              to="/write">
                <FaPenNib size={20}/>
            </Link>
          </span>)} */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
