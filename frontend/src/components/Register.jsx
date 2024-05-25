import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../service/instance";
import { setCookie } from "../lib/cookie";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const payload = {
      username: data?.username,
      email: data?.email,
      password: data?.password,
    };
    try {
      const response = await axiosInstance.post("/api/users/register", payload);
      setCookie("token", response?.data?.data?.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Error while registering ", error);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="px-6 sm:mx-auto sm:w-full sm:max-w-sm bg-[#1A1A40] rounded-2xl">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign up to your account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label
              htmlFor="username"
              className="block text-md font-medium leading-6 text-white"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                placeholder="Enter Username"
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="block w-full rounded-md px-3 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("username", { required: true })}
              />
            </div>
            {errors?.username && (
              <span className="text-sm text-red-500 font-semibold">
                This is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                placeholder="Enter Email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md px-3 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("email", { required: true })}
              />
            </div>
            {errors?.email && (
              <span className="text-sm text-red-500 font-semibold">
                This is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium leading-6 text-white"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                placeholder="Enter Password"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md px-3 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("password", { required: true })}
              />
            </div>
            {errors?.password && (
              <span className="text-sm text-red-500 font-semibold">
                This is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-md font-medium leading-6 text-white"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                placeholder="Enter Confirm Password"
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md px-3 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("confirmPassword", { required: true })}
              />
            </div>
            {errors?.confirmPassword && (
              <span className="text-sm text-red-500 font-semibold">
                This is required
              </span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="my-10 text-center text-sm text-white">
          Already user?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
