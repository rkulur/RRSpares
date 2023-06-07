import { faBox, faIndianRupee, faUserClock, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PieChart from "./PieChart";
import RecentOrders from "./RecentOrders";
import NewCustomers from "./NewCustomer";
import TopProducts from "./TopProducts";
import Statistics from "./Statistics";

export default function Dashboard() {
  const obj = [
    {
      title: "Daily signups",
      info: "10",
      icon: <FontAwesomeIcon icon={faUserPlus} />,
    },
    {
      title: "Daily Visitors",
      info: "523",
      icon: <FontAwesomeIcon icon={faUserClock} />,
    },
    {
      title: "Daily Order",
      info: "259",
      icon: <FontAwesomeIcon icon={faBox} />,
    },
    {
      title: "Daily Revenue",
      info: "₹2,200",
      icon: <FontAwesomeIcon icon={faIndianRupee} />,
    },
  ];

  return (
    <main className="flex flex-col items-center ">
      <div className="defWidth">
        <section className="h-[28rem] w-full grid grid-cols-2 gap-5 mt-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-5 text-xl ">
            {obj.map((obj, idx) => (
              <div
                key={idx}
                className="bg-white drop-shadow-md rounded-lg text-center flex flex-col gap-6 p-10 select-none "
              >
                <div className="text-4xl text-orange-400">{obj.icon}</div>
                <div className="text-blue-800">
                  <p className="text-2xl font-bold">{obj.info}</p>
                  <p className="text-slate-500">{obj.title}</p>
                </div>
              </div>
            ))}
          </div>
          <Statistics />
        </section>
        <RecentOrders />
        <section className=" grid grid-cols-[40%_57%] rounded-xl drop-shadow-md mt-10  gap-8">
          <NewCustomers />
          <TopProducts />
        </section>
      </div>
    </main>
  );
}
