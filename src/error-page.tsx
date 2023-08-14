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
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black">
            <h1>Oops!</h1>
            <p>Acho que você acabou errando o caminho</p>
            <p className="text-sm italic">ou a rota...</p>
            <p>
                <i>{routeError.statusText || routeError.message}</i>
            </p>
        </div>
    );
}
