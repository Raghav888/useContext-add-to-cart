import { useCart } from "./cart-context";
import { useProduct } from "./product-context";
import { useWishlist } from "./wishlist-context";

export const Product = () => {
  const { Productlist, setproduct } = useProduct();
  const { cartdata, setCartdata, count, increaseCount } = useCart();
  const { wishlistdata, setWishlist, increasewish, wishcount } = useWishlist();

  const exists = (id) => cartdata.findIndex((obj) => obj.id === id);

  const reduceQuantity = (id, name, qty) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, qty: data.qty - 1 } : data
    );
    let itemIndex = exists(id);
    if (itemIndex === -1) {
      let newObj = { name: name, qty: 1, id: id, maxqty: qty - 1 };
      setCartdata([...cartdata, newObj]);
    } else {
      let newCartList = cartdata.map((item, index) =>
        index === itemIndex ? { ...item, qty: item.qty + 1 } : item
      );
      setCartdata(newCartList);
    }
    setproduct(newproductData);
    increaseCount(1);
  };

  const addtowish = (name, id) => {
    const wishdata = { name, id };
    setWishlist([...wishlistdata, wishdata]);
    increasewish(1);
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, wishlist: !data.wishlist } : data
    );
    setproduct(newproductData);
  };

  const removewish = (name, id) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, wishlist: !data.wishlist } : data
    );
    setproduct(newproductData);
    increasewish(-1);

    const newWishlist = wishlistdata.filter((data) => data.id !== id);
    setWishlist(newWishlist);
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
