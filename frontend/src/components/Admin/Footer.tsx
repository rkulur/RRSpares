import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="h-[3.5rem] flex flex-col items-center justify-center bg-white mt-10 ">
      <div className="defWidth flex flex-col items-center">
        <p>
          Copyright © 2023{" "}
          <Link to={"/"} className="text-blue-800 underline underline-offset-2">
            RR Spares
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
