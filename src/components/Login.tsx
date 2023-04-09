import React, { useState, useEffect, useRef } from 'react';

type Props = {};

const Login = (props: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
      // Handle form submission here
    };
    return (
    <div className=""> 
        {/* Navigation */}
        <div className="font-medium text-2xl text-primary-1 pt-3 pl-3">
            <a href="/Login">Đăng nhập</a>
        </div>

        {/* Form */}
        <div className="w-[32rem] max-[512px]:w-full p-2 border">
            <form onSubmit={handleSubmit} className="max-w-full mx-auto mt-2">
                {/* Email */}
                <div className="mb-1 p-1">
                    <label htmlFor="email" className="font-semibold text-base text-gray-700">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                </div>
                {/* Password */}
                {/* <div className="mb-1 p-1">
                    <label htmlFor="password" className="font-semibold">Mật khẩu:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                </div> */}
                <div className="mb-1 p-1 relative">
                    <label htmlFor="password" className="font-semibold block text-gray-700">Mật khẩu:</label>
                    <div className="flex items-center">
                        <input type={showPassword ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                        <button type="button" className="absolute right-0 px-3 py-2 rounded-md focus:outline-none" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>                                  
                            ) : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                        </button>
                    </div>
                </div>

                <div className='mt-3 p-1'>
                    <button type="submit" className="w-full px-3 py-1 text-white bg-secondary-1 border rounded-sm border-secondary-1 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                        ĐĂNG NHẬP
                    </button>
                </div>
                <div className='mt-1 p-1'>
                    <a className='underline hover:text-dark-2 hover:font-bold' href="#">
                        Quên mật khẩu?
                    </a>
                </div>
                <div className='p-1 position: relative'>
                    {/* <div className="inline-flex items-center justify-center w-full"> */}
                    <div className="flex w-full">
                        <hr className="my-3 w-full h-px bg-black border-0 dark:bg-gray-700"/>
                        <span className="position: absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                            Hoặc
                        </span>
                    </div>

                    {/* Login with another app */}
                    <div className='mt-3 flex flex-wrap justify-between max-[410px]:justify-center items-center w-full '>
                        <button className='w-5/12 flex justify-center items-center border border-secondary-2 rounded-sm shadow-sm px-2 py-1 hover:font-bold focus:ring focus:ring-secondary-4'>
                            <svg className = "w-5 h-5 shrink-0 max-[410px]:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                            </svg>
                            <div className='text-lg pl-3'>Facebook</div>
                        </button>
                        <div>

                        </div>
                        <button className='w-5/12 flex justify-center items-center border border-secondary-2 rounded-sm shadow-sm px-2 py-1 hover:font-bold focus:ring focus:ring-secondary-4'>
                            <svg className = "w-5 h-5 shrink-0 max-[410px]:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                            <div className='text-lg pl-3'>Google</div>
                        </button>
                    </div>

                    {/* Help? */}
                    <div className='my-5 p-1 flex justify-center'>
                        <div className='text-lg'>
                            Bạn cần giúp đỡ? <a className='underline hover:text-dark-2 hover:font-bold' href="#">Liên hệ chúng tôi</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login;