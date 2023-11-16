import React, { useState } from 'react';
import './feedbackForm.scss';
import TextInput from '../../forms/FormFields/TextInput';
import TextArea from '../../forms/FormFields/TextArea';
import { FiCheck, FiChevronLeft, FiX } from 'react-icons/fi';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import StarRating from './StarRating/StarRating';

const FeedbackForm = ({ handleClose }) => {
    const [feedBack, setFeedBack] = useState({
        name: '',
        email: '',
        rating: '',
        message: '',
        loading: false
    });


    const onSubmit = async (e) => {
        e.preventDefault();
        setFeedBack({ ...feedBack, loading: true });
        try {
            await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback`, {
                Name: feedBack.name,
                Email: feedBack.email,
                Rating: feedBack.rating,
                Description: feedBack.message
            });
            setFeedBack({
                ...feedBack, loading: false,
                name: '',
                email: '',
                rating: '',
                message: ''
            })
            console.log('FeedbackForm feedBack:', feedBack);
        } catch (err) {
            console.log(err);
            setFeedBack({
                ...feedBack, loading: false

            })
        }

    }


    const onRate = (rating) => {
        setFeedBack({ ...feedBack, rating });
        console.log('FeedbackForm rating:', rating);
    }
    return (
        <div className='feedBackForm__container'>
            <div className='feedBackForm__header'>

                <FiChevronLeft size={20} style={{ cursor: 'pointer' }} color='#03335b' onClick={handleClose} />
                <h4>Give us a feedback</h4>
            </div>
            <div className='feedBackForm__body'>
                <TextInput
                    onChange={(e) => setFeedBack({ ...feedBack, name: e.target.value })}
                    value={feedBack.name}
                    label='Name'
                    containerClass={'feedBackForm__input'}
                />
                <TextInput
                    onChange={(e) => setFeedBack({ ...feedBack, email: e.target.value })}
                    value={feedBack.email} label='Email'
                    containerClass={'feedBackForm__input'}
                />
                {/* <TextInput onChange={(e) => setFeedBack({ ...feedBack, rating: e.target.value })} value={feedBack.rating} label='Rating' placeholder='Rate us from 1-5' containerClass={'feedBackForm__input'} /> */}
                <StarRating
                    totalStars={5}
                    starsSelected={feedBack.rating}
                    onRate={onRate}
                    label='Rating'

                />
                <TextArea onChange={(e) => setFeedBack({ ...feedBack, message: e.target.value })} value={feedBack.message} label='Feedback Message' />
                {feedBack.loading ?
                    (
                        <button disabled className={`${feedBack.loading ? 'btn btn-loading btn-small' : 'btn btn-small'}`}><MoonLoader size={20} color='#faf7f7' />Sending</button>
                    ) : (
                        <button onClick={onSubmit} className='btn btn-small'><FiCheck size={20} />Submit</button>
                    )
                }
            </div>


        </div>
    )
}

export default FeedbackForm