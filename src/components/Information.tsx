import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { login, logout } from "@/redux/reducers/auth_reducers";
import { useNavigate } from "react-router-dom";

import { mainApi } from "@/api/main_api";
import * as apiEndpoints from "@/api/api_endpoints";
import { updateCustomer } from "@/api/api_function";
import { getAvatar, saveAvatar } from "@/api/api_function";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import cat from "@/utils/image_link";
import { current } from "@reduxjs/toolkit";
import { CircularProgress, selectClasses } from "@mui/material";
import { notify } from "@/redux/reducers/notify_reducers";

interface IInfoInput {
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
}

// enum GenderEnum {
//     female = "female",
//     male = "male"
// }

type Props = {};

const Information = (props: Props) => {
  const navigate = useNavigate();
  const isLog = useSelector((state: RootState) => state.auth.isLogin);
  const _id = useSelector((state: RootState) => state.auth.id);
  const _idToken = useSelector(
    (state: RootState) => state.auth.customerIdToken
  );
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const loginType = useSelector((state: RootState) => state.auth.loginType);
  const googleAvatar = useSelector((state: RootState) => state.auth.avatar);
  const dispatch = useDispatch();
  // const [email, setEmail] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [avatar, setAvatar] = useState(cat);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<IInfoInput>();

  const handleChange = (date: Date | null) => {
    if (date !== null) {
      setSelectedDate(date);
    }
  };

  // const birthday = selectedDate.getDate() + '/' + (selectedDate.getMonth() + 1) + '/' + selectedDate.getFullYear();

  const onSubmit: SubmitHandler<IInfoInput> = async (data) => {
    // const birthday = selectedDate.toLocaleDateString('vi-VN');
    const birthday = selectedDate.toString();
    if (loading) return;
    try {
      setLoading(true);

      const result = updateCustomer(
        _id,
        currentUser,
        data.firstname,
        data.lastname,
        birthday,
        data.email,
        data.gender
      ).then(async () => {
        if (avatarFile !== null) {
          await saveAvatar(currentUser, avatarFile);
        }
      });

      dispatch(
        notify({
          message: "Thay đổi thông tin thành công",
          isError: false,
          isSuccess: true,
          isInfo: false,
        })
      );
    } catch (error: any) {
      dispatch(
        notify({
          message: "Thay đổi thất bại",
          isError: true,
          isSuccess: false,
          isInfo: false,
        })
      );
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchInfo = async () => {
    try {
      // const user = getUserInfo(_id);
      const user = await mainApi.get(apiEndpoints.GET_USER_INFO(_id));
      const infor = user.data.data;
      // return { ...infor};
      return infor;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  };

  const fetchAvatar = async () => {
    try {
      const img = await getAvatar(currentUser);

      if (img.data.success) {
        setAvatar(img.data.data);
      }
    } catch (err) {
      // console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    if (isLog) {
      fetchInfo().then((res) => {
        // setEmail(res.customerEmail);
        // setFirstName(res.customerFirstName);
        // setLastName(res.customerLastName);
        const date = new Date(res.customerBirthday);
        handleChange(date);
        setSelectedDate(date);
        // if (res.customerGender === 'Nam') setGender('Nam');
        // else setGender('Nữ');
        setValue("email", res.customerEmail, { shouldTouch: true });
        setValue("firstname", res.customerFirstName, { shouldTouch: true });
        setValue("lastname", res.customerLastName, { shouldTouch: true });
        setValue("gender", res.customerGender, { shouldTouch: true });
      });
      if (loginType !== "google") {
        fetchAvatar();
      }
    } else if (!isLog) {
      dispatch(logout());
      navigate("/signin");
    }
  }, [isLog]);

  // useEffect(() => {
  //     console.log('avatarFile', avatarFile);
  // }, [avatarFile]);

  return (
    <div className="mt-10 flex justify-start border-l-2 pl-[5rem] lg:justify-center">
      {/* Form */}
      <div className="w-[30rem] max-[512px]:w-full">
        <h1 className="mb-6 flex justify-center text-2xl font-bold text-gray-700">
          Thông tin tài khoản
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-2 max-w-full"
        >
          {/* Basic information */}
          <div className="">
            <div className="mb-1 min-w-fit p-1 pr-2">
              <label
                htmlFor="text"
                className="text-base font-semibold text-dark-1"
              >
                Họ:
              </label>
              <input
                {...register("lastname", {
                  pattern: /^[A-Za-z]+$/i,
                  required: true,
                  maxLength: 20,
                })}
                type="text"
                id="lastname"
                name="lastname"
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
                className="w-full appearance-none rounded-sm border border-secondary-1 px-3 py-1 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              {errors.lastname && (
                <span className="text-red-700">Hãy nhập họ</span>
              )}
            </div>
            <div className="mb-1 p-1 pr-2">
              <label className="text-base font-semibold text-dark-1">
                Tên:
              </label>
              <input
                {...register("firstname", { required: true, maxLength: 20 })}
                type="text"
                id="firstname"
                name="firstname"
                // value={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
                className="w-full appearance-none rounded-sm border border-secondary-1 px-3 py-1 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              {errors.lastname && errors.lastname?.type !== "maxLength" && (
                <span className="text-red-700">Hãy nhập tên</span>
              )}
              {errors.lastname?.type === "maxLength" && (
                <span className="text-red-700">Hãy nhập tên</span>
              )}
            </div>
          </div>

          {/* Date time picker and gender */}
          <div className="flex justify-between">
            {/* Date time picker */}
            <div className="mb-1 pl-1">
              <label
                htmlFor="email"
                className="text-base font-semibold text-dark-1"
              >
                Ngày sinh:
              </label>
              <div className="">
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => handleChange(date)}
                    className="relative h-8 appearance-none rounded-sm border border-secondary-1 p-4 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                        className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg> */}
                  </DatePicker>
                </div>
              </div>
            </div>
            {/* Gender */}
            <div className="mb-1 flex w-full justify-center">
              <div>
                <label className="min-w-2 text-base font-semibold text-dark-1">
                  Giới tính:
                </label>
                <select
                  {...register("gender", { required: true })}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="block rounded-sm border border-secondary-1 bg-white p-1.5 text-sm text-gray-900 focus:border-2 focus:border-black focus:ring-white dark:border-gray-600 dark:bg-dark-1 dark:text-white dark:placeholder-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  {/* <option selected>Giới tính:</option> */}
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-1 p-1">
            <label
              htmlFor="email"
              className="text-base font-semibold text-dark-1"
            >
              Email:
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full appearance-none rounded-sm border border-secondary-1 px-3 py-1 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="my-8 p-1">
            {/* <button type="submit" className="w-full px-3 py-1 text-white bg-primary-1 border rounded-sm border-secondary-1 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                        CẬP NHẬT
                    </button> */}
            <button
              type="submit"
              className={`w-full rounded-sm border border-secondary-1 bg-primary-1 px-3 py-1 text-white 
                    hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                    ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                    ${loading ? "opacity-50" : "opacity-100"}
                    `}
            >
              {loading && <CircularProgress size={20} className="mr-2" />}
              CẬP NHẬT
            </button>
          </div>
        </form>
      </div>

      {/* Avatar */}
      <div className="h-[9rem] w-[9rem] pl-10">
        <div className="mx-auto mt-2 max-w-full">
          <div className="flex justify-center">
            <div className="mb-1 p-1 pr-2">
              <div className="mt-[4rem]">
                {loginType === "google" ? (
                  <img
                    src={googleAvatar.toString()}
                    alt="avatar"
                    className="h-auto max-w-full rounded-full border-none object-scale-down align-middle shadow"
                  />
                ) : (
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-primary-1 focus-within:outline-none hover:text-primary-2"
                  >
                    {/* <img src={avatar} alt="avatar" className="object-scale-down shadow rounded-full max-w-full h-auto align-middle border-none" /> */}
                    <div
                      style={{
                        width: "130px",
                        height: "130px",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src={avatar}
                        alt="avatar"
                        className="h-auto max-w-full"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>

                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target?.files?.[0];
                        if (file) {
                          setAvatarFile(file);
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setAvatar(event.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
