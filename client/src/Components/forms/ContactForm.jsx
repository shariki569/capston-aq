import React, { useState } from "react";
import TextInput from "./FormFields/TextInput";
import TextArea from "./FormFields/TextArea";
import axios from "axios";
import { DotLoader } from "react-spinners";
import {
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "./FormValidation/FormValidation";
import InlineError from "./FormValidation/InlineError";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [mailError, setMailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const clearForm = () => {
    setName("");
    setNumber("");
    setEmail("");
    setMessage("");
    setNameError("");
    setPhoneError("");
    setMailError("");
    setMessageError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
     // Validate inputs
     const isEmailValid = validateEmail({email, setMailError});
     const isPhoneValid = validatePhone({phone: number, setPhoneError});
     const isNameValid = validateName({ name, setNameError }); 
     const isMessageValid = validateMessage({ message, setMessageError });
 
     if (!isEmailValid || !isPhoneValid || !isNameValid || !isMessageValid) {
       setLoading(false);
       return;
     }

   

    try {
      const formData = {
        name,
        number,
        email,
        message,
      };

      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/emailRoute/send-email`, formData);
      if (response.status === 200) {
        // Email sent successfully
        alert("Email Sent Successfully");
      } else {
        // Failed to send email
        alert("Failed to send email");
      }
    } catch (err) {
      console.error("Error occurred:", err);
    } finally {
      setLoading(false);
      clearForm();
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">Please reach out to us!</h3>

          <TextInput
            label="Name:"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            error={nameError}
          />

          <TextInput
            label="Contact No.:"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="0912 345 6789"
            maxLength="11"
            error={phoneError}
          />

          <TextInput
            label="Email:"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@123.com"
            error={mailError}
          />

          <TextArea
            label="Message:"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            rows={10}
            cols={60}
            error={messageError}
          />
        
          {loading ? (
            <button className="btn" disabled>
              Sending <DotLoader color="#36d7b7" size={15} />
            </button>
          ) : (
            <button type="submit" className="btn">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
