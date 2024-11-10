import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList, { Comment } from "./CommentList";
import { useAuth } from "@clerk/clerk-react";

export default function Comments() {
  const [comment, setComment] = useState({} as Comment);
  const [commentEdit, setCommentEdit] = useState({} as Comment);
  const { getToken } = useAuth();
  const handleCommentCreated = (comment: Comment) => {
    setComment(comment);
  };
  const handleEditComment = async (id: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}/api/comments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    const data = await response.json();
    setCommentEdit(data);
  };
  return (
    <div className="w-1/2 mx-auto p-5">
      <h1 className="text-3xl pb-3 font-bold">Comments</h1>
      <CommentList comment={comment} onEdit={handleEditComment} />
      <CommentForm commentEdit={commentEdit} onCreated={handleCommentCreated} />
    </div>
  );
}
