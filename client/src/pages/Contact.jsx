import ContactForm from "../Components/forms/ContactForm";
import Header from "../Components/ui/Header";
import headerImage from "../img/Contact-head.webp";
import React from "react";

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
        <div className="">
          <h1>HELLO waddap</h1>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
