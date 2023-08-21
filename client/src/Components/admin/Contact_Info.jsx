import React, { useEffect, useState } from 'react'
import TextInput from '../forms/FormFields/TextInput'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Contact_Info = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/contacts');
        const contactData = res.data[0];
        setContactInfo(contactData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);



  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   if (event.target.type === 'number') {
  //     const numericValue = value.replace(/[^0-9 ()]/g, '');
  //     setContactInfo((prevInfo) => ({
  //       ...prevInfo,
  //       [name]: numericValue
  //     }));
  //   } else {
  //     setContactInfo((prevInfo) => ({
  //       ...prevInfo,
  //       [name]: value
  //     }));

  //   };

  // };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Format the value as a telephone number
    const formattedValue =
      name === 'con_telphone' ? formatAsPhoneNumber(value) :
        name === 'con_cellphone' ? formatAsCellPhoneNumber(value) : value;

    // Update the state with the formatted value
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: formattedValue
    }));
  };

  // Helper function to format as (XXX) XXX XXXX
  const formatAsPhoneNumber = (inputValue) => {
    const cleanedInput = inputValue.replace(/[^\d]/g, ''); // Remove non-numeric characters
    const match = cleanedInput.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (match.length <= 9) {
      return `(${match[1]}) ${match[2]} ${match[3]}`.trim();
    } else {
      return inputValue; // Return the input as is if it doesn't match the format
    }
  };

  const formatAsCellPhoneNumber = (inputValue) => {
    const cleanedInput = inputValue.replace(/[^\d]/g, ''); // Remove non-numeric characters
    const match = cleanedInput.match(/^(\d{0,4})(\d{0,3})(\d{0,4})$/);

    if (match.length <= 11) {
      return match[1] + ' ' + match[2] + ' ' + match[3];
    } else {
      return cleanedInput.substring(0, 11);
    }
  }


  const handleSave = async () => {
    console.log(contactInfo);
    try {
      // Make the API call to update the contact information
      await axios.put(`/api/contacts/1`, contactInfo);
      // Exit edit mode after saving
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const contactItems = [
    {
      label: 'Address',
      key: 'con_address',
      value: contactInfo?.con_address,
      type: 'text'
    },
    {
      label: 'Email',
      key: 'con_email',
      value: contactInfo?.con_email,
      type: 'text'
    },
    {
      label: 'Telephone',
      key: 'con_telphone',
      value: contactInfo?.con_telphone,
      type: 'text'
    },
    {
      label: 'Cellphone',
      key: 'con_cellphone',
      value: contactInfo?.con_cellphone,
      type: 'text',
    },
    // Add other items here
  ];

  return (
    <div className='add'>
      <div className='content'>
        <h2 className='dashboard-header'>Contact Information</h2>

        <div className="contact-details">
          <ul className='contact-items'>
            {contactItems.map((item, index) => (
              <li key={item.key} className='flex-column-left'>
                <span className='sm-font'>{item.label}</span>
                <div className='contact-info || full-width s-margin-y'>
                  {editMode ? (
                    <TextInput
                      type={item.type}
                      name={item.key}
                      value={contactInfo[item.key] || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className='l-font  main-bold'>{item.value}</span>
                  )}

                  {/* {editMode ?
                    (
                      <>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={toggleEditMode}>Cancel</button>
                      </>
                      
                    ) : (
                      <button onClick={toggleEditMode}>Edit</button>
                    )} */}
                </div>

              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status</b> Draft
          </span>
          <span>
            <b>Visibility</b> Public
          </span>

          {/* <label className="file" htmlFor="file" encType="multipart/form-data">Upload Image</label> */}
          {editMode ? (
            <div className="buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={toggleEditMode}>Cancel</button>
            </div>

          ) : (
            <div className="buttons">
              <button onClick={toggleEditMode}>Edit</button>
              
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact_Info
