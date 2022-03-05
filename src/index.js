import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CartProvider } from "./cart-context";
import { ProductProvider } from "./product-context";
import { WishlistProvider } from "./wishlist-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CartProvider>
    </WishlistProvider>
  </StrictMode>,
  rootElement
);
