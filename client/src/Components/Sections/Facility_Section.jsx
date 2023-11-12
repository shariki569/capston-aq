import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SectionWithHeading from './SectionWithHeading';
import { Link } from 'react-router-dom';
import { useFacilities } from '../../API/fetchFacilities';


const Facilities = () => {

    const { facilities } = useFacilities();

    return (
        <section id='facilities' className='section-full'>
            <SectionWithHeading
                main='Facilities'
                desc="Our facilities cater to your every need. Whether you're hosting an event or seeking relaxation, we've got you covered."
                textColor="White" />,

            {/* <div className="centered-heading">
                <h2 className='m-margin-y sub-heading'>Amenities and Facilities Galore</h2>
                <p className='m-margin-y l-font'>Our amenities and facilities cater to your every need. Whether you're hosting an event or seeking relaxation, we've got you covered.</p>
            </div> */}
            <div className='facilities'>
                <div className='facility-items'>
                    {facilities.map((facility) => (
                        <div className="facility-item" key={facility.Fac_Id}>

                            <div className="image-wrap-facility">
                                <img src={facility.Featured_Image.startsWith('http') ? facility.Featured_Image : `../../upload/${facility.Featured_Image}`} alt={facility.Fac_Title} />
                            </div>
                            <div className="title">
                                <h2>{facility.Fac_Title}</h2>
                                <div className='subtitle'>
                                    <p>{facility.Fac_Desc}</p>
                                </div>
                                <Link to='/facilities' className='cta'><span>See More</span></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Facilities
