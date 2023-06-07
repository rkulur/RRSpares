import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="border h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-9xl text-blue-800">403</h1>
      <p className="font-semibold text-xl">Access denied</p>
      <p className="font-semibold text-4xl uppercase text-orange-400">Unauthorized</p>
      <div>
        <Link to={"/"}>
          <button className="!bg-blue-800 mt-6 rounded-md btn"> Go to Home Page</button>
        </Link>
      </div>
    </div>
  );
}
