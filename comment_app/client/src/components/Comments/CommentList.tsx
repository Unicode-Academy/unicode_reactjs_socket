import moment from "moment";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080/comments");
export type Comment = {
  _id: number;
  name: string;
  content: string;
  created_at: string;
};
export default function CommentList({ comment }: { comment: Comment }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API}/api/comments`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    socket.emit("new-comment", comment);
    socket.on("fetch-comment", () => {
      getComments();
    });
    return () => {
      socket.off("fetch-comment");
    };
  }, [comment]);

  if (error) {
    return <h3>{error.message}</h3>;
  }
  return (
    <div className="my-5">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        comments.map((comment) => (
          <div className="flex border-b-2 pb-3 mb-3" key={comment._id}>
            <div className="flex-none w-2/5">
              <h3 className="font-medium text-lg">{comment.name}</h3>
              <span className="italic">
                {moment(comment.created_at).fromNow()}
              </span>
            </div>
            <div className="flex-none w-3/5">{comment.content}</div>
          </div>
        ))
      )}
    </div>
  );
}
