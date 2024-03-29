import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCustomerCart,
  getAllCartItem,
  getProductById,
  getProductColorById,
  getAllProductImageUrlByColor,
  getDiscountById,
} from "@/api/api_function";
import { CircularProgress } from "@mui/material";
import { loadCartItems } from "@/redux/reducers/cartItem_reducers";

import CartItemComponent from "./CartDetail";

interface CartItem {
  _id: string;
  productId: string;
  productColorId: string;
  productQuantity: number;
  cartId: number;
  productPrice: number;
  productDiscount: number;
  productSalePrice: number;
}

interface CartProps {
  isCart: boolean;
}

export const Cart = ({ isCart }: CartProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isDeleted = useSelector((state: RootState) => state.cartItem.isDeleted);
  const _cartItems = useSelector(
    (state: RootState) => state.cartItem.cartItems
  );
  const currentCart = useSelector((state: RootState) => state.cart);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadCart, setLoadCart] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    setCartItems([]);
    // setPageLoading(true)
  }, [isDeleted]);

  const getCartItemsDetail = async (cartInfor: CartItem[]) => {
    cartInfor.map(async (cartItem: CartItem) => {
      const fetchProductDetails = async () => {
        const res = await getProductById(cartItem.productId);
        return res.data.data;
      };

      const fetchColorDetails = async () => {
        const colorRes = await getProductColorById(cartItem.productColorId);
        return colorRes.data.color;
      };

      const fetchImageUrls = async () => {
        const res = await getAllProductImageUrlByColor(
          cartItem.productId,
          cartItem.productColorId
        );
        const productImageUrls = res.data.data;
        return productImageUrls.map(
          (productImageUrl: any) => productImageUrl.imageURL
        );
      };

      const fetchDiscountDetails = async (product: any) => {
        if (product.productDiscountId) {
          const productDiscountRes = await getDiscountById(
            product.productDiscountId
          );
          console.log(
            "discount productDiscountRes",
            productDiscountRes.data.data
          );
          return productDiscountRes.data.data;
        }
        return null;
      };

      const product = await fetchProductDetails();
      const color = await fetchColorDetails();
      const imageUrls = await fetchImageUrls();
      const discount = await fetchDiscountDetails(product);
      console.log("discount discount", discount);

      setCartItems((prev) => {
        const tempCartItems = prev.map((item: CartItem) => {
          if (item._id === cartItem._id) {
            return {
              ...item,
              productPrice: product.productPrice,
              // productDiscount: discount.discountPercent,
              productSalePrice: product.productPrice,
              productColor: color,
              productImageUrls: imageUrls,
            };
          }
          return item;
        });
        setLoadCart(true);
        return tempCartItems;
      });
    });
  };

  useEffect(() => {
    const fetchCart = async () => {
      setPageLoading(true);
      try {
        const res1 = await getCustomerCart(currentUser);
        const cartInfores = res1.data.data;
        setCart(cartInfores);
        // console.log('cart', cart)

        if (cartInfores.length > 0) {
          const res2 = await getAllCartItem(cartInfores[0]._id, currentUser);
          const returnData = res2.data.data;
          setCartItems(returnData);
          getCartItemsDetail(returnData);
        }
      } catch (error) {
        console.log(error);
      }
      setPageLoading(false);
    };
    if (currentUser) {
      fetchCart();
    }
  }, [currentUser, change, dispatch]);

  // useEffect(() => {
  //   if (cartItems.length > 0) getCartItemsDetail(cartItems);
  // }, [cartItems]);

  useEffect(() => {
    if (cart.length > 0 && cartItems.length > 0) {
      dispatch(loadCartItems({ cartItems: cartItems, isDeleted: false }));
    }
  }, [loadCart, currentUser]);

  if (!currentUser) {
    return (
      <div className="my-[10rem] p-5 text-xl">
        Vui lòng đăng nhập để xem giỏ hàng!
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="my-[10rem] flex justify-center p-5 text-xl">
        Giỏ hàng trống!
      </div>
    );
  }

  return (
    <>
      {pageLoading && (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      {/* cartDetail */}
      {cartItems.map((cartItem: CartItem) => (
        <div key={cartItem.productColorId} className="mb-2">
          <CartItemComponent
            key={cartItem.productColorId}
            cartItem={cartItem}
            setCartItems={setCartItems}
            setChange={setChange}
          />
        </div>
      ))}
      {/* button */}
      <div className="flex justify-center">
        {currentUser && isCart && (
          <Link to={"cart"}>
            <button
              className={
                "m-2 rounded-sm bg-primary-1 p-2 px-16 uppercase text-white hover:bg-black hover:shadow-lg"
              }
            >
              Thanh toán ngay
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Cart;
