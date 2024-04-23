import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/blog");
        console.log(res);
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error(error.message);
      }
    }; // function
    fetchData();
  }, []);
  return (
    <div>
      {/* both container and m-auto are from tailwind m-auto to put it in center */}
      <div className="container m-auto bg-gray-500">
        <h3>Blogs: {blogs}</h3>
        <ul>
          {blogs.map((blog, index) => {
            return (
              <li key={`blog-${index}`}>
                Title: {blog.title}/ Author Name: {blog.user.name}/ Author
                Email: {blog.user.email}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default BlogPage;
