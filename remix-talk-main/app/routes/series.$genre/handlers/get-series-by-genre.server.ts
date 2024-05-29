import { Series } from "~/models/types";
import { FIREBASE_API } from "~/utils/constants.server";

export default async function getSeriesByGenre(
  genre?: string
): Promise<Series[]> {
  if (!genre) return [];
  try {
    // TODO: should be filtered on the request and not in memory
    const response = await fetch(`${FIREBASE_API}/series.json`);

    if (response.status !== 200) {
      return [];
    }

    const data: Series[] = Object.values(await response.json());
    return data.filter((series) => series.genreId === genre);
  } catch (error) {
    return [];
  }
}
