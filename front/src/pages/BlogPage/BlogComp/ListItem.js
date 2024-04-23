import React from "react";

const ListItem = ({ no, blog, index }) => {
  return (
    <li key={`blog-${index}`}>
      {no}. Title: {blog.title}/ Author Name: {blog.user.name}/ Author Email:{" "}
      {blog.user.email}
    </li>
  );
};

export default ListItem;
