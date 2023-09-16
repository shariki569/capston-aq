const validateEmail = ({ email, setMailError }) => {
  const mailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return email && !email.match(mailRegex)
  const errorMessage = !email
    ? "*Email must not be empty"
    : !email.match(mailRegex)
    ? "*Please enter a valid email"
    : "";
  setMailError(errorMessage);
  return errorMessage === "";

  // ? setMailError('Please enter a valid email')
  // : setMailError('');
};

const validatePhone = ({ phone, setPhoneError }) => {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  //   return phone && !phone.match(phoneRegex)
  // ? setPhoneError("Please enter a valid phone number")
  // : setPhoneError("");

  
  const phoneErr = !phone
    ? "*Phone must not be empty"
    : !phone.match(phoneRegex)
    ? "*Please enter a valid phone number"
    : phone.length < 11
    ? "*Phone must be 11 digits"
    : "";
  setPhoneError(phoneErr);
  return phoneErr === "";
};

const validateName = ({ name, setNameError }) => {
  const nameErr = !name
    ? "*Please enter a name"
    : name.length < 5
    ? "*Name must be at least 5 characters"
    : "";

  setNameError(nameErr);
  return nameErr === "";
};

const validateMessage = ({ message, setMessageError }) => {
  const messageErr = !message
    ? "*Please enter a message"
    : message.length < 5
    ? "*Message must be at least 10 characters"
    : "";
  setMessageError(messageErr);
  return messageErr === "";
};

export { validateEmail, validatePhone, validateName, validateMessage };
