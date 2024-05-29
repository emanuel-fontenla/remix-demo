export default function capitalizeString(input?: string): string {
  if (!input) return "";
  return input.charAt(0).toUpperCase() + input.slice(1);
}
