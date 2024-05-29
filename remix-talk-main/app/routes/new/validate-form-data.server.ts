import { FormField } from "./constants";

export default function validateFormData(formData: FormData) {
  let isErr = false;
  const errors: Record<FormField, string | null> = {
    [FormField.Title]: null,
    [FormField.Genre]: null,
    [FormField.Stars]: null,
  };

  const data = Object.fromEntries(formData);
  if (
    !data[FormField.Title] ||
    !data[FormField.Genre] ||
    !data[FormField.Stars]
  ) {
    isErr = true;
  }

  if (!data[FormField.Title]) {
    errors[FormField.Title] = "Title is required";
  }

  if (!data[FormField.Genre]) {
    errors[FormField.Genre] = "Genre is required";
  }

  if (!data[FormField.Stars]) {
    errors[FormField.Stars] = "Stars rating is required";
  }

  return { isErr, errors };
}
