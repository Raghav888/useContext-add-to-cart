import { useCart } from "./cart-context";

export const Cart = () => {
  const { cartdata } = useCart();
  return (
    <div>
      <h1>Cart</h1>
      {cartdata.map((data) => {
        return (
          <div>
            <li key={data.id}>
              {data.name} Qty: {data.qty}
            </li>
          </div>
        );
      })}
    </div>
  );
};
