import { FIREBASE_API } from "~/utils/constants.server";
import generateId from "~/utils/id-generator.server";

export default async function createSeries(newSeries: FormData) {
  try {
    newSeries.append("id", generateId());
    const response = await fetch(`${FIREBASE_API}/series.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(newSeries)),
    });
    if (response.status !== 200) {
      return [];
    }

    return await response.json();
  } catch (error) {
    return [];
  }
}
