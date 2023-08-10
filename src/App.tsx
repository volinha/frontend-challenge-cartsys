import './App.css';

import type { RootState } from "./app/store"
import { useSelector, useDispatch } from "react-redux";
import { updateName } from './pages/slices/usuarioSlice';

function App() {

  const name = useSelector((state: RootState) => state.user.name);

  const dispatch = useDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-400">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center items-center w-full gap-2 p-4 bg-slate-700 rounded">
          <span className="text-white">Efetue o login para começar</span>
          <input 
          type="text" 
          className="rounded p-2" 
          placeholder="Usuário" 
          value={name}
          onChange={(e) => dispatch(updateName(e.target.value))}
          />
          <input type="password" className="rounded p-2" placeholder="Senha" />
          <a href="/home" className="min-w-full">
            <button className="rounded p-2 w-full bg-white hover:bg-white/90">Entrar</button>
          </a>
          <a href="/404" className="text-blue-500 hover:text-blue-400">Esqueci minha senha</a>
        </div>
      </div>
    </main>
  );
}

export default App;
