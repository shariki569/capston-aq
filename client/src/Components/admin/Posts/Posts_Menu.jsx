import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { FiAlertCircle, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDeletePost, usefetchPost } from '../../../API/fetchPost';
import { toast } from 'sonner';
import Modal from '../../ui/Modal/Modal';
import { AuthContext } from '../../../context/authContext';
import Pagination from '../../ui/Pagination/Pagination';

const Posts_Menu = () => {
    // const [posts, setPosts] = useState([]);
    const { posts, fetchData, page, totalPages, handleNext, handlePrev } = usefetchPost(10);
    const { deletePost } = useDeletePost();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const { currentUser } = useContext(AuthContext);
  
    const handleDelete = async () => {
        try {
            if (selectedPost && selectedPost.PostId) {
                await deletePost(selectedPost.PostId);
                toast.error(`Post ${selectedPost.PostTitle} has been deleted`);
            } else {
                toast.error('Invalid post data');
            }
            setOpenDialog(false);
        } catch (err) {
            console.log(err)
            toast.error('Error deleting post');
        } finally {
            fetchData();

        }
    }

    // const handlePrev = () => {
    //     if (page > 1) {
    //         const prevPage = page - 1
    //         navigate(`?page=${prevPage}`)
    //     } // decrement page number (for previous button to work) and navigate to new page (with updated query stringp)
    // }
    // const handleNext = () => {
    //     if (page < totalPages) {
    //         const nextPage = page + 1
    //         navigate(`?page=${nextPage}`)
    //     }
    // }

    const handleDialog = () => {
        handleSelection(null, setOpenDialog);
    }

    const handleSelection = (postId) => {
        if (postId) {
            const selectedPost = posts.find((post) => post.PostId === postId);
            setSelectedPost(selectedPost);
        } else {
            setSelectedPost(null);
        }
        setOpenDialog(!openDialog);
    }

    return (
        <>
            <div className="add">
                <div className="content">
                    <span className="add-button"><Link to='/dashboard/posts/write'><FiPlusCircle size={20} />Add</Link></span>
                    <div className="card justify-center">
                        <table className='full-width'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Date Posted</th>
                                    <th>Img</th>
                                    <th>Title</th>
                                    {/* <th>Description</th> */}
                                    <th>Category</th>
                                    <th>Posted By</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.filter((post) => post.username === currentUser.username)
                                    .map((post) => (

                                        <tr key={post.PostId}>
                                            <td className='center'>{post.PostId}</td>
                                            <td className='center' >{moment(post.date).format("YYYY-MM-DD")}</td>
                                            <td className='center'>  <img src={post.PostImg} alt="" /></td>
                                            <td ><p className='ellipse'>{post.PostTitle}</p></td>
                                            {/* <td className='description'><p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.PostDesc) }}></p></td> */}
                                            <td className='center'>{post.PostCat}</td>
                                            <td className='center'>{post.username}</td>
                                            <td>
                                                <div className='crud-btn'>

                                                    <Link state={post} to={`/dashboard/posts/write?edit=${post.PostId}`}><button>Edit</button></Link>
                                                    <button onClick={() => handleSelection(post.PostId)}><FiTrash2 /></button>
                                                </div>
                                            </td>
                                        </tr>

                                    ))}
                            </tbody>

                        </table>
                        <Pagination page={page} totalPages={totalPages} next={handleNext} prev={handlePrev} />
                    </div>

                </div>
                {openDialog && <Modal
                    dialogMsg={`Are you sure you want to delete?`}
                    closeModal={handleDialog}
                    handleAction={handleDelete}
                    symbol={<FiAlertCircle size={30} color='red' />}
                >
                    <h2 className='confirm-msg'>
                        {selectedPost?.PostTitle}
                    </h2>
                    <div className='group-btn'>
                        <span className={`btn btn-small btn-right ${selectedPost?.PostId ? '' : 'disabled'}`} onClick={() => handleDelete(selectedPost?.PostId)}>Yes</span>
                        <span className='btn btn-err btn-small' onClick={handleDialog}>No</span>
                    </div>
                </Modal>}
            </div>
        </>
    )
}

export default Posts_Menu
