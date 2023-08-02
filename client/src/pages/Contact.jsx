import ContactForm from "../Components/forms/ContactForm";
import Header from "../Components/ui/Header";
import headerImage from "../img/Contact-head.webp";
import React from "react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
const Contact = () => {
  return (
    <div className="contact">
      <Header
        imageUrl={headerImage}
        title="Contact Us"
        pageSlug="contact-us"
        state=""
      />
      <div className="two-sections-container">
        <div className="contact-info">
          <div className="contact-title">
            <h1>Aqua Cainta Beach Resort</h1>
            <p>Booking for a stay? Need more information? Kindly fill out the inquiry on the side</p>
          </div>
          <div className="contact-details">
            <ul className="contact-items">
              <li className="contact-item">
                <FiMapPin className="icon" />
                <span>
                  Sitio Cainta, Barangay Pooc, City of Talisay, Cebu City,
                  Philippines
                </span>
              </li>
              <li className="contact-item">
                <FiPhone className="icon" />
                <span>(032) 266 0914 </span>
                <span>/</span>
                <span>0919 503 6715</span>
              </li>
              <li className="contact-item">
                <FiMail className="icon" />
                <span>aqua.cainta.resort@gmail.com</span>
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
