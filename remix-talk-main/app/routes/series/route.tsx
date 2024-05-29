import {
  Link,
  Outlet,
  json,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import getSeriesCount from "./handlers/get-series-count.server";
import getGenres from "./handlers/get-genres.server";
import GenreCard from "./components/genre-card";

export async function loader() {
  const [seriesCount, genres] = await Promise.all([
    getSeriesCount(),
    getGenres(),
  ]);
  return json({ seriesCount, genres });
}

export default function Series() {
  const { seriesCount, genres } = useLoaderData<typeof loader>();
  const fetcher = useFetcher({ key: "delete-form" });
  const series = fetcher.formData ? seriesCount - 1 : seriesCount;

  return (
    <>
      <div className="series">
        <h2>Series</h2>
        <p>Explore all {series} available series now!</p>
        <hr />
        <ul>
          {genres.map(({ id, name }) => (
            <Link key={id} to={id} className="block">
              <GenreCard genre={name} />
            </Link>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
}
