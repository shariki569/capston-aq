import React, { useContext, useEffect, useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import 'react-icons/ai'
import { Menu } from '../Components'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import DOMPurify from 'dompurify'

const Single = () => {

  const [post, setPost] = useState({});

  const location = useLocation()
 const navigate = useNavigate();
  

  const postId = location.pathname.split("/")[2]

  const {currentUser} = useContext(AuthContext)

  
  const  getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`)
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  

  return (
    <div className='single'>
      <div className="content">
          <img src={`../upload/${post?.img}`} alt="" />
          <div className="user">
            {
              post.userImage && <img 
              src={post.userImage} 
              alt="" 
              />
            }
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser?.username === post?.username && (<div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
                  <AiFillEdit className='icon icon-edit'/>
              </Link>
              <Link>
                  <button onClick={handleDelete}>
                    <AiFillDelete className='icon icon-delete'/>
                  </button>
              </Link>
            </div>)}
        </div>
          <h1>{post.title}</h1>
          <p 
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.desc)}}>
          </p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single
