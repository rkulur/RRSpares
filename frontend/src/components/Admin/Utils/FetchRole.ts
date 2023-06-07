import axios, { AxiosResponse } from "axios";
import { GetRoleType } from "../../Home/Header";
import { useCheckAdmin } from "../../../Context/CheckIfAdminContext";


export default function fetchRole(updateIsAdmin : (bool : boolean)=>void){
    axios
      .get<GetRoleType, AxiosResponse<GetRoleType>>(
        "http://localhost:5000/account/role",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.role === "admin") {
          updateIsAdmin(true);
        }
      })
      .catch((err) => console.log(err.message, err.stack));
}