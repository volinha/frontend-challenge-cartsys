import './App.css';

import type { RootState } from "./app/store"
import { useSelector, useDispatch } from "react-redux";
import { updateName } from './app/slices/usuarioSlice';

function App() {

  const name = useSelector((state: RootState) => state.user.name);

  const dispatch = useDispatch();

  return (
    <main style={{minHeight: '100vh' }} className="flex flex-col items-center justify-center bg-slate-500">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-2 p-4 rounded bg-slate-700">
          <span className="text-white">Efetue o login para começar</span>
          <input 
          type="text" 
          className="p-2 rounded" 
          placeholder="Usuário" 
          value={name}
          onChange={(e) => dispatch(updateName(e.target.value))}
          />
          <input type="password" className="p-2 rounded" placeholder="Senha" />
          <a href="/home" className="min-w-full" onClick={() => dispatch(updateName(name))}>
            <button className="w-full p-2 bg-white rounded hover:bg-white/90">Entrar</button>
          </a>
          <a href="/404" className="text-blue-500 hover:text-blue-400">Esqueci minha senha</a>
        </div>
      </div>
    </main>
  );
}

export default App;
