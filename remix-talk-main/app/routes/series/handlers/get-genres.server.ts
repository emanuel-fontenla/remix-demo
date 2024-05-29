import { Genre } from "~/models/types";
import { FIREBASE_API } from "~/utils/constants.server";

export default async function getGenres(): Promise<Genre[]> {
  try {
    const response = await fetch(`${FIREBASE_API}/genres.json`);

    if (response.status !== 200) {
      return [];
    }
    const data = await response.json();

    return Object.values(data);
  } catch (error) {
    return [];
  }
}
