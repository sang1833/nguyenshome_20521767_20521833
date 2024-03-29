import { Outlet } from "react-router-dom";

const BillLayout = () => {
  return (
    <>
      <div className="my-10 flex justify-start border-l-2 pl-[5rem]">
        <div className="w-[48rem] max-[512px]:w-full">
          <h1 className="flex justify-center text-2xl font-bold text-gray-700">
            Hoá đơn mua hàng
          </h1>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default BillLayout;
