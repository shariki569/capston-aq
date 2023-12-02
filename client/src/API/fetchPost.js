import axios from "axios"
import { useEffect, useState } from "react"



export const usefetchPost = () => {
    const [posts, setPosts] = useState([])

    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts`)
            setPosts(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData()
    })
    return { posts, fetchData }
}

export const useDeletePost = () => {
   
    const deletePost = async (postId, updatePost) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/${postId}`,
                {
                    withCredentials: true
                })
            updatePost(posts.filter((post) => post.PostId !== postId))
        } catch (err) {
            console.log(err)
        }
    }

    return{deletePost}
}