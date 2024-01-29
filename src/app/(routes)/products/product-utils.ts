import { ProductType } from "@/lib/types/ProductType";
import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

interface CartProps {
  product: ProductType;
  quantity: number;
}

export const shoppingCart = new BehaviorSubject<CartProps[] | null>(null);

// Find previous cart items
export const getLocalCart = () => {
  const localCartItems = localStorage.getItem("cartItems");
  let prevCartItems: CartProps[] | null = null;
  if (localCartItems) {
    prevCartItems = JSON.parse(localCartItems);
  }
  return prevCartItems;
};

export const AddToCartHandler = ({ product, quantity }: CartProps) => {
  // Find previous cart items
  const prevCartItems = getLocalCart();

  if (prevCartItems) {
    //   check already exist or not in cart
    const currentItems = prevCartItems.find(
      (item) => item.product._id === product._id
    );

    if (currentItems) {
      currentItems.quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(prevCartItems));
    } else {
      const cartItems: CartProps[] = [...prevCartItems, { product, quantity }];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  } else {
    const cartItems: CartProps[] = [{ product, quantity }];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  const cartItems = getLocalCart();
  shoppingCart.next(cartItems);
};

//=>
export const RemoveFromCartHandler = (productId: string) => {
  // Find previous cart items
  const prevCartItems = getLocalCart();

  if (prevCartItems) {
    //   check already exist or not in cart
    const currentItems = prevCartItems.find(
      (item) => item.product._id === productId
    );

    if (currentItems) {
      const filteredCartItems = prevCartItems.filter(
        (item) => item.product._id !== productId
      );
      localStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
    }
  }

  const cartItems = getLocalCart();
  shoppingCart.next(cartItems);
};

// => Custom Hooks
export const useGetCartItems = () => {
  const [cartItems, setCartItems] = useState<CartProps[] | null>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartItems = getLocalCart();
    shoppingCart.next(cartItems);

    setCartItems(shoppingCart.value);

    shoppingCart.subscribe((carts) => {
      setCartItems(carts);
    });
  }, []);

  // Calculate subTotal price
  useEffect(() => {
    const subTotal = cartItems?.reduce((acc, curr) => {
      return acc + curr.product.price * curr.quantity;
    }, 0);
    setTotalPrice(subTotal || 0);
  }, [cartItems]);

  return { cartItems, totalCartItems: cartItems?.length, totalPrice };
};
