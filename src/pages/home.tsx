import { Barcode, Headset, Users } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-68px)] gap-4 text-white">
            <Link to="/produtos">
                <div className="flex flex-col items-center justify-center w-40 gap-2 rounded aspect-square bg-slate-600 hover:bg-slate-500">
                    <Barcode size={32} color="#fef6f6" />
                    <span>Produtos</span>
                </div>
            </Link>
            <Link to="/clientes">
            <div className="flex flex-col items-center justify-center w-40 gap-2 rounded aspect-square bg-slate-600 hover:bg-slate-500">
                <Users size={32} color="#fef6f6" />
                <span>Clientes</span>
            </div>
            </Link>
            <Link to="/assistente">
            <div className="flex flex-col items-center justify-center w-40 gap-2 rounded aspect-square bg-slate-600 hover:bg-slate-500">
                <Headset size={32} color="#fef6f6" />
                <span>Assistente</span>
            </div>
            </Link>
        </div>
    )
}