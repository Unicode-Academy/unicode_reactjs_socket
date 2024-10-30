export default function CommentForm() {
  const isLogin = false;
  return (
    <div>
      {isLogin ? (
        <h3 className="font-medium text-lg">
          Comment as Hoàng An{" "}
          <a href="#" className="text-cyan-500">
            Logout
          </a>
        </h3>
      ) : (
        <a
          href="#"
          className="bg-cyan-500 px-3 py-1 text-white rounded-md mb-3"
        >
          Login
        </a>
      )}
      <form action="" className="mt-3">
        <textarea
          placeholder="Please comment..."
          className="border-2 w-full resize-none outline-0 rounded-md p-3"
        ></textarea>
        <button className="bg-cyan-500 px-5 py-2 rounded-md text-white float-right">
          Comment
        </button>
      </form>
    </div>
  );
}
