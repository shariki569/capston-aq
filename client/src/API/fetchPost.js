import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";



export const usefetchPost = (customLimit) => {
    const [posts, setPosts] = useState([])
    const cat = useLocation().search;
    const searchParams =  new URLSearchParams(location.search)
    const [totalPages, setTotalPages] = useState(0);
    const page = Number(searchParams.get('page')) || 1;
    const navigate = useNavigate();
    const limit = customLimit || 3;
    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts${cat}?page=${page}&limit=${limit}`)
            setPosts(res.data.posts)
            setTotalPages(res.data.totalPages)
        } catch (err) {
            console.log(err)
        }
    }
    const handlePrev = () => {
        if (page > 1) {
            const prevPage = page - 1
            navigate(`?page=${prevPage}`)
        } // decrement page number (for previous button to work) and navigate to new page (with updated query stringp)
    }
    const handleNext = () => {
        if (page < totalPages) {
            const nextPage = page + 1
            navigate(`?page=${nextPage}`)
        }
    }
    useEffect(() => {
        fetchData()
    }, [cat, page])
    return { posts, totalPages, fetchData, page,  handlePrev, handleNext }
}

export const useDeletePost = () => {
   
    const deletePost = async (postId, updatePost, posts) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/${postId}`,
                {
                    withCredentials: true
                })
           
        } catch (err) {
            console.log(err)
        }
    }

    return{deletePost}
}