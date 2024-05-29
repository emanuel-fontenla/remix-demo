import {
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  useParams,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import appStylesHref from "./styles/app.css?url";
import spinnerStylesHref from "./styles/spinner.css?url";
import tailwindStylesHref from "./styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesHref },
  { rel: "stylesheet", href: appStylesHref },
  { rel: "stylesheet", href: spinnerStylesHref },
];

export default function App() {
  const navigation = useNavigation();
  const { id } = useParams();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Demo</h1>
          <div>
            <Link to={"/new"}>
              <button>Add a new series</button>
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/series"} prefetch="intent">
                  Series
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className={navigation.state === "loading" && !id ? "loading" : ""}
          id="detail"
        >
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
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
      <div className="grid place-content-center">
        <h1>Error Boundary Component</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
