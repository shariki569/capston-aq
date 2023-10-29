import React, { useEffect, useState } from 'react'
import TextInput from '../forms/FormFields/TextInput'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { formatAsCellPhoneNumber, formatAsPhoneNumber } from '../util/formatDetails';

const Contact_Info = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/contacts`);
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


  const handleSave = async () => {
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
