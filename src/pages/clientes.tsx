import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, updateName, updateEmail, updateDocument, resetForm } from '../app/slices/clienteSlice';

import { addClient, clearClientList } from "../app/slices/listSlice";
import { ClientState } from '../app/slices/clienteSlice';
import { clearStatus, setStatus } from "../app/slices/statusSlice";

import { Link } from "react-router-dom";
import { FormEvent } from "react";

export default function Client() {

    const code = useSelector((state: RootState) => state.client.code);
    const name = useSelector((state: RootState) => state.client.name);
    const document = useSelector((state: RootState) => state.client.document);
    const email = useSelector((state: RootState) => state.client.email);
    const clientList = useSelector((state: RootState) => state.list.clients);
    const status = useSelector((state: RootState) => state.status);

    const inputClasses = 'p-2 rounded min-w-screen w-full';
    const buttonClasses = 'p-2 rounded bg-slate-700 hover:bg-slate-400 text-white disabled:bg-slate-700 disabled:text-white/50';

    const dispatch = useDispatch();

    function addUser(newClient: ClientState) {
        const doesCodeExist = clientList.find((client: ClientState) => client.code === newClient.code);

        if (!doesCodeExist) {
            dispatch(addClient(newClient));
            dispatch(setStatus({ isActive: true, message: 'Usuário cadastrado com sucesso!', type: 'success' }))
        } else {
            dispatch(setStatus({ isActive: true, message: 'Código já existente!', type: 'error' }))
        }
        dispatch(resetForm());

        setTimeout(() => {
            dispatch(clearStatus());
        }, 5000);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        addUser({ code, name, document, email });
    }

    function clearUsers() {
        dispatch(clearClientList());
        dispatch(resetForm());
    }

    return (
        <div className="flex items-start justify-center gap-4 rounded-t min-h-navbar bg-slate-600">
            <div className="flex flex-col w-screen min-h-full gap-4 p-4">
                <form 
                onSubmit={(e) => handleSubmit(e)} 
                className="flex flex-col items-start justify-between h-full gap-2 min-w-screen">
                    <label htmlFor="codigo" className="mt-4 text-xl text-white">Código</label>
                    <input
                        id="codigo"
                        type="number"
                        placeholder="Ex: 1020"
                        className={inputClasses}
                        value={code}
                        onChange={(e) => dispatch(updateCode(parseInt(e.target.value, 10)))}
                    />
                        <label htmlFor="nome" className="mt-4 text-xl text-white">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Nome"
                            className={inputClasses}
                            value={name}
                            onChange={(e) => dispatch(updateName(e.target.value))}
                        />
                        <label htmlFor="documento" className="mt-4 text-xl text-white">CPF/CNPJ</label>
                        <input
                            id="documento"
                            type="text"
                            placeholder="000.000.000-00"
                            className={inputClasses}
                            value={document}
                            onChange={(e: any) => dispatch(updateDocument(e.target.value))}
                        />
                        <label htmlFor="email" className="mt-4 text-xl text-white">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className={inputClasses}
                            pattern="/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i"
                            value={email}
                            required
                            onChange={(e) => dispatch(updateEmail(e.target.value))}
                        />
                    <button
                        type="submit"
                        className={buttonClasses + ' w-full mt-4'}
                        disabled={!code || !name || !document || !email}
                        >
                        Salvar
                    </button>
                </form>
                <div className="flex items-center justify-center gap-4">
                    <Link to="/clientes/listar"
                        className={buttonClasses}
                    >
                        Listar clientes
                    </Link>
                    <button
                        className={buttonClasses}
                        onClick={() => clearUsers()}
                    >
                        Limpar dados
                    </button>
                </div>
                {status.isActive &&
                    <div className={`flex items-center justify-center p-2 text-white rounded ${status.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
                        {status.message}
                    </div>
                }
            </div>
        </div>
    )
}