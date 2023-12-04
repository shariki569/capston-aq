import React, { useContext, useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { FiMoreVertical } from 'react-icons/fi';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';
const CommentItems = ({ comment }) => {

    const { currentUser } = useContext(AuthContext)
    const [openOption, setOpenOption] = useState(false)
    const optionRef = useRef(null);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/comments/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

        } catch (err) {
            console.log(err)
        }
    }
    const handleClickOutside = (event) => {
        if (optionRef.current && !optionRef.current.contains(event.target)) {
            setOpenOption(false); // Close the toggleOption
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Remove event listener on cleanup
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleOption = (commentId) => {
        setOpenOption(prevOpenOptions =>
            prevOpenOptions === commentId ? false : commentId
        )
    }

    return (
        <>
            <div className="comment__items">
                {comment.map((item) => (
                    <div className="comment__item" key={item.Comment_Id}>
                        <div className="comment__header">
                            <div className="comment__avatar">
                                {item.userImg ? (<img src={item.userImg} alt="" />) : (<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />)}
                            </div>
                            <div className="comment__user">
                                <div className='flex-container flex-left'>
                                    <h3>{item.display_name ? item.display_name : item.username}</h3>
                                    {item.username === item.key &&
                                        <span className='comment__author'>Author</span>
                                    }
                                </div>
                                <span>{moment(item.Created_At).fromNow()}</span>
                            </div>

                            {currentUser.username === item.username &&
                                <div className="comment__options" onClick={() => toggleOption(item.Comment_Id)}>
                                    <FiMoreVertical />

                                    {openOption === item.Comment_Id &&
                                        <div className='comment__option' ref={optionRef}>
                                            <p onClick={() => handleDelete(item.Comment_Id)}>Delete</p>
                                        </div>
                                    }
                                </div>
                            }

                        </div>
                        <div className='comment__message'>
                            <p>
                                {item.Comment_Msg}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </>

    )
}

export default CommentItems
