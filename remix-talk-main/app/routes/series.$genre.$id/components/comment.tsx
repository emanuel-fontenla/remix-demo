import { Review } from "~/models/types";

export default function Comment({
  username,
  comment,
}: Pick<Review, "username" | "comment">) {
  return (
    <div role="status" className="w-full p-4 rounded flex items-center">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src="https://st3.depositphotos.com/8950810/17657/v/450/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg"
          alt="Neil "
        />
        <div>
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {username}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
}
