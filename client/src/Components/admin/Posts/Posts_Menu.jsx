import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

const Posts_Menu = () => {
    const [posts, setPosts] = useState([]);
    const cat = useLocation().search;

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/posts`)
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [cat])

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`/api/posts/${postId}`)
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
                                    <th>Title</th>
                                    <th>Img</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Date Posted</th>
                                    <th>User</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.PostId}>
                                        <td>{post.PostId}</td>
                                        <td>{post.PostTitle}</td>
                                        <td><img src={`../../upload/${post.PostImg}`} alt="" /></td>
                                        <td><p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.PostDesc) }}></p></td>
                                        <td>{post.PostCat}</td>
                                        <td>{moment(post.date).format("YYYY-MM-DD")}</td>
                                        {/* <td>{post.date}</td> */}
                                        <td>{post.username}</td>
                                        <td>
                                            <div className='crud-btn'>
                                                <button>View</button>
                                                <Link state={post} to={`/dashboard/posts/write?edit=${post.PostId}`}><button>Update</button></Link>
                                                <button onClick={() => handleDelete(post.PostId)}>Delete</button>
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
