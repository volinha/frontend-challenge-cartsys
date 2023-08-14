import { User } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';

import { useState } from 'react';

const Navbar = ({ children }: { children: React.ReactNode }) => {

    const username = useSelector((state: RootState) => state.user.name)

    const [imageError, setImageError] = useState(false);
    
    const handleOnError = () => {
        setImageError(true);
      };

    return (
        <div>

            <nav className="mb-1 rounded-b bg-slate-500">
                <div className="flex items-center justify-between">
                    <ul className="flex items-center justify-around gap-2 p-4 font-bold text-white ">
                        <li><Link to="/home/">Home</Link></li>
                        <li><Link to="/produtos/">Produtos</Link></li>
                        <li><Link to="/clientes/">Clientes</Link></li>
                        <li><Link to="/assistente/">Assistente</Link></li>
                    </ul>
                    <div className="flex items-center justify-center gap-2 p-2">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-white">
                                Bem vindo, <span className="font-bold">{username}</span>!
                            </span>
                            <div className="flex items-center gap-2 text-white">
                                <Link to="/" className="text-xs hover:text-white/70">Logout</Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-12 rounded-full aspect-square bg-slate-600">
                            {!imageError ? (
                                <img
                                    src={`https://github.com/${username}.png`}
                                    alt=""
                                    onError={() => setImageError(true)}
                                    className="w-12 h-full rounded-full aspect-square"
                                />
                            ) : (
                                <User size={32} color="#fef6f6" />
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    );
}

export default Navbar;