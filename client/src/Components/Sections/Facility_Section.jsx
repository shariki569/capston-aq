import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SectionWithHeading from './SectionWithHeading';
import { Link } from 'react-router-dom';

// const facilityData = [
//     {
//         id: "551",
//         title: 'Parking Area',
//         img: 'https://res.cloudinary.com/duxm7pc8y/image/upload/v1695561524/IMG_5964_ohzx8b.webp',
//         sub: 'Worry not about parking hassles; we provide ample space for your convenience.',


//     },
//     {
//         id: "552",
//         title: 'Grilling Area',
//         img: 'https://res.cloudinary.com/duxm7pc8y/image/upload/v1695567377/GRILL_ywe464.webp',
//         sub:'Unleash your inner grill master in our well-equipped grilling area, perfect for delicious outdoor feasts.'
//     },
//     {
//         id: "553",
//         title: 'Snack Bar',
//         img: 'https://res.cloudinary.com/duxm7pc8y/image/upload/v1695568224/2ea9ccbfe43b4e399e54a77575c6a1c1_1_vkxdej.webp',
//         sub: "Treat your taste buds to a satisfying array of snacks and refreshments at our on-site snack bar. Satisfy your cravings without ever leaving the resort."


//     },
//     {
//         id: "554",
//         title: 'Event Hall',
//         img: 'https://res.cloudinary.com/duxm7pc8y/image/upload/v1695568421/IMG_6005_u2ff1d.webp',
//         sub: "Celebrate life's special moments in style at our spacious event hall. Whether it's a wedding, a conference, or a milestone celebration, our versatile space is the perfect backdrop for your event."
//     },

// ]


const Facilities = () => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/facilities');
                setFacilities(res.data)

            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);



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
                <div className='facility-items || grid-view'>
                    {facilities.map((facility) => (
                        <div className="facility-item" key={facility.Fac_Id}>

                            <div className="image-wrap-facility">
                                <img src={`/upload/${facility.Featured_Image}`} alt={facility.Fac_Title} />
                            </div>
                            <div className="title">
                                <h2>{facility.Fac_Title}</h2>
                                <div className='subtitle'>
                                    <p>{facility.Fac_Desc}</p>
                                </div>
                                    <Link to='/facilities'className='cta'><span>See More</span></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Facilities
