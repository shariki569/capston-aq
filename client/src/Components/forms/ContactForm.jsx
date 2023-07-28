import React, { useState } from "react";
import TextInput from "./FormFields/TextInput";
import TextArea from "./FormFields/TextArea";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const handleInputChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      number: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="form-wrapper">
      <h3 className="form-title">Please reach out to us!</h3>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name:"
            type="text"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            placeholder="Your Name"
          />
          <TextInput
            label="Contact No.:"
            type="number"
            value={formData.number}
            onChange={(value) => handleInputChange("number", value)}
            placeholder="+63 9 12 345 6789"
            max="11"
          />
          <TextInput
            label="Email:"
            type="text"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            placeholder="email@123.com"
          />
          <TextArea
            label="Message:"
            value={formData.message}
            onChange={(value) => handleInputChange("message", value)}
            placeholder="Your Message"
            rows={10}
            cols={60}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
