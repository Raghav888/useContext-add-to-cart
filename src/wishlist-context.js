import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlistdata, setWishlist] = useState([]);
  const [wishcount, setwishcount] = useState(0);
  const increasewish = (val) => setwishcount((_count) => _count + val);

  const addwish = (name, id) => {
    const wishdata = { name, id, stock: true };
    setWishlist([...wishlistdata, wishdata]);
    increasewish(1);
  };

  const delwish = (id) => {
    increasewish(-1);
    const newWishlist = wishlistdata.filter((data) => data.id !== id);
    setWishlist(newWishlist);
  };
  return (
    <WishlistContext.Provider
      value={{
        wishlistdata,
        setWishlist,
        wishcount,
        increasewish,
        addwish,
        delwish
      }}
    >
      {" "}
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);
export { WishlistProvider, useWishlist };
