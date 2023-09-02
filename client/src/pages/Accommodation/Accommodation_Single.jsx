import React, { useEffect, useState } from 'react'
import Header from '../../Components/ui/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DOMPurify from 'dompurify'
import { useSingleAccommData } from '../../Hooks/fetchAccommodations'


const Accommodation_Single = () => {

  const location = useLocation();
  const {accomm} = useSingleAccommData();

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
          </div>
          <h1>{accomm?.Accommodation_Title}</h1>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(accomm?.Accommodation_Desc) }} />
        </div>
      </div>

    </>
  )
}

export default Accommodation_Single
