import Spinner from "~/components/spinner";

export default function FallbackPage() {
  return (
    <div className="text-center">
      <h1 className="text-lg font-bold">Page not found!</h1>
      <Spinner />
    </div>
  );
}
