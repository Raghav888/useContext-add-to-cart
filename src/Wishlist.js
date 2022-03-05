import { useWishlist } from "./wishlist-context";

export const Wishlist = () => {
  const { wishlistdata, setWishlist, increasewish } = useWishlist();
  return (
    <div>
      <h1>Wishlist</h1>
      {wishlistdata.map((data) => {
        return (
          <div>
            <li>{data.name}</li>
          </div>
        );
      })}
    </div>
  );
};
