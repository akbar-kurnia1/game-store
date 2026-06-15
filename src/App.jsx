import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Store from "./pages/Store";
import Library from "./pages/Library";
import Wishlist from "./pages/Wishlist";
import Community from "./pages/Community";
import GameDetail from "./pages/GameDetail";

export default function App() {
  return (
    <div className="bg-store-dark min-h-screen text-store-text flex flex-col">
      <Navbar />

      <main className="px-4 md:px-8 flex-grow py-6">
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/library" element={<Library />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>

      <footer className="border-t border-store-border mt-10 bg-store-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">

            <div className="flex flex-col gap-2">
              <span className="font-extrabold text-lg text-store-heading tracking-tight">FREESTATION</span>
              <p className="text-store-text-dim text-sm max-w-xs">
                Your straightforward destination for discovering the best free-to-play games.
              </p>
            </div>

            <div className="flex gap-6 text-sm">
              <a href="https://github.com/akbar-kurnia1" target="_blank" rel="noreferrer" className="text-store-text-dim hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/akbarkurnia1/" target="_blank" rel="noreferrer" className="text-store-text-dim hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="border-t border-store-border mt-6 pt-4 text-store-text-dim text-xs text-center">
            Copyright © 2026 Akbar-Kurnia1. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}