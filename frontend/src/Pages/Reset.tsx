import axios, { AxiosResponse, ResponseType } from "axios";
import React, { useRef, SyntheticEvent } from "react";
import { ResTokenType } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";

export default function Reset() {
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);

  function handleForm(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post<ResTokenType, AxiosResponse<ResTokenType>>("http://localhost:5000/account/reset", {
        email: email.current?.value,
      })
      .then((res) => {
        console.log(res.data);
        res.data.success && navigate("/account/login", { replace: true });
      });
  }

  return (
    <section className="py-12 flex flex-col relative">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="uppercase text-3xl text-center font-bold">Reset Password</h2>
        <form onSubmit={handleForm} className=" flex flex-col gap-6 w-2/6 py-4 px-8 justify-center">
          <input
            ref={email}
            type="email"
            className={` pl-8 py-3 px-4 outline-orange-400 w-full`}
            placeholder="Enter email"
          />
          <input type="submit" className="bg-orange-400 px-4 py-3 text-white active:bg-blue-800" />
        </form>
      </div>
    </section>
  );
}
