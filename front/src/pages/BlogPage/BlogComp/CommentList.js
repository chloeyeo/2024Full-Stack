const CommentList = ({ comment, deleteComment }) => {
  const handleDelete = () => {
    deleteComment(comment._id);
  };
  return (
    <div>
      {comment.content} / By {comment.user.name}
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default CommentList;
