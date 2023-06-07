import { useState, useRef, useEffect, ChangeEvent } from "react";
import Input from "../components/Profile/Input";
import { useAuthCookie } from "../hooks/useAuthCookie";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { EmailType, PersonalInformationType, ResType, UserDetailsType } from "../utils/interfaces";
import { useCheckAdmin } from "../Context/CheckIfAdminContext";

export default function Profile() {
  const authCookie = useAuthCookie();
  const navigate = useNavigate();
  const [pInfoDisabled, setPInfoDisabled] = useState(true);
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);

  const [emailDisabled, setEmailDisabled] = useState(true);
  const email = useRef<HTMLInputElement>(null);

  const { updateIsAdmin } = useCheckAdmin()!;

  const [userDetails, setUserDetails] = useState<PersonalInformationType & EmailType>(
    {} as PersonalInformationType & EmailType
  );

  const getUserDetails = () => {
    axios
      .get<UserDetailsType, AxiosResponse<UserDetailsType>>("http://localhost:5000/account/get", {
        withCredentials: true,
      })
      .then((res) => {
        setUserDetails(res.data.userDetails);
      });
  };

  useEffect(() => {
    if (!authCookie.get("token")) {
      return navigate("/account/login", { replace: true });
    }
    getUserDetails();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(form: "personalInformation" | "email") {
    const updateUser = (data: PersonalInformationType | EmailType) => {
      axios
        .put<ResType, AxiosResponse<ResType>>("http://localhost:5000/account/update", data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.success);
          getUserDetails();
        });
    };

    switch (form) {
      case "email":
        updateUser({ email: email.current?.value! });
        setEmailDisabled(true);
        break;
      case "personalInformation":
        updateUser({
          firstName: firstName.current?.value!,
          lastName: lastName.current?.value!,
        });
        setPInfoDisabled(true);
        break;
    }
  }

  return (
    <section className="flex flex-col items-center justify-center py-16 ">
      <div className="defWidth">
        <div className="flex pb-4 items-center gap-5 w-1/2 ">
          <h2 className="text-2xl ">Personal Information</h2>
          <span
            className="h-fit cursor-pointer text-blue-800 hover:text-orange-800 hover:underline hover:underline-offset-2"
            onClick={() => {
              setPInfoDisabled((prev) => !prev);
            }}
          >
            {pInfoDisabled ? "Edit" : "Cancel"}
          </span>
        </div>
        <div className="flex gap-4">
          <Input
            title={"First Name"}
            value={userDetails.firstName}
            isDisabled={pInfoDisabled}
            reference={firstName}
            handleChange={handleChange}
          />
          <Input
            title={"Last Name"}
            value={userDetails.lastName}
            isDisabled={pInfoDisabled}
            reference={lastName}
            handleChange={handleChange}
          />
          {!pInfoDisabled && (
            <button
              onClick={() => {
                handleSubmit("personalInformation");
              }}
              className="bg-blue-700 text-white px-10 rounded-md active:scale-[.98] uppercase"
            >
              Save
            </button>
          )}
        </div>
      </div>
      <div className="defWidth pt-4">
        <div className="flex pb-4 items-center gap-5 w-1/2 ">
          <h2 className="text-2xl ">Email address</h2>
          <span
            className="h-fit cursor-pointer text-blue-800 hover:text-orange-800 hover:underline hover:underline-offset-2"
            onClick={() => {
              setEmailDisabled((prev) => !prev);
            }}
          >
            {emailDisabled ? "Edit" : "Cancel"}
          </span>
        </div>
        <div className="flex gap-4">
          <Input
            title={"Email"}
            value={userDetails.email}
            isDisabled={emailDisabled}
            reference={email}
            handleChange={handleChange}
          />
          {!emailDisabled && (
            <button
              onClick={() => {
                handleSubmit("email");
              }}
              className="bg-blue-700 text-white px-10 rounded-md active:scale-[.98] uppercase"
            >
              Save
            </button>
          )}
        </div>
        <button
          className="btn mt-4"
          onClick={() => {
            authCookie.remove("token");
            updateIsAdmin(false);
            navigate("/");
          }}
        >
          Sign Out
        </button>
      </div>
    </section>
  );
}
