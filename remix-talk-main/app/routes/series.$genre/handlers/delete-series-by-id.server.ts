import { Series } from "~/models/types";
import { FIREBASE_API } from "~/utils/constants.server";

export default async function deleteSeriesById(seriesId: string) {
  try {
    const response = await fetch(`${FIREBASE_API}/series.json`);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const seriesData: { [key: string]: Series } = await response.json();

    const seriesKey = Object.keys(seriesData).find(
      (key) => seriesData[key].id === seriesId
    );

    if (!seriesKey) {
      throw new Error(`Series with id ${seriesId} not found.`);
    }

    const deleteResponse = await fetch(
      `${FIREBASE_API}/series/${seriesKey}.json`,
      {
        method: "DELETE",
      }
    );

    if (!deleteResponse.ok) {
      throw new Error(
        "Network response was not ok " + deleteResponse.statusText
      );
    }
    return true;
  } catch (error) {
    return false;
  }
}
