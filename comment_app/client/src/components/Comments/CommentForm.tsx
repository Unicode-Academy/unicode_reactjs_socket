import { useClerk, useUser } from "@clerk/clerk-react";

export default function CommentForm() {
  const auth = useUser();
  const clerk = useClerk();

  if (!auth.isLoaded) {
    return null;
  }
  console.log(auth.user);

  return (
    <div>
      {auth.isSignedIn ? (
        <h3 className="font-medium text-lg">
          Comment as {auth.user?.fullName}
          <button
            onClick={() => clerk.signOut()}
            className="text-cyan-500 ms-2"
          >
            Logout
          </button>
        </h3>
      ) : (
        <button
          onClick={() => clerk.openSignIn()}
          className="bg-cyan-500 px-3 py-1 text-white rounded-md mb-3"
        >
          Login
        </button>
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
