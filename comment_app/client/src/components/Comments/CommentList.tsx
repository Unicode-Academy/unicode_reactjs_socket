import { useAuth } from "@clerk/clerk-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Paginate from "./Paginate/Paginate";
const socket = io("http://localhost:8080/comments");
export type Comment = {
  _id: number;
  name: string;
  content: string;
  created_at: string;
  canDelete: boolean;
  canEdit: boolean;
};
export default function CommentList({
  comment,
  onEdit,
}: {
  comment: Comment;
  onEdit: (id: number) => void;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);
  const { isSignedIn, getToken } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);
  const limit = import.meta.env.VITE_COMMENT_LIMIT;

  useEffect(() => {
    const getComments = async () => {
      try {
        const headers: HeadersInit = {};
        if (isSignedIn) {
          headers["Authorization"] = `Bearer ${await getToken()}`;
        }
        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_API
          }/api/comments?_limit=${limit}&_page=${page}`,
          {
            headers,
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const count = response.headers.get("x-total-count");
        const pageSize = Math.ceil(Number(count) / limit);
        setPageSize(pageSize);

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
  }, [comment, isSignedIn, getToken, page, limit]);
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn?")) {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/api/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (response.ok) {
        const comment = await response.json();
        socket.emit("new-comment", comment);
      }
    }
  };

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
            <div className="flex-none w-4/12">
              <h3 className="font-medium text-lg">{comment.name}</h3>
              <span className="italic">
                {moment(comment.created_at).fromNow()}
              </span>
            </div>
            <div className="w-full">{comment.content}</div>
            <div className="flex-none w-1/12">
              {isSignedIn && comment.canEdit && (
                <span
                  className="cursor-pointer text-blue-500 text-xs me-2"
                  onClick={() => onEdit(comment._id)}
                >
                  Sửa
                </span>
              )}
              {isSignedIn && comment.canDelete && (
                <span
                  className="cursor-pointer text-red-500 text-xs"
                  onClick={() => handleDelete(comment._id)}
                >
                  Xóa
                </span>
              )}
            </div>
          </div>
        ))
      )}
      <Paginate
        page={page}
        pageSize={pageSize}
        prev={page > 1}
        next={page < pageSize}
        onClick={(page) => {
          setPage(page);
        }}
        onClickPrev={() => page > 1 && setPage(page - 1)}
        onClickNext={() => page < pageSize && setPage(page + 1)}
      />
    </div>
  );
}
