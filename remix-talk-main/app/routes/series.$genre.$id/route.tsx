import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import getSeriesById from "./handlers/get-series-by-id.server";
import getReviewsBySeriesId from "./handlers/get-reviews-by-series-id.server";
import CommentSkeleton from "./components/skeleton-comment";
import Comment from "./components/comment";
import Card from "./components/card";
import { Review, Series } from "~/models/types";

interface LoaderData {
  series: Series;
  reviews: Review[];
}

export async function loader({ params }: LoaderFunctionArgs) {
  const reviews = getReviewsBySeriesId(params.id);
  const series = await getSeriesById(params.id);

  return defer({ series, reviews });
}

export default function SeriesById() {
  const { series, reviews } = useLoaderData<LoaderData>();
  return (
    <Card title={series.title} src={series.src} stars={series.stars}>
      <Suspense fallback={<CommentSkeleton />}>
        <Await resolve={reviews}>
          {(reviews: Review[]) => (
            <Comment
              username={reviews[0].username}
              comment={reviews[0].comment}
            />
          )}
        </Await>
      </Suspense>
    </Card>
  );
}
