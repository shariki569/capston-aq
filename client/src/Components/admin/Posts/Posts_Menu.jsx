import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

const Posts_Menu = () => {
    const [posts, setPosts] = useState([]);
    const cat = useLocation().search;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts`)
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [cat])

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/${postId}`)
            setPosts(posts.filter((post) => post.PostId !== postId))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="add">
                <div className="content">
                    <span className="add-button"><Link to='/dashboard/posts/write'><FiPlusCircle size={20} />Add</Link></span>
                    <div className="card d-flex justify-center">
                        <table className='full-width'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Date Posted</th>
                                    <th>Title</th>
                                    <th>Img</th>
                                    <th>Description</th>
                                    <th>Category</th>

                                    <th>Posted By</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.PostId}>
                                        <td className='center'>{post.PostId}</td>
                                        <td  className='center' >{moment(post.date).format("YYYY-MM-DD")}</td>
                                        <td className='center'>{post.PostTitle}</td>
                                        <td className='center'>  <img src={post.PostImg} alt="" /></td>
                                        <td className='description'><p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.PostDesc) }}></p></td>
                                        <td className='center'>{post.PostCat}</td>
                                        <td className='center'>{post.username}</td>
                                        <td>
                                            <div className='crud-btn'>
                                              
                                                <Link state={post} to={`/dashboard/posts/write?edit=${post.PostId}`}><button>View</button></Link>
                                                <button onClick={() => handleDelete(post.PostId)}><FiTrash2/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Posts_Menu
