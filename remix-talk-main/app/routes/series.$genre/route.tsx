import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Outlet,
  json,
  useFetcher,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import getSeriesByGenre from "./handlers/get-series-by-genre.server";
import deleteSeriesById from "./handlers/delete-series-by-id.server";
import capitalizeString from "~/utils/capitalize";

export async function loader({ params }: LoaderFunctionArgs) {
  const series = await getSeriesByGenre(params.genre);
  return json({ series });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const seriesId = formData.get("delete");
  typeof seriesId === "string" && (await deleteSeriesById(seriesId));
  return null;
}

export default function Genre() {
  const { series } = useLoaderData<typeof loader>();
  const { genre } = useParams();
  const fetcher = useFetcher({ key: "delete-form" });
  const isDeletingId = fetcher.formData?.get("delete");
  const seriesCount = fetcher.formData ? series.length - 1 : series.length;

  return (
    <div className="series-genre">
      <hr />
      <h2>{capitalizeString(genre)} series</h2>
      <p>{seriesCount} series available.</p>
      <div>
        <div>
          <ul>
            {series.map(({ id, title }) => {
              return (
                <li
                  key={id}
                  style={{
                    display: isDeletingId === id ? "none" : "flex",
                    gap: "2rem",
                  }}
                >
                  <Link
                    to={id.toString()}
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    {title}
                  </Link>
                  <fetcher.Form method="post">
                    <button name="delete" value={id}>
                      🗑️
                    </button>
                  </fetcher.Form>
                </li>
              );
            })}
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
