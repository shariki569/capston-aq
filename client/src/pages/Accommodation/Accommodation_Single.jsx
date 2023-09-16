import React, { useEffect, useState } from 'react'
import Header from '../../Components/ui/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DOMPurify from 'dompurify'
import { useSingleAccommData } from '../../Hooks/fetchAccommodations'
import Accom_Sidebar from './Accom_Sidebar'
import { BiLogoFacebookCircle, BiLogoInstagramAlt, BiLogoTwitter } from 'react-icons/bi'
import Accommodation_Items from './Accommodation_Items'


const Accommodation_Single = () => {

  const location = useLocation();
  const { accomm } = useSingleAccommData();


  return (
    <>
      <Header
        title={accomm?.Accommodation_Title}
        pageSlug="accommodation"
        small
        imageUrl={`/upload/${accomm?.Accommodation_Img}`}
      />
      <div className="single">
        <div className="container">
          <div className="content">
            <img src={`/upload/${accomm?.Accommodation_Img}`} alt={accomm?.Accommodation_Title} />
            <div className="wrapper">
              <div className="title">
                <h1>{accomm?.Accommodation_Title}</h1>
                <div className="social-media">
                  <div className="icons">
                    <BiLogoFacebookCircle size={25} />
                    <BiLogoTwitter size={25} />
                    <BiLogoInstagramAlt size={25} />

                  </div>
                </div>
              </div>
              <div className="description">
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(accomm?.Accommodation_Desc) }} />
              </div>
            </div>

          </div>
        </div>
        <Accom_Sidebar price={accomm?.Accommodation_Price} type={accomm?.Accommodation_Type} currentAccommodationId={accomm.Accommodation_Id} />
      </div>
    </>
  )
}

export default Accommodation_Single
