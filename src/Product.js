import { useCart } from "./cart-context";
import { useProduct } from "./product-context";
import { useWishlist } from "./wishlist-context";

export const Product = () => {
  const { Productlist, red, wishupdate } = useProduct();
  const { cartupdate, count } = useCart();
  const { delwish, wishcount, addwish } = useWishlist();

  const reduceQuantity = (id, name, qty) => {
    red(id);
    cartupdate(id, name, qty);
  };

  const addtowish = (name, id) => {
    addwish(name, id);
    wishupdate(id);
  };

  const removewish = (name, id) => {
    wishupdate(id);
    delwish(id);
  };

  return (
    <div>
      <h1>E-commerce</h1>
      <div>
        <p>Items in cart {count}</p>
        <p>Items in Wishlist {wishcount}</p>
        {Productlist.map((data) => {
          return (
            <div>
              {data.qty > 0 ? (
                <li key={data.id}>
                  {" "}
                  {data.name}{" "}
                  <button
                    onClick={() => reduceQuantity(data.id, data.name, data.qty)}
                  >
                    {" "}
                    Add to Cart
                  </button>
                  {data.wishlist === true ? (
                    <button onClick={() => addtowish(data.name, data.id)}>
                      Add to Wishlist
                    </button>
                  ) : (
                    <button onClick={() => removewish(data.name, data.id)}>
                      Remove from Wishlist
                    </button>
                  )}
                </li>
              ) : (
                <li key={data.id}>
                  {" "}
                  {data.name} <span>Out of Stock</span>
                  {data.wishlist === true ? (
                    <button onClick={() => addtowish(data.name, data.id)}>
                      Add to Wishlist
                    </button>
                  ) : (
                    <button>Remove from Wishlist</button>
                  )}
                </li>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
