import React from 'react'
import { useContactInfo } from '../../API/fetchContact'
import { FiChevronRight, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatCelNumber } from '../../Components/util/formatCelNumber';
import { useAccommodations, useRandomAccommodation } from '../../API/fetchAccommodations';


const Accom_Sidebar = ({ price, type, currentAccommodationId }) => {

    const { contactInfo } = useContactInfo();
    const formattedCelNumber = formatCelNumber(contactInfo?.con_cellphone);
    const randomAccommodation = useRandomAccommodation(type, currentAccommodationId);
    // console.log("type:", type);
    // console.log("accommodations:", accommodations);
    return (
        <>
            {/* classes are in the _SideMenu.css*/}
            <div className="side_menu">
                <div className="price_wrapper">
                    <h1 className='price'>₱ {price}<span>/Per Night</span></h1>
                </div>
                <div className="contact-info">
                    <h2>Interested?</h2>
                    <div className="icon">
                        <Link className='link' to={formattedCelNumber}><FiPhone size={50} /></Link>
                    </div>
                    <div className="wrapper">
                        <p>Call Us</p>
                        <p>{contactInfo?.con_cellphone}</p>
                    </div>
                </div>
                <div className="recommended">
                    <h2>You may also like</h2>
                    {randomAccommodation ? (
                        <div className='recommended-item'>
                            <div className='recommended-img'>
                                <img src={`/upload/${randomAccommodation.Accommodation_Img}`} alt="" />
                            </div>
                            <div className="recommended-title">
                                <Link className='link l-font' to={`/accommodation/${randomAccommodation.Accommodation_Title}/${randomAccommodation.Accommodation_Id}`}>
                                    <div>{randomAccommodation.Accommodation_Title} </div>
                                    <FiChevronRight className='link-icon' size={20} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                   
                </div>
            </div>
        </>
    )
}

export default Accom_Sidebar
