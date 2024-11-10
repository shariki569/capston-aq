import axios from "axios";
import ContactForm from "../Components/forms/ContactForm";
import Header from "../Components/ui/Header";
import headerImage from "../img/Contact-head.webp";
import React, { useEffect, useState } from "react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { useContactInfo } from "../API/fetchContact";
const Contact = () => {


  const { contactInfo } = useContactInfo();


  return (
    <div className="contact">
      <Header
        imageUrl={headerImage}
        title="Contact Us"
        pageSlug="contact-us"
        state=""
      />
      <div className="flex-container">
        <div className="contact-info">
          <div className="contact-title">
            <h1>Aqua Cainta Beach Resort</h1>
            <p>We're thrilled to connect with you! If you have any inquiries and suggestions or want to know more about Aqua Cainta Resort, here's how you can reach us:</p>
          </div>
          <div className="contact-details">
            <ul className="contact-items">
              <li className="contact-item">
                <div className="icon-wrapper">
                  <FiMapPin className="icon" size={25} />
                </div>
                <span>
                  {contactInfo?.con_address}
                </span>
              </li>
              <li className="contact-item">
                <FiPhone className="icon" size={25} />
                <span>{contactInfo?.con_telphone}</span>
                <span>/</span>
                <span>{contactInfo?.con_cellphone}</span>
              </li>
              <li className="contact-item">
                <FiMail className="icon" size={25} />
                <span>{contactInfo?.con_email}</span>
              </li>
            </ul>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
