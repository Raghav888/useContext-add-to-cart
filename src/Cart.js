import { useCart } from "./cart-context";
import { useProduct } from "./product-context";

export const Cart = () => {
  const { cartdata, cartFilter, cartUpdate } = useCart();
  const { releaseQuantity, red, inc } = useProduct();

  const addBack = (id, qty) => {
    releaseQuantity(id, qty);
    cartFilter(id, qty);
  };

  const increase = (id) => {
    red(id);
    cartUpdate(id, 1);
  };

  const decrease = (id) => {
    inc(id);
    cartUpdate(id, -1);
  };
  return (
    <div>
      <h1>Cart</h1>
      {cartdata.map((data) => {
        return (
          <div>
            {data.qty > 0 ? (
              <li key={data.id}>
                {data.name} Qty: {data.qty}
                <button onClick={() => addBack(data.id, data.qty)}>
                  Remove
                </button>
                {data.maxqty > 0 ? (
                  <button onClick={() => increase(data.id)}>+</button>
                ) : (
                  <button disabled>+</button>
                )}
                <button onClick={() => decrease(data.id)}>-</button>
              </li>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
