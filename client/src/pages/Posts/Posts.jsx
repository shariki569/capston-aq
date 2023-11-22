import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/ui/Header";
import Skeleton from "react-loading-skeleton";
import PostHeading from "../../Components/PostComponents/PostHeading";
import PostItems from "./PostItems";
import ScrollToTop from "../../Components/Hoc/ScrollToTop";
const Posts = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="posts">
      <PostHeading />
      <div className="post__container">
        <div className="left">
          <PostItems posts={posts} />
        </div>
        <div className=" right">
          <div>
            <h4>Other Posts you may like</h4>
            {/* <PostItems posts={posts} /> */}
          </div>
        </div>
      </div>


    </div>
  );
};

export default ScrollToTop(Posts);
