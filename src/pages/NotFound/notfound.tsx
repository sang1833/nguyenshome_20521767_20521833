import { NavLink } from "react-router-dom";

const notfound = () => {
  return (
    <section className="my-8 pt-8">
      <div className="flex justify-center">
        <div className="grid-flow-col text-center">
          {/* <img className="pl-2" src="/sorry.jpg" alt="sorry" /> */}
          <h1 className="my-4 pb-4 text-6xl font-bold text-dark-0">404</h1>
          <h2>Không tìm thấy trang!</h2>
          <p>Xin lỗi vì sự bất tiện này</p>

          <p>
            Về màn hình chính:{" "}
            <NavLink
              className="font-bold text-dark-0 underline decoration-double"
              to="/"
            >
              Màn hình chính
            </NavLink>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default notfound;
