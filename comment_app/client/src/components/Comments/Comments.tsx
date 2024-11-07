import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList, { Comment } from "./CommentList";

export default function Comments() {
  const [comment, setComment] = useState({} as Comment);
  const handleCommentCreated = (comment: Comment) => {
    setComment(comment);
  };
  return (
    <div className="w-1/2 mx-auto p-5">
      <h1 className="text-3xl pb-3 font-bold">Comments</h1>
      <CommentList comment={comment} />
      <CommentForm onCreated={handleCommentCreated} />
    </div>
  );
}
