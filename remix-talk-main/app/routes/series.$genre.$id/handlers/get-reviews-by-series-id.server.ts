import { Review } from "~/models/types";
import { FIREBASE_API } from "~/utils/constants.server";

export default async function getReviewsBySeriesId(
  id?: string
): Promise<Review[]> {
  if (!id) return [];

  try {
    // TODO: should be filtered on the request and not in memory
    const response = await fetch(`${FIREBASE_API}/reviews.json`);

    if (response.status !== 200) {
      return [];
    }

    const reviews: Review[] = Object.values(await response.json());

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return reviews.filter((reviews) => reviews.seriesId === id);
  } catch (error) {
    return [];
  }
}
