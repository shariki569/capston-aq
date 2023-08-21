import axios from 'axios';
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react'
import { FiHome, FiUser } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const Accommodation_Items = () => {

  const [accomms, setAccomms] = useState([]);

  const type = useLocation().search;

  const shouldDisplayTitle = !!type;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/accommodations/${type}`);
        setAccomms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [type]);


  const getTypeTitle = (type) => {
    if (type) {
      const title = type.replace(/[?&]type=/, '');
      return title.charAt(0).toUpperCase() + title.slice(1) + 's';
    }
    return '';
  };


  return (
    <div className="accomodation">
      <div className="container-accomodation">
        <div className={`wrapper ${shouldDisplayTitle ? 'with-title' : ''}`}>
          <div className="accommodation-title">
            <h6>{getTypeTitle(type)}</h6>
          </div>
          {accomms.map((accomm) => (
            <div className="card" key={accomm.Accommodation_Id}>
              <div className="content">
                <img className="img" src={`../upload/${accomm.Accommodation_Img}`} alt="" />
                <div className="description">
                  <div className="title">
                    <h2>{accomm.Accommodation_Title}</h2>
                  </div>
                  <p className="price">₱ {accomm.Accommodation_Price}</p>
                  <p className="desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(accomm.Accommodation_Desc), }}>
                  </p>
                  <div className="accomodation-details">
                    <div className="accomodation-detail">
                      <FiUser className="icon" />
                      <label>
                        Capacity: <span>{accomm.Accommodation_Cap}</span>
                      </label>
                      <FiHome className="icon" />
                      <label>
                        Units: <span>{accomm.Accommodation_Unit}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Accommodation_Items
