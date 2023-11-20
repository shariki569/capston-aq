import React, { useState } from 'react';
import './slider.scss';
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
const Slider = ({ children }) => {
  const itemsPerSlide = 2;
  const totalSlides = Math.ceil(children.length / itemsPerSlide) || 1;


  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div className="carousel">
        <div className="carousel-container" style={{ transform: `translateX(-${currentIndex * (100 / totalSlides)}%)` }}>
          {children.map((child, index) => (
            <div key={index} className="carousel-item">
              {child}
              <span className='quote-right'><FaQuoteRight size={30} /></span>
            </div>
          ))}
        </div>
        <button className="arrow prev" onClick={handlePrev}>
          <FiChevronLeft size={50} /> Prev
        </button>
        <button className="arrow next" onClick={handleNext}>
          Next<FiChevronRight size={50} />
        </button>

        <div className="indicators">
          {Array.from({ length: totalSlides }, (_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
      </div>


    </div>

  );
};

export default Slider;
