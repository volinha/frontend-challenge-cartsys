import { Barcode, Headset, Users } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Page() {

    const optionClasses = "flex flex-col items-center justify-center text-xl w-44 gap-2 rounded aspect-square bg-slate-700 hover:bg-slate-600"
    const iconSize = 40;

    return (
        <div className="flex items-center justify-center gap-4 text-white min-h-navbar bg-slate-500">
            <Link to="/produtos">
                <div className={optionClasses}>
                    <Barcode size={iconSize} color="#fef6f6" />
                    <span>Produtos</span>
                </div>
            </Link>
            <Link to="/clientes">
            <div className={optionClasses}>
                <Users size={iconSize} color="#fef6f6" />
                <span>Clientes</span>
            </div>
            </Link>
            <Link to="/assistente">
            <div className={optionClasses}>
                <Headset size={iconSize} color="#fef6f6" />
                <span>Assistente</span>
            </div>
            </Link>
        </div>
    )
}