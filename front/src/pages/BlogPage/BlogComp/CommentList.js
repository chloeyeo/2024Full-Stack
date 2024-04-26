const CommentList = ({ comment }) => {
  return (
    <div>
      {comment.content} / By {comment.user.name}
      <button>delete</button>
    </div>
  );
};

export default CommentList;
