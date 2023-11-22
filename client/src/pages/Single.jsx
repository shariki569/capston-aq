import React, { useContext, useEffect, useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import 'react-icons/ai'
import { Menu } from '../Components'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import DOMPurify from 'dompurify'
import PostHeading from "../Components/PostComponents/PostHeading";
import SEO from '../Components/SEO/SEO'
import Comments from './Posts/Comments/Comments'



const Single = () => {

  const [post, setPost] = useState({});

  const location = useLocation()
  const navigate = useNavigate();


  const postSlug = location.pathname.split("/")[2]
  const postId = location.pathname.split("/")[3]
  const { currentUser } = useContext(AuthContext)


  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/${postSlug}`)
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postSlug]);


  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
    <SEO
      title={`Aqua Cainta || ${post?.PostTitle}`}
      image={post?.PostImg}
      />
      <PostHeading />
      <div className='single'>
        <div className="content">
          <img src={post?.PostImg} alt="" />
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
              <Link to={`/dashboard/posts/write?edit=${postId}`} state={post}>
                <AiFillEdit className='icon icon-edit' />
              </Link>
              <Link>
                <button onClick={handleDelete}>
                  <AiFillDelete className='icon icon-delete' />
                </button>
              </Link>
            </div>)}
          </div>
          <h1>{post.PostTitle}</h1>
          <p
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.PostDesc) }}>
          </p>
          <Comments id={postId}/>
        </div>
        <Menu cat={post.PostCat} />
      </div>
    </>
  )
}

export default Single
