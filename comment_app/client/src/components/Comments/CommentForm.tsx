import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Comment } from "./CommentList";
export default function CommentForm({
  onCreated,
  commentEdit,
}: {
  onCreated: (comment: Comment) => void;
  commentEdit: Comment;
}) {
  const [comment, setComment] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [commentId, setCommentId] = useState<number>(0);
  const auth = useUser();

  const clerk = useClerk();

  const { getToken } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}/api/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          content: comment,
        }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setComment("");
      onCreated(data);
    } else {
      setMessage(data.message);
    }
  };
  const handleCancelEdit = () => {
    setComment("");
    setCommentId(0);
  };
  useEffect(() => {
    if (commentEdit.content) {
      setComment(commentEdit.content);
      setCommentId(commentEdit._id);
    }
  }, [commentEdit]);

  if (!auth.isLoaded) {
    return null;
  }
  return (
    <div>
      {auth.isSignedIn ? (
        <>
          <h3 className="font-medium text-lg">
            Comment as {auth.user?.fullName}
            <button
              onClick={() => clerk.signOut()}
              className="text-cyan-500 ms-2"
            >
              Logout
            </button>
          </h3>
          <form action="" className="mt-3" onSubmit={handleSubmit}>
            <textarea
              placeholder="Please comment..."
              className="border-2 w-full resize-none outline-0 rounded-md p-3"
              value={comment}
              onChange={handleChange}
            ></textarea>
            {message && <span className="text-red-500">{message}</span>}
            {commentId ? (
              <span
                className="text-red-500 cursor-pointer"
                onClick={handleCancelEdit}
              >
                Cancel
              </span>
            ) : (
              ""
            )}
            <button className="bg-cyan-500 px-5 py-2 rounded-md text-white float-right">
              {commentId ? "Update" : "Comment"}
            </button>
          </form>
        </>
      ) : (
        <button
          onClick={() => clerk.openSignIn()}
          className="bg-cyan-500 px-3 py-1 text-white rounded-md mb-3"
        >
          Login to comment
        </button>
      )}
    </div>
  );
}
