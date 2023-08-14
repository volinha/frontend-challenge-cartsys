import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import ClientCard from "../components/ClientCard";

export default function ListClients() {
    const clients = useSelector((state: RootState) => state.list.clients);

    return (
        <div className="flex items-start justify-center gap-4 rounded-t min-h-navbar bg-slate-600">
            <div className="grid items-center justify-center w-screen min-h-full grid-cols-6 gap-4 p-4 rounded-t bg-slate-600">
                {clients.map((client) => (
                    <ClientCard key={client.code} client={client} />
                ))}
            </div>
        </div>
    )
}
