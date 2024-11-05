import moment from "moment";
import { useEffect, useState } from "react";
export type Comment = {
  id: number;
  name: string;
  content: string;
  created_at: string;
};
export default function CommentList() {
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
    getComments();
  }, []);
  if (error) {
    return <h3>{error.message}</h3>;
  }
  return (
    <div className="my-5">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        comments.map((comment) => (
          <div className="flex border-b-2 pb-3 mb-3" key={comment.id}>
            <div className="flex-none w-1/5">
              <h3 className="font-medium text-lg">{comment.name}</h3>
              <span className="italic">
                {moment(comment.created_at).fromNow()}
              </span>
            </div>
            <div className="flex-none w-4/5">{comment.content}</div>
          </div>
        ))
      )}
    </div>
  );
}
