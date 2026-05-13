import { NavLink } from "react-router-dom";

export default function Navbar({ libraryCount }) {
  return (
    <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-900 px-4 md:px-8 py-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="font-bold text-xl text-white">
        FreeGames.
      </div>
      <div className="flex gap-8 text-sm">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"}
        >
          Store
        </NavLink>
        <NavLink 
          to="/library" 
          className={({ isActive }) => isActive ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"}
        >
          Library
        </NavLink>
        <NavLink 
          to="/community" 
          className={({ isActive }) => isActive ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"}
        >
          Community
        </NavLink>
      </div>
      <div className="bg-zinc-900 text-zinc-400 px-4 py-2 rounded-md font-bold text-sm border border-zinc-800">
        Library: <span className="text-white">{libraryCount}</span>
      </div>
    </nav>
  );
}