import { useCart } from "./cart-context";
import { useProduct } from "./product-context";
import { useWishlist } from "./wishlist-context";

export const Wishlist = () => {
  const { wishlistdata, setWishlist, increasewish } = useWishlist();
  const { Productlist, setproduct } = useProduct();
  const { cartdata, setCartdata, increaseCount } = useCart();

  const removewish = (name, id) => {
    const newproductData = Productlist.map((data) =>
      data.id === id ? { ...data, wishlist: !data.wishlist } : data
    );
    setproduct(newproductData);
    increasewish(-1);

    const newWishlist = wishlistdata.filter((data) => data.id !== id);
    setWishlist(newWishlist);
  };

  const exists = (id) => cartdata.findIndex((obj) => obj.id === id);

  const addtocart = (id) => {
    const productdata = Productlist.filter((data) => data.id === id);

    if (productdata[0].qty > 0) {
      const newproductData = Productlist.map((data) =>
        data.id === id ? { ...data, qty: data.qty - 1 } : data
      );
      setproduct(newproductData);
      increaseCount(1);
      let itemIndex = exists(id);

      if (itemIndex === -1) {
        let newObj = {
          name: productdata[0].name,
          qty: 1,
          id: id,
          maxqty: productdata[0].qty - 1
        };
        setCartdata([...cartdata, newObj]);
      } else {
        let newCartList = cartdata.map((item, index) =>
          index === itemIndex ? { ...item, qty: item.qty + 1 } : item
        );
        setCartdata(newCartList);
      }
    } else {
      const newWishlist = wishlistdata.map((data) =>
        data.id === id ? { ...data, stock: !data.stock } : data
      );
      setWishlist(newWishlist);
    }
  };

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlistdata.map((data) => {
        return (
          <div>
            <li>
              {data.name}
              <button onClick={() => removewish(data.name, data.id)}>
                Remove from Wishlist
              </button>
              {data.stock ? (
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
