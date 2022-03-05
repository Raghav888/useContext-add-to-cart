import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlistdata, setWishlist] = useState([]);
  const [wishcount, setwishcount] = useState(0);
  const increasewish = (val) => setwishcount((_count) => _count + val);
  return (
    <WishlistContext.Provider
      value={{ wishlistdata, setWishlist, wishcount, increasewish }}
    >
      {" "}
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);
export { WishlistProvider, useWishlist };
