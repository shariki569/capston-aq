import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import './starRating.scss';
const StarRating = ({ totalStars, starsSelected = 0, onRate = f => f, label, readOnly = false }) => {
    const [rating, setRating] = useState(Math.round(starsSelected));
    const [hover, setHover] = useState(0);

    return (
        <div className='star-rating'>
            {label && <label className='label'>{label}</label>}
            <div>
                {[...Array(totalStars)].map((star, i) => {
                    const ratingValue = i + 1;

                    return (
                        <span key={i}>
                            <label  >
                               {!readOnly && <input
                                    style={{ display: "none" }}
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => {
                                        setRating(ratingValue);
                                        onRate(ratingValue);
                                        console.log('StarRating value:', ratingValue);
                                    }}
                                />}
                                <FaStar
                                    className={`${readOnly ? "readonly" : "star"}`}
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    size={25}
                                    onMouseEnter={() => !readOnly && setHover(ratingValue)}
                                    onMouseLeave={() =>  !readOnly && setHover(0)}
                                />
                            </label>
                        </span>


                    );
                })}
            </div>
        </div>
    );
};

export default StarRating;