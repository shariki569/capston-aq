import React, { useState } from 'react'
import headerImage from '/upload/169761185963216975858927122220.jpg'

import ModalGallery from '../ui/ModalGallery';
const TwoSectionsWithGallery = ({ title, desc, galleries, featuredImg, inverse }) => {
    const flexDirection = inverse ? 'row-reverse' : 'row';
    const allImages = [featuredImg, ...galleries ];
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const openLightBox = (index) => {
        setIsLightBoxOpen(true);
        setCurrentIndex(index);
    }

    const closeLightBox = () => {
        setIsLightBoxOpen(false);
    }

    const handleForward = () => {
        const totalLength = allImages.length;
        const newIndex = (currentIndex + 1) % totalLength;
        setCurrentIndex(newIndex);
    }

    const handlePrevious = () => {
        const totalLength = allImages.length;
        const newIndex = (currentIndex - 1 + totalLength) % totalLength;
        setCurrentIndex(newIndex);
    }

    return (
        <>
            <div id="facility-gallery-section" className='two-sections-container h-60'>
                <div className='image-container'>
                    <div className="image-wrapper">
                        <img src={`upload/${featuredImg}`} alt="" />
                        <button className='see-more-button' onClick={() => openLightBox(0)}>See Gallery</button>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="content">
                        <h4 className='xxl-font'>{title}</h4>
                        <p>{desc}</p>
                    </div>
                </div>
                {isLightBoxOpen && (
                    <ModalGallery
                    closeModal={closeLightBox} 
                    images={allImages} 
                    handleForward={handleForward} 
                    handlePrevious={handlePrevious} 
                    currentIndex={currentIndex}
                    />
                )}

            </div>
        </>
    )
}

export default TwoSectionsWithGallery
