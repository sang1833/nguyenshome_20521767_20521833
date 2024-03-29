import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartOrder from "./cartOrder";
import BreadcrumbsOrder from "@/components/BreadcrumbsOrder";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import { set } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  getAllAddresses,
  createOrder,
  createOrderItem,
  removeAllItemFromCart,
} from "@/api/api_function";
import { CircularProgress } from "@mui/material";
import { getRandomNumber } from "@/utils/function";
import { removeCartItems } from "@/redux/reducers/cartItem_reducers";
import { notify } from "@/redux/reducers/notify_reducers";
import { updateConfirmOrder } from "@/redux/reducers/orderConfirm_reducers";
import { VoucherInter } from "./cartOrder";

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

interface IAddress {
  _id: string;
  customerId: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverWard: string;
  receiverDistrict: string;
  receiverCity: string;
  isDefault: boolean;
}

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartItem.cartItems);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const userId = useSelector((state: RootState) => state.auth.id);
  const [price, setPrice] = useState(0);
  const ship = 30000;
  const [totalPrice, setTotalPrice] = useState(price + ship);
  const [currentVoucher, setCurrentVoucher] = useState<VoucherInter | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [chooseAddress, setChooseAddress] = useState<IAddress>({} as IAddress);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [reload, setReload] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  useEffect(() => {
    if (currentVoucher && currentVoucher.voucherType === "PERCENT") {
      setPrice(price - (price * currentVoucher.voucherValue) / 100);
    }
    if (currentVoucher && currentVoucher.voucherType === "MONEY") {
      setPrice(price - currentVoucher.voucherValue);
    }
  }, [currentVoucher]);

  const handleDefaultAddress = () => {
    const defaultAddress = addresses.find(
      (address) => address.isDefault === true
    );
    setSelectedAddress(defaultAddress || null);
  };

  const handleReload = () => {
    setReload(!reload);
    setOrderNote("");
    handleDefaultAddress();
  };

  const handelLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (currentUser) {
      getAllAddresses(userId, currentUser)
        .then((res) => {
          const addr = res.data.data;
          // console.log("adr", addr)
          setAddresses(addr);
          // console.log("address", addresses)
        })
        .catch((err) => {
          console.log("err order");
        });
    }
  }, [currentUser, reload]);

  useEffect(() => {
    if (addresses) {
      // const defaultAddress = addresses.find((address) => address.isDefault === true)
      // setSelectedAddress(defaultAddress || null)
      handleDefaultAddress();
    }
  }, [addresses]);

  useEffect(() => {
    if (cartItems) {
      // const resultPrice = cartItems.reduce((total: number, item: CartItem) => {
      //   if (item.productSalePrice) {
      //     return total + item.productSalePrice * item.productQuantity;
      //   }
      //   return total + item.productPrice * item.productQuantity;
      // }, 0);

      // setPrice(resultPrice);
      setPrice(
        cartItems.reduce((total: number, item: CartItem) => {
          if (item.productSalePrice) {
            return total + item.productSalePrice * item.productQuantity;
          }
          return total + item.productPrice * item.productQuantity;
        }, 0)
      );
    }
  }, [cartItems, dispatch]);

  useEffect(() => {
    setTotalPrice(price + ship);
  }, [price, cartItems]);

  const handleSelectAddress = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddressId = event.target.value;
    const address = addresses.find(
      (address) => address._id === selectedAddressId
    );
    setSelectedAddress(address || null);
  };

  const handleOrderNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOrderNote(event.target.value);
  };

  function handleConfirm(): void {
    if (!selectedAddress) {
      dispatch(
        notify({
          message: "Vui lòng chọn địa chỉ giao hàng",
          isError: true,
          isSuccess: false,
          isInfo: false,
        })
      );
      return;
    }
    const randomNumber = getRandomNumber(100000, 999999);

    const orderInfor = {
      customerId: userId,
      orderCode: randomNumber.toString(),
      orderStatus: "Đặt hàng",
      orderNote: orderNote,
      orderAddress: selectedAddress,
      paymentMethod: "648a91e82b36c6bbd96704a4",
      orderShippingFee: 30000,
      cartItems: cartItems,
      totalPrice: price,
      voucher: currentVoucher,
    };

    dispatch(updateConfirmOrder({ orderInfor: orderInfor }));
    navigate("/order");
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace={true} state={{ from: "/" }} />;
  } else
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3">
            <div className="mt-2 pl-8">
              <BreadcrumbsOrder />
            </div>
            <h1 className="my-6 flex justify-center text-2xl font-bold text-gray-700">
              Danh sách sản phẩm
            </h1>
            <div className="m-8">
              <CartOrder
                currentVoucher={currentVoucher}
                setCurrentVoucher={setCurrentVoucher}
              />
            </div>
          </div>
          <div className="w-full bg-light-4 text-xl md:w-2/3">
            {/* <h1 className='text-2xl font-bold text-gray-700 my-6 flex justify-center'>Chọn địa chỉ giao hàng</h1> */}
            <div className="m-8">
              <h1 className="my-6 flex justify-center text-2xl font-bold text-gray-700">
                Chọn địa chỉ
              </h1>
              <div className="m-8">
                <select
                  className="form-select border border-gray-300 p-1"
                  onChange={handleSelectAddress}
                >
                  {/* <option value=''>Chọn địa chỉ</option> */}
                  {addresses.map((address) => (
                    <option key={address._id} value={address._id}>
                      {address.receiverAddress}, {address.receiverDistrict},{" "}
                      {address.receiverWard}, {address.receiverCity}
                    </option>
                  ))}
                </select>
              </div>
              {selectedAddress && (
                <div className="m-8">
                  <h2 className="mb-2 text-xl font-bold text-gray-700">
                    Thông tin địa chỉ
                  </h2>
                  <div className="flex justify-start space-x-8 text-gray-700">
                    <div className="">
                      <div className="flex items-center">
                        <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                          Tên người nhận:
                        </label>
                        <p>
                          {selectedAddress.receiverFirstName}{" "}
                          {selectedAddress.receiverLastName}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                          Số điện thoại người nhận:
                        </label>
                        <p>{selectedAddress.receiverPhone}</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-center">
                        <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                          Tỉnh - Thành phố:
                        </label>
                        <p>
                          {selectedAddress.receiverWard},{" "}
                          {selectedAddress.receiverDistrict},{" "}
                          {selectedAddress.receiverCity}
                        </p>
                      </div>
                      <div className="flex items-center justify-start">
                        <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                          Địa chỉ:
                        </label>
                        <p>{selectedAddress.receiverAddress}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="min-w-2 mr-2 text-base font-semibold text-dark-1">
                      Ghi chú đơn hàng:
                    </label>
                    <div className="mt-2">
                      <textarea
                        className="form-textarea w-full px-4 py-2"
                        placeholder="Nhập ghi chú đơn hàng của bạn ở đây..."
                        value={orderNote}
                        onChange={handleOrderNoteChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="m-8 mx-16">
              <div className="mt-3 p-1">
                {cartItems.length > 0 ? (
                  <div className="flex justify-center">
                    <button
                      onClick={handleConfirm}
                      className={` rounded-sm border border-secondary-1 bg-primary-1 px-9 py-2 text-base 
                  text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                  ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                  ${loading ? "opacity-50" : "opacity-100"}
                  `}
                    >
                      {loading && (
                        <CircularProgress size={20} className="mr-2" />
                      )}
                      MUA HÀNG
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-4">
                    <p>Hãy đưa sản phẩm vào giỏ hàng để thanh toán</p>
                    <button
                      onClick={() => navigate("/product")}
                      className={`w-full max-w-lg rounded-sm border border-secondary-1 bg-primary-1 px-3 py-1 text-white 
                hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50`}
                    >
                      Tiếp tục mua sắm
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Order;
