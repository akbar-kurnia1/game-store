import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ libraryCount, wishlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchText(query);
  }, [location.search]);

  const getNavClass = ({ isActive }) => {
    const base = "px-3 py-2 text-sm font-semibold transition-colors uppercase tracking-wide";
    return isActive
      ? `${base} text-white`
      : `${base} text-store-text-dim hover:text-white`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/?search=${encodeURIComponent(searchText.trim())}`);
    } else {
      navigate("/");
    }
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-store-surface border-b border-store-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14">

          <NavLink to="/" className="font-extrabold text-lg text-white tracking-tight shrink-0">
            FREESTATION
          </NavLink>

          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={getNavClass} end>
              Store
            </NavLink>
            <NavLink to="/library" className={getNavClass}>
              Library
            </NavLink>
            <NavLink to="/community" className={getNavClass}>
              Community
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search the store"
                className="bg-store-card border border-store-border text-sm text-white px-3 py-1.5 rounded-l-md w-44 focus:outline-none focus:border-store-accent placeholder-store-text-dim"
              />
              <button
                type="submit"
                className="bg-store-card border border-l-0 border-store-border px-3 py-1.5 rounded-r-md text-store-text-dim hover:text-white cursor-pointer"
              >
                🔍
              </button>
            </form>

            <NavLink
              to="/wishlist"
              className="flex items-center gap-1.5 text-sm text-store-text-dim hover:text-white transition-colors"
            >
              <span>★</span>
              <span>Wishlist</span>
              <span className="text-white font-semibold">{wishlistCount}</span>
            </NavLink>

            <div className="flex items-center gap-1.5 text-sm text-store-text-dim">
              <span>Library</span>
              <span className="text-white font-semibold">{libraryCount}</span>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-store-text hover:text-white p-2 cursor-pointer"
          >
            <div className="w-5 flex flex-col gap-1">
              <div className={`h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
              <div className={`h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}></div>
              <div className={`h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
            </div>
          </button>

        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-store-border bg-store-surface px-4 py-3 flex flex-col gap-2">
          <NavLink to="/" className={getNavClass} end onClick={() => setMenuOpen(false)}>Store</NavLink>
          <NavLink to="/library" className={getNavClass} onClick={() => setMenuOpen(false)}>Library</NavLink>
          <NavLink to="/wishlist" className={getNavClass} onClick={() => setMenuOpen(false)}>
            ★ Wishlist ({wishlistCount})
          </NavLink>
          <NavLink to="/community" className={getNavClass} onClick={() => setMenuOpen(false)}>Community</NavLink>
          <form onSubmit={handleSearch} className="flex mt-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search the store"
              className="bg-store-card border border-store-border text-sm text-white px-3 py-1.5 rounded-l-md flex-grow focus:outline-none placeholder-store-text-dim"
            />
            <button type="submit" className="bg-store-card border border-l-0 border-store-border px-3 py-1.5 rounded-r-md text-store-text-dim cursor-pointer">
              🔍
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}