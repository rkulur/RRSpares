import { SyntheticEvent, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ResTokenType } from "../utils/interfaces";
import { GetRoleType } from "../components/Home/Header";
import { useCheckAdmin } from "../Context/CheckIfAdminContext";
import fetchRole from "../components/Admin/Utils/FetchRole";
import { useAuthCookie } from "../hooks/useAuthCookie";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPass, setShowPass] = useState(false);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const authCookie = useAuthCookie()!;
  const { updateIsAdmin } = useCheckAdmin()!;

  function handleLoginForm(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post<ResTokenType, AxiosResponse<ResTokenType>>(
        "http://localhost:5000/account/login",
        {
          email: email.current?.value,
          password: password.current?.value,
        },
        {
          withCredentials: true,
        }
      )
      .then(async (res: AxiosResponse<ResTokenType>) => {
        authCookie.get("token") && fetchRole(updateIsAdmin);
        console.log("change");

        if (res.data.success) {
          console.log(location.state && location.state.from && location.state.from.pathname);
          navigate("/account/profile", {
            state: { from: location },
            replace: true,
          });
        }
      });
  }
  return (
    <section className="py-12 flex">
      <div className="w-full flex flex-col items-center justify-center">
        <form action="" className=" flex flex-col gap-6 w-2/6 py-4 px-8 justify-center" onSubmit={handleLoginForm}>
          <h2 className="uppercase text-3xl text-center font-bold">Log In</h2>
          <input
            type="email"
            required
            className="pl-8 py-3 px-4 outline-orange-400 transition-all "
            placeholder="Enter email "
            name="email"
            id="email"
            ref={email}
          />
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
              name="password"
              id="password"
              required
              min={8}
            />
          </div>
          <input className="bg-orange-400 px-4 py-3 text-white active:bg-blue-800" type="submit" />
        </form>
        <div className=" flex gap-8 text-orange-400 p-4">
          <Link to="/account/reset">
            <p className="cursor-pointer hover:text-blue-800 hover:underline hover:underline-offset-2">
              Forgot Password
            </p>
          </Link>
          <Link to="/account/register">
            <p className="cursor-pointer hover:text-blue-800 hover:underline hover:underline-offset-2">
              Create account
            </p>
          </Link>
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
