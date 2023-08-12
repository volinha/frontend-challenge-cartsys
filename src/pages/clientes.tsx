import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, updateName, updateEmail, updateDocument, resetForm } from './slices/clienteSlice';

import { ClientState } from './slices/clienteSlice';
import { useEffect, useState } from "react";

export default function Client() {

    useEffect(() => {
        const storedClients = localStorage.getItem('clients');

        if (storedClients) {
            const parsedClients = JSON.parse(storedClients);
            setNewClients(parsedClients);
        }
    }, []);

    const code = useSelector((state: RootState) => state.client.code);
    const name = useSelector((state: RootState) => state.client.name);
    const document = useSelector((state: RootState) => state.client.document);
    const email = useSelector((state: RootState) => state.client.email);

    const [newClients, setNewClients] = useState<ClientState[]>([]);
    const [clientList, setClientList] = useState<ClientState[]>([]);

    const dispatch = useDispatch();

    function addUser(user: ClientState) {
        newClients.push(user);
        localStorage.setItem('clients', JSON.stringify(newClients));
        dispatch(resetForm());
    }

    const getUsers = () => {
        const data = localStorage.getItem('clients');
        if (data) {
            setClientList(JSON.parse(data));
        } else {
            console.log("No data available.")
        }
    };

    const clearUsers = () => {
        localStorage.clear();
        setClientList([]);
    }

    return (
        <div className="min-h-screen flex items-center justify-center gap-4">
            <div className="flex flex-col gap-4 rounded p-4 bg-slate-600 ">
                <div className="flex flex-col gap-2 items-start justify-center">
                    <label htmlFor="codigo" className="text-white">Código</label>
                    <input
                        id="codigo"
                        type="number"
                        placeholder="Ex: 1020"
                        className="p-2 rounded"
                        value={code}
                        onChange={(e) => dispatch(updateCode(parseInt(e.target.value, 10)))}
                    />
                </div>

                <div className="flex flex-col gap-2 items-start justify-center">
                    <label htmlFor="nome" className="text-white">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        placeholder="Nome"
                        className="p-2 rounded"
                        value={name}
                        onChange={(e) => dispatch(updateName(e.target.value))}
                    />
                </div>

                <div className="flex flex-col gap-2 items-start justify-center">
                    <label htmlFor="documento" className="text-white">CPF/CNPJ</label>
                    <input
                        id="documento"
                        type="text"
                        placeholder="CPF/CNPJ"
                        className="p-2 rounded"
                        value={document}
                        onChange={(e) => dispatch(updateDocument(e.target.value))}
                    />
                </div>
                <div className="flex flex-col gap-2 items-start justify-center">
                    <label htmlFor="email" className="text-white">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="p-2 rounded"
                        pattern="/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i"
                        value={email}
                        onChange={(e) => dispatch(updateEmail(e.target.value))}
                    />
                </div>
                <button
                    className="p-2 rounded bg-white text-slate-600 font-bold"
                    onClick={() => addUser({ code, name, document, email })}>
                    Salvar
                </button>
                <button
                    className="p-2 rounded bg-white text-slate-600 font-bold"
                    onClick={() => getUsers()}
                >
                    Listar usuários
                </button>
                <button
                    className="p-2 rounded bg-white text-slate-600 font-bold"
                    onClick={() => clearUsers()}
                >
                    Limpar dados
                </button>
                <div>
                    {clientList.map((client, index) => (
                        <div key={index}>{JSON.stringify(client)}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}