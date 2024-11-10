import { useAuth } from "@clerk/clerk-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080/comments");
export type Comment = {
  _id: number;
  name: string;
  content: string;
  created_at: string;
  canDelete: boolean;
};
export default function CommentList({ comment }: { comment: Comment }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const getComments = async () => {
      try {
        const headers: HeadersInit = {};
        if (isSignedIn) {
          headers["Authorization"] = `Bearer ${await getToken()}`;
        }
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API}/api/comments`,
          {
            headers,
          }
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
  }, [comment, isSignedIn, getToken]);

  if (error) {
    return <h3>{error.message}</h3>;
  }
  return (
    <div className="my-5">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        comments.map((comment) => (
          <div
            className="flex border-b-2 pb-3 mb-3 justify-between"
            key={comment._id}
          >
            <div className="flex-none">
              <h3 className="font-medium text-lg">{comment.name}</h3>
              <span className="italic">
                {moment(comment.created_at).fromNow()}
              </span>
            </div>
            <div className="flex-none">{comment.content}</div>
            <div className="flex-none">
              {isSignedIn && comment.canDelete && (
                <span className="cursor-pointer text-red-500 text-xs">Xóa</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
