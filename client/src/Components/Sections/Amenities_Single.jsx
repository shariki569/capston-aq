import React, { useState } from 'react'
import { useAmenities } from '../../API/fetchAmenities';
import Skeleton from 'react-loading-skeleton';

const Amenities_Single = () => {
    const { amenities } = useAmenities();
    return (
        <>
            <div className="amenity-accomm">
                <h1 className='xl-font '>Amenities</h1>
                <div className='accomm-amenity-items'>
                    {amenities && amenities.map((amenity) => (
                        <div className="accomm-amenity-item" key={amenity.Amenity_Id}>
                            <div className='accomm-amenity-image-wrap'>
                                <img src={amenity.Amenity_Img.startsWith('http') ? amenity.Amenity_Img : `../../upload/${amenity.Amenity_Img}`} alt="" />
                            </div>
                            <div className="accomm-amenity-title-wrap">
                                <p>
                                    {amenity.Amenity_Title  || <Skeleton/>}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Amenities_Single
