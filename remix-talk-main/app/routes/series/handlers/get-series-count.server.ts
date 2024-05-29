import { FIREBASE_API } from "~/utils/constants.server";

export default async function getSeriesCount(): Promise<number> {
  try {
    const response = await fetch(`${FIREBASE_API}/series.json`);

    if (response.status !== 200) {
      return 0;
    }

    const data = await response.json();

    return Object.values(data).length;
  } catch (error) {
    return 0;
  }
}
