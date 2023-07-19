import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="posts">
      <div className="post-items">
        {posts.map((post) => (
          <div className="post" key={post.PostId}>
            <div className="img">
              <img src={`../upload/${post.PostImg}`} alt="" />
            </div>
            <div className="content">
              <Link to={`/post/${post.PostId}`}>
                <h1>{post.PostTitle}</h1>
              </Link>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.PostDesc),
                }}
              ></p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
