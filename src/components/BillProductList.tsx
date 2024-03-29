import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useLoaderData,
  useParams,
} from "react-router-dom";
import {
  getProductById,
  getProductColor,
  getProductColorById,
  getAllProductImageUrlByColor,
  getProductImagesUrl,
  getDiscountById,
  getOrderItemByOrder,
} from "@/api/api_function";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { set } from "react-hook-form";
import ReviewModal from "./modals/reviewModal";

interface OrderItem {
  _id: string;
  orderId: string;
  productId: string;
  productColorId: string;
  productQuantity: number;
  productPrice: number;
  productSalePrice: number;
  createdAt: string;
  updatedAt: string;
}

interface IOrderState {
  _id: string;
  customerId: string;
  staffId: string | null;
  orderCode: string;
  orderStatus: string;
  orderNote: string;
  orderAddress: string;
  paymentMethod: string;
  orderShippingFee: number;
  createdAt: string;
  updatedAt: string;
}

interface BillProductListProps {
  orderItem: OrderItem;
  orderInfo: IOrderState | undefined;
}

const BillProductList = ({ orderItem, orderInfo }: BillProductListProps) => {
  const navigate = useNavigate();
  //   const orderInfo = useSelector((state: RootState) => state.order.order);
  const [product, setProduct] = useState<any>(null);
  const [color, setProductColor] = useState<any>(null);
  const [productImageUrl, setProductImageUrl] = useState<string[] | null>(null);
  const [canReview, setCanReview] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (orderInfo?.orderStatus === "Đã hoàn tất") {
      setCanReview(true);
    } else {
      setCanReview(false);
    }
  }, [orderInfo]);

  useEffect(() => {
    getProductById(orderItem.productId).then((res) => {
      const productRes = res.data.data;
      setProduct(productRes);
    });

    getProductColorById(orderItem.productColorId).then((res) => {
      const productColorRes = res.data.color;
      setProductColor(productColorRes);
    });

    getAllProductImageUrlByColor(
      orderItem.productId,
      orderItem.productColorId
    ).then((res) => {
      const productImageUrlRes = res.data.data;
      const _imageUrls = productImageUrlRes.map(
        (productImageUrl: any) => productImageUrl.imageURL
      );
      setProductImageUrl(_imageUrls);
    });
  }, [orderItem]);

  return (
    <>
      {orderInfo && orderItem && product && color && productImageUrl && (
        <ReviewModal
          open={open}
          setOpen={setOpen}
          productId={orderItem.productId}
          productColorId={orderItem.productColorId}
          orderId={orderInfo._id}
        />
      )}
      {orderItem && product && color && productImageUrl && (
        <div className="m-2 max-w-3xl overflow-hidden rounded px-4 shadow">
          <div className="flex justify-between p-4">
            <div className="flex items-center gap-4">
              {productImageUrl && productImageUrl.length > 0 && (
                <img
                  key={orderItem.productColorId}
                  src={productImageUrl[0]}
                  alt={product?.productName}
                  className="h-16 w-16 object-contain"
                />
              )}
              <button
                className="text-dark-3"
                onClick={() => navigate(`/collection/${orderItem.productId}`)}
              >
                Xem
              </button>
              <div>
                <div className="font-bold">{product?.productName}</div>
                <div className="flex">
                  <div className="font-bold">Màu: </div>
                  <div className="ml-1">{color?.colorName}</div>
                  <div className="ml-2 flex items-center">
                    <span
                      className={`mr-2 inline-block h-4 w-4 rounded-full bg-${color?.colorHex}`}
                      style={{ backgroundColor: color?.colorHex }}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="font-bold">Số lượng: </div>
                  <div className="ml-1">{orderItem.productQuantity}</div>
                </div>
                <div>
                  {orderItem?.productSalePrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            </div>
            <div>
              {canReview && (
                <button
                  className="rounded bg-dark-2 px-4 py-2 font-bold text-white hover:bg-black"
                  onClick={() => setOpen(true)}
                >
                  Đánh giá
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillProductList;
