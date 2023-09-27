import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components/Admin";
import DropDownContextProvider from "../Context/DropDownContext";
import PaginationProvider from "../Context/PaginationContext";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Unauthorized from "./Unauthorized";
import { useAuthCookie } from "../hooks/useAuthCookie";
import Loading from "../components/Loading";
import { useCheckAdmin } from "../Context/CheckIfAdminContext";
import { GetRoleType } from "../components/Home/Header";
import TriggerListEditedProvider from "../Context/TriggerListEditedContext";
import AlertProvider from "../Context/AlertContext";
import SelectBrandContextProvider from "../Context/SelectBrandContext";
import BrandProvider from "../components/Admin/Categories/ModelCategory/GetBrandsContext";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin, updateIsAdmin } = useCheckAdmin()!;

  const authCookie = useAuthCookie();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    if (!authCookie.get("token")) {
      navigate("/account/login");
    }
    axios
      .get<GetRoleType, AxiosResponse<GetRoleType>>("http://localhost:5000/account/role", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.role === "admin") {
          updateIsAdmin(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message, err.stack);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isAdmin ? (
        <>
          <AlertProvider>
            <Navbar />
            <BrandProvider>
            <DropDownContextProvider>
              <PaginationProvider>
                <TriggerListEditedProvider>
                  <SelectBrandContextProvider>
                    <Outlet />
                  </SelectBrandContextProvider>
                </TriggerListEditedProvider>
              </PaginationProvider>
            </DropDownContextProvider>
            </BrandProvider>
            <Footer />
          </AlertProvider>
        </>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}
