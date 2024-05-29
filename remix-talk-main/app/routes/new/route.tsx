import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  json,
  useActionData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import validateFormData from "./validate-form-data.server";
import createSeries from "./handlers/create-series.server";
import { Input } from "~/components/input";
import { FormField } from "./constants";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const validationResult = validateFormData(formData);

  if (validationResult.isErr) {
    return json({ errors: validationResult.errors });
  }

  try {
    await createSeries(formData);
  } catch (error) {
    throw json("Failed to create a new series.", { status: 500 });
  }

  return redirect(`/series`);
}

export default function SeriesForm() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/new";

  return (
    <>
      <h4>Add a new Series 🎬</h4>
      <hr />
      <Form method="post">
        <fieldset disabled={isSubmitting}>
          <Input
            type="text"
            name={FormField.Title}
            label="Title"
            placeholder="Title"
            error={actionData?.errors?.title}
          />
          <Input
            type="text"
            name={FormField.Genre}
            label="Genre"
            placeholder="Genre"
            error={actionData?.errors?.genreId}
          />
          <Input
            type="text"
            name={FormField.Stars}
            label="Stars"
            placeholder="Stars"
            error={actionData?.errors?.stars}
          />
          <button type="submit">
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </fieldset>
      </Form>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="grid place-content-center">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h4>Add a new Series 🎬</h4>
        <hr />
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div>
            <span className="font-medium">
              Something went wrong while adding the series.
            </span>{" "}
            Please try submitting again.
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
