import React, { Suspense, lazy, useState } from "react";
const ServiceCard = lazy(() => import("./ServiceCard"));
import {
  TruckIcon,
  ArrowLeftIcon,
  PhoneArrowDownLeftIcon,
} from "@heroicons/react/24/outline";

export interface IService {
  title: string;
  description: string;
  icon: any;
}

const ServicePage = () => {
  const servicesArray = [
    {
      title: "Miễn phí vận chuyển",
      description: "Miễn phí vận chuyển toàn quốc.",
      icon: <TruckIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Trả hàng trong 30 ngày",
      description: "Trả hàng trong vòng 30 ngày nếu thấy không hợp.",
      icon: <ArrowLeftIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Hỗ trợ 24/7",
      description: "Hỗ trợ mọi lúc, mọi nơi.",
      icon: <PhoneArrowDownLeftIcon className="h-8 w-8 text-gray-900" />,
    },
  ];

  const [services, setServices] = useState<IService[]>(servicesArray);

  return (
    <div className="px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Dịch vụ của chúng tôi</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service, index) => (
          <Suspense fallback={<></>}>
            <div key={index}>
              <ServiceCard service={service} index={index} />
            </div>
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
