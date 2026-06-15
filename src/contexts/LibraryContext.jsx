import { createContext, useContext, useState } from "react";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [myLibrary, setMyLibrary] = useState([]);
  const [myWishlist, setMyWishlist] = useState([]);

  const handleAddToLibrary = (game) => {
    const isDuplicate = myLibrary.find((item) => item.id === game.id);
    if (!isDuplicate) {
      setMyLibrary([...myLibrary, game]);
      setMyWishlist(myWishlist.filter((item) => item.id !== game.id));
      alert(`${game.name} berhasil ditambahkan ke Library!`);
    } else {
      alert(`${game.name} sudah ada di Library kamu.`);
    }
  };

  const handleRemoveFromLibrary = (gameId) => {
    setMyLibrary(myLibrary.filter((item) => item.id !== gameId));
  };

  const handleToggleWishlist = (game) => {
    const isInList = myWishlist.find((item) => item.id === game.id);
    if (isInList) {
      setMyWishlist(myWishlist.filter((item) => item.id !== game.id));
    } else {
      setMyWishlist([...myWishlist, game]);
    }
  };

  const isInWishlist = (gameId) => {
    return myWishlist.some((item) => item.id === gameId);
  };

  const isInLibrary = (gameId) => {
    return myLibrary.some((item) => item.id === gameId);
  };

  return (
    <LibraryContext.Provider
      value={{
        myLibrary,
        myWishlist,
        handleAddToLibrary,
        handleToggleWishlist,
        isInWishlist,
        isInLibrary,
        handleRemoveFromLibrary,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibraryContext() {
  return useContext(LibraryContext);
}
