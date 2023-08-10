import { Barcode, Headset, Users } from "@phosphor-icons/react";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center gap-4 text-white">
            <a href="/produtos">
                <div className="w-40 aspect-square rounded bg-slate-600 flex flex-col gap-2 items-center justify-center hover:bg-slate-500">
                    <Barcode size={32} color="#fef6f6" />
                    <span>Produtos</span>
                </div>
            </a>
            <a href="/clientes">
            <div className="w-40 aspect-square rounded bg-slate-600 flex flex-col gap-2 items-center justify-center hover:bg-slate-500">
                <Users size={32} color="#fef6f6" />
                <span>Clientes</span>
            </div>
            </a>
            <a href="/assistente">
            <div className="w-40 aspect-square rounded bg-slate-600 flex flex-col gap-2 items-center justify-center hover:bg-slate-500">
                <Headset size={32} color="#fef6f6" />
                <span>Assistente</span>
            </div>
            </a>
        </div>
    )
}