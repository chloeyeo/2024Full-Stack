import { useParams, useState, useEffect } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import styled from "styled-components";
import CommentWrite from "./BlogComp/CommentWrite";
import { useSelector } from "react-redux";
import CommentList from "./BlogComp/CommentList";

const TitleWrap = styled.h2`
  font-size: 10px;
  font-weight: bold;
  padding: 5 16px;
  background-color: skyblue;
  display: inline-block;
  border-radius: 5px;
  color: white;
`;

const BlogViewPage = () => {
  const { blogId } = useParams(); // /blog/:blogId from route path in app js
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const userData = useSelector((state) => state.user?.userData);
  //   const [loading, setLoading] = useState(false);
  // cannot put async to useEffect so must create async function
  // then put that async function inside useEffect
  useEffect(() => {
    async function loadBlog() {
      try {
        // set loading to true
        const response = await axiosInstance.get(`/blog/${blogId}`);
        setBlog(response.data);
        // set loading to false
      } catch (error) {
        console.error(error.mesage);
      }
    }
    loadBlog();
  }, []);
  useEffect(() => {
    async function loadComments() {
      try {
        const response = await axiosInstance.get(`/blog/${blogId}/comment`);
        setComments(response.data.comment);
      } catch (error) {
        console.error(error.mesage);
      }
    }
    loadComments();
  }, []);
  const handleInsertComment = async (comment) => {
    alert(comment);
    const commentData = {
      content: comment,
      userId: userData.user.id,
    };
    console.log(commentData);
    try {
      const res = axiosInstance.post(`/blog/${blogId}/comment`, commentData); // second arg is request body
      console.log(res.data);
    } catch (error) {}
  };
  console.log("blogId from params:", blogId);
  if (!blog) return null; // first blog = null so it returns null
  return (
    <div className="container m-auto p-4">
      <h3>Blog Content</h3>
      <h4>Title: {blog.title}</h4>
      <hr className="my-4" />
      <p>Content: {blog.content}</p>
      <TitleWrap>Comment</TitleWrap>
      <h4>Write comment</h4>
      <CommentWrite onSubmit={handleInsertComment} />
      {comments.length === 0 ? (
        <p>No comment</p>
      ) : (
        comments.map((comment, index) => {
          return <CommentList key={`comment-${index}`} comment={comment} />;
        })
      )}
    </div>
  );
};

export default BlogViewPage;