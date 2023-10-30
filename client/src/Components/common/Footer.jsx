import React, { useEffect, useState } from 'react'
import logo from "../../img/Cainta Logo.png"
import axios from 'axios';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { BiMobileAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';

import { useContactInfo } from '../../API/fetchContact';
import SEO from '../SEO/SEO';
import ShareButton from '../SEO/ShareButton';


const Footer = () => {

  const { contactInfo } = useContactInfo();
  const imageUrl = 'https://aquacaintaresort.netlify.app/assets/HEADER-HOMEPAGE-7c86378c.webp'
  const footerLinks = [
    { title: "About Us", path: "/about-us" },
    { title: "Privacy Policy", path: "/" },
    { title: "Resort Policy", path: "/" },
    { title: "FAQs", path: "/" },
    { title: "Blog", path: "/" },
  ]

  return (
    <footer>
      <SEO  title='Homepage | Aqua Cainta Resort'
        description='Surrender to the Allure of Our Resort'
        name='Aqua Cainta Resort'
        type='Homepage'
        url='https://aquacaintaresort.netlify.app/'
        hashtag='#AquaCaintaResort'
        image={imageUrl}
        quote="Aqua Cainta - Surrender to the Allure of Our Resort"/>
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
              {footerLinks.map((footlink, index) => (
                <Link key={index} className='sub-link' to={footlink.path}>
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
              <ShareButton/>
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
