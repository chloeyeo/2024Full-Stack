import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import ListItem from "./BlogComp/ListItem";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const res = await axiosInstance.get("/blog", { params: { page } }); // same as {page:page} params here will be sent as query string to back
        console.log(res);
        setBlogs(res.data.blogs);
        setTotalCnt(res.data.totalCnt);
      } catch (error) {
        console.error(error.message);
      }
    }; // function
    fetchData(page);
  }, [page]);
  return (
    <div>
      {/* both container and m-auto are from tailwind m-auto to put it in center */}
      <div className="container m-auto bg-gray-500">
        <h3>Blogs: {blogs}</h3>
        <ul>
          {blogs.map((blog, index) => {
            return (
              // <ListItem blog={blog} index={index} no={page * 7 + index + 1} />
              // for no as count backward"
              <ListItem
                blog={blog}
                index={index}
                no={totalCnt - page * 7 - index}
              />
            );
          })}
          totalCount: {totalCnt}
        </ul>
        {/* pagination */}
        <div>pager</div>
      </div>
    </div>
  );
}

export default BlogPage;
