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
const ProductContext = createContext({ productData });

const ProductProvider = ({ children }) => {
  const [Productlist, setproduct] = useState(productData);

  return (
    <ProductContext.Provider value={{ Productlist, setproduct }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);
export { ProductProvider, useProduct };
