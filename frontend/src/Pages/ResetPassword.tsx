import { useState, useRef, SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthCookie } from "../hooks/useAuthCookie";
import axios, { AxiosResponse } from "axios";
import { ResTokenType } from "../utils/interfaces";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function ResetPassword() {
  const navigate = useNavigate();
  const authCookie = useAuthCookie();
  const location = useLocation();

  const [showPass, setShowPass] = useState(false);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  function handleLoginForm(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const resetId = location.pathname.split("/").reverse()[0];
    axios
      .post<ResTokenType, AxiosResponse<ResTokenType>>(`http://localhost:5000/account/reset/${resetId}`, {
        password: password.current?.value,
        confirmPassword: confirmPassword.current?.value,
      })
      .then((res: AxiosResponse<ResTokenType>) => {
        if (res.data.success) {
          navigate(`/confirm`, { replace: true });
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err.message, err.stack));
  }
  return (
    <section className="py-12 flex h-screen">
      <div className="w-full flex flex-col items-center justify-center">
        <form action="" className=" flex flex-col gap-6 w-2/6 py-4 px-8 justify-center" onSubmit={handleLoginForm}>
          <h2 className="uppercase text-3xl text-center font-bold">Reset Password</h2>
          <div className="relative">
            <input
              type={`text`}
              className={` pl-8 py-3 px-4 outline-orange-400 w-full`}
              placeholder="Enter Password "
              ref={password}
              required
              min={8}
            />
          </div>
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
              placeholder="Confirm Password "
              ref={confirmPassword}
              required
              min={8}
            />
          </div>
          <input className="bg-orange-400 px-4 py-3 text-white active:bg-blue-800" type="submit" />
        </form>
      </div>
    </section>
  );
}
