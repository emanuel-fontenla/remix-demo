import { Series } from "~/models/types";
import { FIREBASE_API } from "~/utils/constants.server";

export default async function getSeriesById(
  id?: string
): Promise<Series | null> {
  if (!id) return null;

  try {
    // TODO: should be filtered on the request and not in memory
    const data = await fetch(`${FIREBASE_API}/series.json`);

    if (data.status !== 200) {
      return null;
    }

    const series: Series[] = Object.values(await data.json());

    return series.filter((series) => series.id === id)[0];
  } catch (error) {
    return null;
  }
}
