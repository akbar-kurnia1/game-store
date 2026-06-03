import { useState } from "react";

export default function useLibrary() {
  const [myLibrary, setMyLibrary] = useState([]);
  const [myWishlist, setMyWishlist] = useState([]);

  const handleAddToLibrary = (game) => {
    const isDuplicate = myLibrary.find((item) => item.id === game.id);
    if (!isDuplicate) {
      setMyLibrary([...myLibrary, game]);
      alert(`${game.name} berhasil ditambahkan ke Library!`);
    } else {
      alert(`${game.name} sudah ada di Library kamu.`);
    }
  };

  const handleToggleWishlist = (game) => {
    const isInWishlist = myWishlist.find((item) => item.id === game.id);
    if (isInWishlist) {
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

  return {
    myLibrary,
    myWishlist,
    handleAddToLibrary,
    handleToggleWishlist,
    isInWishlist,
    isInLibrary,
  };
}
