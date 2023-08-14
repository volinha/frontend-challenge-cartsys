import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, updateName, updateEmail, updateDocument, resetForm } from './slices/clienteSlice';

import { addClient, clearClientList } from "./slices/listSlice";
import { ClientState } from './slices/clienteSlice';
import { clearStatus, setStatus } from "./slices/statusSlice";

import { PatternFormat } from "react-number-format";

export default function Client() {

    const code = useSelector((state: RootState) => state.client.code);
    const name = useSelector((state: RootState) => state.client.name);
    const document = useSelector((state: RootState) => state.client.document);
    const email = useSelector((state: RootState) => state.client.email);
    const clientList = useSelector((state: RootState) => state.list.clients)
    const status = useSelector((state: RootState) => state.status);

    const inputClasses = 'p-2 rounded w-full';

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

    function clearUsers() {
        dispatch(clearClientList());
        dispatch(resetForm());
    }

    return (
        <div className="flex items-start justify-center min-h-[calc(100vh-68px)] gap-4 bg-slate-600 rounded-t">
            <div className="flex flex-col w-screen min-h-full gap-4 p-4 rounded-t bg-slate-600">
                <div className="flex flex-col items-start justify-between h-full gap-2">
                    <label htmlFor="codigo" className="text-white">Código</label>
                    <input
                        id="codigo"
                        type="number"
                        placeholder="Ex: 1020"
                        className={inputClasses}
                        value={code}
                        onChange={(e) => dispatch(updateCode(parseInt(e.target.value, 10)))}
                    />
                </div>

                <div className="flex flex-col items-start justify-center gap-2">
                    <label htmlFor="nome" className="text-white">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        placeholder="Nome"
                        className={inputClasses}
                        value={name}
                        onChange={(e) => dispatch(updateName(e.target.value))}
                    />
                </div>

                <div className="flex flex-col items-start justify-center gap-2">
                    <label htmlFor="documento" className="text-white">CPF/CNPJ</label>
                    <input
                        id="documento"
                        type="text"
                        placeholder="000.000.000-00"
                        className={inputClasses}
                        value={document}
                        onChange={(e: any) => dispatch(updateDocument(e.target.value))}
                    />
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                    <label htmlFor="email" className="text-white">Email</label>
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
                </div>
                <button
                    className="p-2 font-bold bg-white rounded text-slate-600"
                    onClick={() => addUser({ code, name, document, email })}>
                    Salvar
                </button>
                {/* <button
                    className="p-2 font-bold bg-white rounded text-slate-600"
                onClick={() => getUsers()}
                >
                    Listar usuários
                </button> */}
                <button
                    className="p-2 font-bold bg-white rounded text-slate-600"
                    onClick={() => clearUsers()}
                >
                    Limpar dados
                </button>
                <div>
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