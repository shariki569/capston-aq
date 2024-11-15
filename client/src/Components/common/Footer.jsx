import React, { useEffect, useState } from 'react'
import logo from "../../img/Cainta Logo.png"
import axios from 'axios';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { BiMobileAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
import ShareButton from '../admin/Media/SocialMedia/ShareButton';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/contacts');
        const contactData = res.data[0];
        setContactInfo(contactData);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, []);

  const footerLinks = [
    { title: "About Us", path: "/about-us" },
    { title: "Privacy Policy", path: "/" },
    { title: "Resort Policy", path: "/" },
    { title: "FAQs", path: "/" },
    { title: "Blog", path: "/" },
  ]

  return (
    <footer>
      <div className='footer'>
        <div className='footer-content'>
          <div className="footer-items">
            <div className="footer-title">
              <h3>ADDRESS</h3>
            </div>
            <div className="footer-description">
              <FiMapPin className="icon" size={25} />
              <p>{contactInfo?.con_address}</p>
            </div>
          </div>
          <div className="footer-items">
            <div className="footer-title">
              <h3>CONTACT US</h3>
            </div>
            <div className="footer-description">
              <ul>
                <li>
                  <FiPhone className="icon" size={25} />
                  <p>{contactInfo?.con_telphone}</p>
                </li>
                <li>
                  <BiMobileAlt className="icon" size={25} />
                  <p>{contactInfo?.con_cellphone}</p>
                </li>
              </ul>


            </div>
          </div>
          <div className="footer-items">
            <div className="footer-title">
              <h3>EMAIL US</h3>
            </div>
            <div className="footer-description">
              <FiMail className="icon" size={25} />
              <p>{contactInfo?.con_email}</p>
            </div>
          </div>
        </div>
        <div className='footer-content'>
          <div className="footer-items">
            <div className="footer-title">
              <h3>DISCOVER AQUA CAINTA RESORT</h3>
            </div>
            <div className="footer-link">
              {footerLinks.map((footlink) => (
                <Link className='sub-link' to={footlink.path}>
                  <span>
                    {footlink.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-items">
            <div className="footer-title">
              <h3>
                SHARE US
              </h3>
            </div>
            <div className="footer-description">
              <ShareButton title="Aqua Cainta Resort" url="http://localhost:5173" />
            </div>
          </div>
        </div>
        <div className='footer-content'>

        </div>
        {/* <img src={logo} alt="" />
        <span>
          Made from a Student with <b>React.js</b> from ACT
        </span> */}
      </div>

    </footer>
  )
}

export default Footer
