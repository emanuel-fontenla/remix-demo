import { Series } from "~/models/types";

export default function Card({
  children,
  src = "",
  title = "",
  stars = "",
}: Pick<Series, "src" | "title" | "stars"> & { children: React.ReactNode }) {
  return (
    <div className="-mt-14 bg-white border border-gray-200 rounded-lg shadow">
      <div className="overflow-hidden h-32 flex border-b border-gray-200 rounded-t-lg">
        <img className="object-cover h-[127px]" src={src ?? ""} alt="" />
        <div className="h-full flex flex-col justify-between p-4 leading-normal">
          <h5 className="m-0 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            ⭐ <strong>{stars}</strong>
          </p>
          <p>Seen by 14 users</p>
        </div>
      </div>
      <div className="border border-t-gray-200">{children}</div>
    </div>
  );
}
