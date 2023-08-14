import { User } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';

import { useState } from 'react';

const Navbar = ({ children }: { children: React.ReactNode }) => {

    const username = useSelector((state: RootState) => state.user.name)

    const [imageError, setImageError] = useState(false);

    return (
        <div>
            <nav className="mb-1 bg-black rounded-b">
                <div className="flex items-center justify-between">
                    <ul className="flex items-center justify-around gap-4 p-4 font-bold text-white ">
                        <li className="hover:text-white/60"><Link to="/home/">Home</Link></li>
                        <li className="hover:text-white/60"><Link to="/produtos/">Produtos</Link></li>
                        <li className="hover:text-white/60"><Link to="/clientes/">Clientes</Link></li>
                        <li className="hover:text-white/60"><Link to="/assistente/">Assistente</Link></li>
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
            <footer className="bg-black bottom-0 w-full flex sm:flex-row flex-col sm:gap-0 gap-2 items-center sm:justify-around justify-center p-4 bg-rs-gray text-white border-t-2 border-[#323238]">
                <div className="flex flex-row items-start justify-center gap-2 text-lg italic sm:text-xl sm:gap-0 sm:flex-col">
                    <Link to="https://github.com/volinha" target="_blank" className="relative inline-flex items-center justify-start gap-2 p-1 overflow-hidden transition-all bg-transparent group hover:bg-transparent">
                        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" alt="logo" width={25} height={25} className="z-30 transition-all invert group-hover:invert-0" />
                        <span className="absolute left-0 w-0 h-full transition-all duration-500 ease-out bg-white -z-1 group-hover:w-full"></span>
                        <span className="z-10 w-full text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                            github
                        </span>
                    </Link>
                    <Link to="https://www.linkedin.com/in/viniciusfernandesdev/" target="_blank" className="relative inline-flex items-center justify-start gap-2 p-1 overflow-hidden transition-all bg-transparent group hover:bg-transparent">
                        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg" alt="logo" width={25} height={25} className="z-30" />
                        <span className="absolute left-0 w-0 h-full transition-all duration-500 ease-out bg-white -z-1 group-hover:w-full"></span>
                        <span className="z-10 w-full text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                            linkedin
                        </span>
                    </Link>
                    <Link to="mailto:viniciusfernandesdev@gmail.com" target="_blank" className="relative inline-flex items-center justify-start gap-2 p-1 overflow-hidden transition-all bg-transparent group hover:bg-transparent">
                        <img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/google-gmail.svg" alt="logo" width={25} height={25} className="z-30" />
                        <span className="absolute left-0 w-0 h-full transition-all duration-500 ease-out bg-white -z-1 group-hover:w-full"></span>
                        <span className="z-10 w-full text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                            email
                        </span>
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-2 text-lg cursor-default sm:text-2xl">feito com <div className="text-4xl text-red-500 animate-bounce">♥</div> por <span className='text-rs-purple-500'>Vinícius Fernandes</span></div>
            </footer>
        </div>
    );
}

export default Navbar;