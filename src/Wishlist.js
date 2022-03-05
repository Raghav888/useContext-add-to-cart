import { useCart } from "./cart-context";
import { useProduct } from "./product-context";
import { useWishlist } from "./wishlist-context";

export const Wishlist = () => {
  const { wishlistdata, delwish } = useWishlist();
  const { Productlist, wishupdate, red } = useProduct();
  const { cartupdate } = useCart();

  const removewish = (name, id) => {
    wishupdate(id);
    delwish(id);
  };

  const addtocart = (id) => {
    const productdata = Productlist.filter((data) => data.id === id);
    red(id);
    cartupdate(id, productdata[0].name, productdata[0].qty);
  };

  const wishlistData = wishlistdata.map((wishlistItem) =>
    Productlist.find((product) => product.id === wishlistItem.id)
  );

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlistData.map((data) => {
        return (
          <div>
            <li>
              {data.name}
              <button onClick={() => removewish(data.name, data.id)}>
                Remove from Wishlist
              </button>
              {data.qty > 0 ? (
                <button onClick={() => addtocart(data.id)}>Add to Cart</button>
              ) : (
                <p>Out of Stock</p>
              )}
            </li>
          </div>
        );
      })}
    </div>
  );
};
