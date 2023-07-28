import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/sepalon-icon.svg";
import { AuthContext } from "../../context/authContext";
import { catLinks } from "../common/MenuItems";
import Dropdown from "../ui/Dropdown";
import { FaPenNib, FaS } from "react-icons/fa6";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  const [dropdownVisible, setisVisible] = useState(false);

  const onMouseEnter = () => {
    setisVisible(true);
  };

  const onMouseLeave = () => {
    setisVisible(false);
  };
  // const catLinks = [
  //   {
  //     name: "Art",
  //     path: "posts/?cat=art",
  //   },
  //   {
  //     name: "Science",
  //     path: "posts/?cat=science",
  //   },
  //   {
  //     name: "Technology",
  //     path: "posts/?cat=technology",
  //   },
  //   {
  //     name: "Cinema",
  //     path: "posts/?cat=cinema",
  //   },
  //   {
  //     name: "Design",
  //     path: "posts/?cat=design",
  //   },
  //   {
  //     name: "Foods",
  //     path: "posts/?cat=foods",
  //   },
  // ];

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
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <ul className="main-link">
          <li>
            <Link className="link" to="/about-us">
              <h6>About Us</h6>
            </Link>
          </li>

          <li 
          onMouseEnter={onMouseEnter} 
          onMouseLeave={onMouseLeave}
          >
            <Link className="link" to="/posts">
              <h6>Posts</h6>
            </Link>
            {dropdownVisible && (
              <Dropdown>
                {catLinks.map((link, index) => (
                  <Link to={link.path} key={index} className="submenu">
                    <h2>{link.name}</h2>
                  </Link>
                ))}
              </Dropdown>
            )}
          </li>

          {/* <Dropdown
            label={
              <Link className="link" to="/posts">
                Posts
              </Link>
            }
          >
            {catLinks.map((link, index) => (
              <Link className="submenu" key={index} to={link.path}>
                <h2>{link.name}</h2>
              </Link>
            ))}
          </Dropdown> */}
          <li>
            <Link className="link" to="/contact-us">
              <h6>Contact Us</h6>
            </Link>
          </li>
        </ul>

        <div className="user-link">
          <Link className="link" to="/dashboard">
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
