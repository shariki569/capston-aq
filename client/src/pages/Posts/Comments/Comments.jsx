import React, { useContext, useEffect, useState } from 'react'

import './comments.scss'
import { FiSend } from 'react-icons/fi'
import CommentItems from './CommentItems'
import TextArea from '../../../Components/forms/FormFields/TextArea'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../../../context/authContext'
import { Link } from 'react-router-dom'

const Comments = () => {
  const [comments, setComments] = useState('')
  const [getComments, setGetComments] = useState([])
  const [numComments, setNumComments] = useState(0);
  // const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const postId = location.pathname.split('/')[3]
  const handleComment = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/comments`, {
        comment: comments,
        postId: postId,
        comment_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      setNumComments(numComments + 1);
    } catch (err) {
      console.log(err)
      setLoading(false)
    } finally {
      setLoading(false)
      setComments('')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/comments/${postId}`)
        setGetComments(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [postId, numComments])

  return (
    <div className='comments__container'>
      <div className="comments__title">
        <h3>Comments</h3>
      </div>
      {currentUser ? <div className="comments__wrapper">
        <div className='comments__form'>
          <TextArea value={comments} onChange={(e) => setComments(e.target.value)} placeholder='Write a comment' />
        </div>
        <div className='comments__btn'>
          {loading ? <button className='btn btn-loading' disabled={true}>Sending...</button> : <button onClick={handleComment} className='btn'>Send</button>}
        </div>
      </div> :
        <div>
          <h3><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link> to comment</h3>
        </div>
      }

      <CommentItems comment={getComments} key={getComments.Comment_Id} />

    </div>
  )
}

export default Comments
