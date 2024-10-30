import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function Comments() {
  return (
    <div className="w-1/2 mx-auto p-5">
      <h1 className="text-3xl pb-3 font-bold">Comments</h1>
      <CommentList />
      <CommentForm />
    </div>
  );
}
