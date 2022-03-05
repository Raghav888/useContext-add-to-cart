import { createContext, useContext, useState } from "react";

const productData = [
  {
    id: 1,
    name: "perfume",
    qty: 5,
    wishlist: true
  },
  {
    id: 2,
    name: "Jeans",
    qty: 4,
    wishlist: true
  },
  {
    id: 3,
    name: "T-shirts",
    qty: 2,
    wishlist: true
  },
  {
    id: 4,
    name: "Shoes",
    qty: 6,
    wishlist: true
  }
];
const ProductContext = createContext([]);

const ProductProvider = ({ children }) => {
  const [Productlist, setproduct] = useState(productData);
  const red = (id) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, qty: data.qty - 1 } : data
    );
    setproduct(newproductData);
  };

  const inc = (id) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, qty: data.qty + 1 } : data
    );
    setproduct(newproductData);
  };
  const wishupdate = (id) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, wishlist: !data.wishlist } : data
    );
    setproduct(newproductData);
  };

  const releaseQuantity = (id, qty) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, qty: data.qty + qty } : data
    );
    setproduct(newproductData);
  };
  return (
    <ProductContext.Provider
      value={{ Productlist, setproduct, red, wishupdate, releaseQuantity, inc }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);
export { ProductProvider, useProduct };
