import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
const PostPage = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await axios.get("http://localhost:3000/api/post/get-posts");
      setPost(res.data.posts);
    })();
  }, []);

  return (
    <section className="bg-gray-900 w-[460px] overflow-auto">
      <div className="flex flex-col gap-2.5 px-3 py-3 ">
        {post.map((ele) => {
          return <PostCard data={ele} />;
        })}
      </div>
    </section>
  );
};

export default PostPage;
