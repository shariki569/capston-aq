import React, { useEffect, useState } from 'react'
import Header from '../../Components/ui/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DOMPurify from 'dompurify'
import { useSingleAccommData } from '../../API/fetchAccommodations'
import Accom_Sidebar from './Accom_Sidebar'
import { BiLogoFacebookCircle, BiLogoInstagramAlt, BiLogoTwitter } from 'react-icons/bi'
import Amenities_Single from '../../Components/Sections/Amenities_Single'
//styling is in the Single.scss file

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
      <div className="single wrapper">
        <div className="container">
          <div className="content">
            <img src={`/upload/${accomm?.Accommodation_Img}`} alt={accomm?.Accommodation_Title} />
            <div className="accommodation-wrapper">
              <div className="title">
                <h1>{accomm?.Accommodation_Title}</h1>
                <div className="social-media">
                  <div className="icons">
                    <BiLogoFacebookCircle size={25} color='blue'/>
                    <BiLogoTwitter size={25} color="lightblue"/>
                    <BiLogoInstagramAlt size={25} color="pink"/>

                  </div>
                </div>
              </div>
              <div className="description">
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(accomm?.Accommodation_Desc) }} />
              </div>
            </div>
          </div>

          <Amenities_Single />
        </div>
        <Accom_Sidebar price={accomm?.Accommodation_Price} type={accomm?.Accommodation_Type} currentAccommodationId={accomm.Accommodation_Id} />
      </div>

    </>
  )
}

export default Accommodation_Single
