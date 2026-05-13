import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Store from "./pages/Store";
import Library from "./pages/Library";
import Community from "./pages/Community";

export default function App() {
  const [myLibrary, setMyLibrary] = useState([]);

  const handleAddToLibrary = (game) => {
    const isDuplicate = myLibrary.find((item) => item.id === game.id);
    if (!isDuplicate) {
      setMyLibrary([...myLibrary, game]);
      alert(`${game.name} berhasil ditambahkan ke Library!`);
    } else {
      alert(`${game.name} sudah ada di Library kamu.`);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 flex flex-col">
      <Navbar libraryCount={myLibrary.length} />
      
      <div className="px-4 md:px-8 flex-grow">
        <Routes>
          <Route path="/" element={<Store onGetGame={handleAddToLibrary} />} />
          <Route path="/library" element={<Library myGames={myLibrary} />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
      
      <footer className="border-t border-zinc-900 mt-10 py-10">
        <div className="px-4 md:px-8 flex flex-col items-center text-center">
          <div className="font-bold text-2xl text-white mb-2">
            FreeGames.
          </div>
          <p className="text-zinc-500 text-sm mb-6 max-w-sm">
          Your straightforward destination for discovering the best free-to-play games. Level up your library today.
          </p>
          <div className="flex gap-6 mb-8 text-sm text-zinc-500">
            <a href="https://github.com/akbar-kurnia1" target="_blank" rel="noreferrer" className="hover:text-white">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/akbarkurnia1/" target="_blank" rel="noreferrer" className="hover:text-white">
              LinkedIn
            </a>
          </div>
          
          <div className="text-zinc-600 text-xs">
            Copyright © 2026 Akbar-Kurnia1. All rights reserved.
          </div>
          
        </div>
      </footer>
    </div>
  );
}