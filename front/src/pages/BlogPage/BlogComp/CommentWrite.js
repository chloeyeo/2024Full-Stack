import { useState } from "react";
const CommentWrite = ({ onSubmit }) => {
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    // form deals with enter as well
    e.preventDefault(); // to prevent page reload
    onSubmit(comment);
    setComment("");
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };
  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInputChange}
          className="border p-2 w-[250px] mr-1 rounded-md"
          placeholder="type comment"
          value={comment}
        />
        <button
          type="submit"
          className="border p-2 rounded-md bg-slate-400 text-white"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentWrite;
