import { useSelector } from "react-redux";

const CommentList = ({ comment, deleteComment }) => {
  const user = useSelector((state) => state.user?.userData);
  const loggedInUserId = user.id;
  const commentAuthorId = comment.user._id;
  const isCommentAuthor = loggedInUserId === commentAuthorId;
  const handleDelete = () => {
    deleteComment(comment._id);
  };
  return (
    <div>
      {comment.content} / By {comment.user.name}
      {isCommentAuthor && <button onClick={handleDelete}>delete</button>}
    </div>
  );
};

export default CommentList;
