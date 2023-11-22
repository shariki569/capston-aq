import axios from 'axios';
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react'
import { FiHome, FiUser } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useAccommodations } from '../../API/fetchAccommodations';
import ScrollToTop from '../../Components/Hoc/ScrollToTop';

const Accommodation_Items = () => {
  const type = useLocation().search;
  const { accomms, fetchData } = useAccommodations(type);
  const shouldDisplayTitle = !!type;

  useEffect(() => {
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
          <div className="container">
            <div className="accommodation-title">
              <h6>{getTypeTitle(type)}</h6>
            </div>
            <div className="grid-view">
              {accomms.map((accomm) => (
                <div className="card" key={accomm.Accommodation_Id}>
                  <div className="content">
                    <img className="img" src={accomm.Accommodation_Img.startsWith('http') ? accomm.Accommodation_Img : `../../upload/${accomm.Accommodation_Img}`} alt={`${accomm.Accommodation_Title}`} />
                    <div className="description">
                      <div className="title">
                        <Link to={`/accommodation/${accomm.Accommodation_Slug}/${accomm.Accommodation_Id}`}><h2>{accomm.Accommodation_Title}</h2></Link>
                      </div>
                      <p className="price">₱ {accomm.Accommodation_Price}</p>
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
                      <div className='caption'>
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(accomm.Accommodation_Desc), }}>
                        </p>
                      </div>
                      <Link to={`/accommodation/${accomm.Accommodation_Title}/${accomm.Accommodation_Id}`}><button className="btn" type="submit">
                        View Details
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>

              ))}

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ScrollToTop(Accommodation_Items)
