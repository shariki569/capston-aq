import React, { useContext } from 'react'
import moment from 'moment';
const CommentItems = ({ comment, key }) => {
 
    return (
        <>
            <div className="comment__items">
                {comment.map((item) => (
                    <div className="comment__item" key={key}>
                        <div className="comment__header">
                            <div className="comment__avatar">
                               {item.userImg ? (<img src={item.userImg} alt="" />) : (<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />)}
                            </div>
                            <div className="comment__user">
                                <h3>{item.username}</h3>
                                <span>{moment(item.Created_At).fromNow()}</span>
                            </div>

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
