import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/Cainta Logo.png";
import { AuthContext } from "../../context/authContext";
import { accommType, catLinks } from "../common/MenuItems";
import Dropdown from "../ui/Dropdown";
import { FaPenNib, FaS } from "react-icons/fa6";
import MobileNav from "./MobileNav";
import { navLinks } from "./Links";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const location = useLocation();


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

        </div>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Nav;
