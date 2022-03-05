import { Cart } from "./Cart";
import { Product } from "./Product";
import "./styles.css";
import { Wishlist } from "./Wishlist";

export default function App() {
  return (
    <div className="App">
      <Product />
      <Cart />
      <Wishlist />
    </div>
  );
}
