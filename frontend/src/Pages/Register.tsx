import Axios, { AxiosResponse } from "axios";
import { SyntheticEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Register() {
  interface ResponseType {
    success: Boolean;
    message: string;
  }

  const navigate = useNavigate();

  const [isConfirm, setIsConfirm] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isPassMinChar, setIsPassMinChar] = useState(true);

  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  function handleRegisterForm(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.current) {
      if (password.current?.value.length < 8) {
        return setIsPassMinChar(false);
      }
    }

    if (password.current?.value !== confirmPassword.current?.value) {
      return setIsConfirm(false);
    }

    Axios.post<ResponseType, AxiosResponse<ResponseType>>("http://localhost:5000/account/register", {
      firstName: firstName.current?.value,
      lastName: lastName.current?.value,
      email: email.current?.value,
      password: password.current?.value,
    }).then((res: AxiosResponse<ResponseType>) => {
      if (res.data.success) {
        navigate("/account/profile");
      }
    });
  }

  return (
    <section className="py-12 flex">
      <div className="w-full flex items-center justify-center flex-col">
        <form
          action=""
          className=" flex flex-col gap-6 w-2/6 py-4 px-8 justify-center"
          onSubmit={handleRegisterForm}
          onFocus={() => {
            setIsConfirm(true);
            setIsPassMinChar(true);
          }}
        >
          <h2 className="uppercase text-3xl text-center font-bold">Register</h2>
          <div className="flex flex-col">
            <label className={`text-sm text-red-500`}> </label>
            <input
              type="text"
              className="pl-8 py-3 px-4 outline-orange-400 "
              placeholder="Enter first name"
              min={3}
              max={25}
              ref={firstName}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className={`text-sm text-red-500`}></label>
            <input
              type="text"
              className="pl-8 py-3 px-4 outline-orange-400 "
              placeholder="Enter last name"
              max={25}
              ref={lastName}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className={`text-sm text-red-500`}></label>
            <input
              type="email"
              className="pl-8 py-3 px-4 outline-orange-400 "
              placeholder="Enter email "
              ref={email}
              required
            />
          </div>
          <div className="flex flex-col relative ">
            <label className={`text-sm text-red-500`}>
              {" "}
              {!isPassMinChar ? "Password should have minimum of 8 characters" : ""}
            </label>
            <div className="relative">
              <div
                className="absolute top-1/4 right-8 text-gray-500 "
                onClick={() => {
                  setShowPass((prev) => !prev);
                }}
              >
                {showPass ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}
              </div>
              <input
                type={`${showPass ? "text" : "password"}`}
                className={` pl-8 py-3 px-4 outline-orange-400 w-full`}
                placeholder="Enter password "
                ref={password}
                required
                min={8}
              />
            </div>
          </div>
          <div className="flex flex-col relative">
            <label className={`text-sm text-red-500`}>{!isConfirm ? "Password does not match" : ""}</label>
            <div className="relative">
              <div
                className="absolute top-1/4 right-8 text-gray-500 "
                onClick={() => {
                  setShowConfirmPass((prev) => !prev);
                }}
              >
                {showConfirmPass ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}
              </div>
              <input
                type={`${showConfirmPass ? "text" : "password"}`}
                className={` pl-8 py-3 px-4 outline-orange-400 w-full`}
                placeholder="Confirm password "
                ref={confirmPassword}
                min={8}
                onBlur={() => {}}
              />
            </div>
          </div>
          <input className="bg-orange-400 px-4 py-3 text-white active:bg-blue-800" type="submit" />
        </form>
        <div className="w-2/6 px-10 ">
          <Link to="/">
            <p className="cursor-pointer hover:text-blue-800 hover:underline hover:underline-offset-2">
              Return to Store
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
