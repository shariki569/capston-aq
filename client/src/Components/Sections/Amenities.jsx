import React from 'react'
import SectionWithHeading from './SectionWithHeading'
import { useAmenities } from '../../API/fetchAmenities'

const Amenities = () => {

    const { amenities } = useAmenities()
    const classNamePrimary = false;
    //Style is in the _Homepage.scss
    return (
        <section className={`section-full || ${classNamePrimary ? 'bg-primary' : ''} `} >
            <SectionWithHeading
                main="Amenities"
            />
            <div className="wrapper">
                
                <div className="amenity-items || grid-view">
                    {amenities.map((amenity) => (
                        <div className="amenity-item" key={amenity.Amenity_Id}>
                            <img src={`../../upload/${amenity.Amenity_Img}`} alt="" />
                            <div className="title">
                                <h2>{amenity.Amenity_Title}</h2>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default Amenities
