import { Link } from "react-router-dom";

const ListItem = ({ no, blog, index }) => {
  console.log("blog._id:", blog._id);
  return (
    <li key={`blog-${index}`}>
      <Link to={`/blog/${blog._id}`}>
        {no}. Title: {blog.title}/ Author Name: {blog.user.name}/ Author Email:{" "}
        {blog.user.email}
      </Link>
    </li>
  );
};

export default ListItem;
