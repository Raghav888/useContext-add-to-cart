import { useCart } from "./cart-context";
import { useProduct } from "./product-context";

export const Cart = () => {
  const { cartdata, setCartdata, increaseCount } = useCart();
  const { Productlist, setproduct } = useProduct();
  const addBack = (id, qty) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, qty: data.qty + qty } : data
    );
    setproduct(newproductData);

    const newCartData = cartdata.filter((data) => data.id !== id);
    setCartdata(newCartData);
    increaseCount(-qty);
  };

  const increase = (id) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, qty: data.qty - 1 } : data
    );
    setproduct(newproductData);

    const newCartList = cartdata.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty + 1, maxqty: item.maxqty - 1 }
        : item
    );
    setCartdata(newCartList);
    increaseCount(1);
  };

  const decrease = (id) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, qty: data.qty + 1 } : data
    );
    setproduct(newproductData);

    const newCartList = cartdata.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty - 1, maxqty: item.maxqty + 1 }
        : item
    );
    setCartdata(newCartList);
    increaseCount(-1);
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
