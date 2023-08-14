import { Trash } from "@phosphor-icons/react";
import { useDispatch} from "react-redux";
import { setStatus } from "../app/slices/statusSlice";
import { ClientState } from "../app/slices/clienteSlice";

export default function ClientCard({client} : {client: ClientState}) {

    const dispatch = useDispatch();

    const handleDeleteClient = (productCode: number) => {
        dispatch(setStatus({ isActive: true, message: JSON.stringify(productCode), type: "delete_product" }))
    }

    return (
        <div className="relative text-white flex flex-col p-2 rounded min-w-[10rem] aspect-square items-center justify-between bg-slate-700">
                <div className="flex flex-col items-start justify-start w-full p-2">
                    <div className="text-xl">{client.code}</div>
                    <div className="text-xl">{client.name}</div>
                    <div className="font-mono">{client.email}</div>
                </div>
            <div className="flex items-center justify-center">
                    <button
                    className="p-2 rounded-full bg-slate-900 hover:bg-slate-800"
                    onClick={() => handleDeleteClient(client.code)}>
                        <Trash size={24} color="#fef6f6" />
                    </button>
            </div>
        </div>
    )
}