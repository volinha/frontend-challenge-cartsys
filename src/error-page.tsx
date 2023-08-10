import { useRouteError } from "react-router-dom";

interface RouteError {
    statusText: string;
    message: string;
    // Add other properties if needed
}

export default function ErrorPage() {
    const error = useRouteError();

    const routeError = error as RouteError;

    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{routeError.statusText || routeError.message}</i>
            </p>
        </div>
    );
}
