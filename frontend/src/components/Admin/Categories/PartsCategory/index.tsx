import { CheckCircleIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { PartCategoryType, ResType, StateWithIdxType } from "../../../../utils/interfaces";
import { useAlert } from "../../../../Context/AlertContext";
import { ParsedDataType } from "chart.js";

export const PartsCategory = () => {
  const setAlert = useAlert()!.setAlert;
  const categoryName = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<PartCategoryType[] | null>(null);
  const [categoryAdded, setCategoryAdded] = useState(false);
  const [categoryDeleted, setCategoryDeleted] = useState(false);
  const listElement = useRef<HTMLDivElement>(null);

  const [triggerOptions, setTriggerOptions] = useState<StateWithIdxType>({
    state: false,
    idx: null,
  });
  const [enableEdit, setEnableEdit] = useState<StateWithIdxType>({
    state: false,
    idx: null,
  });
  const updatedCategoryName = useRef<HTMLInputElement>(null);

  type CategoriesType = {
    categories: PartCategoryType[];
  };

  const handleAddCategory = (e: FormEvent) => {
    e.preventDefault();
    if (!categoryName.current?.value) {
      return;
    }
    const cName = categoryName.current.value;
    categoryName.current && (categoryName.current.value = "");

    axios
      .post<ResType, AxiosResponse<ResType>>(
        `${import.meta.env.VITE_SERVER_URL}/categories/pcats`,
        { categoryName: cName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res: AxiosResponse<ResType>) => {
        console.log(res.data);
        setAlert({
          state: true,
          type: "success",
          message: res.data.message,
        });
        setCategoryAdded(true);
      })
      .catch((err: AxiosError<ResType>) => {
        console.log(err);
      });
  };

  const handleEditCategory = (category: PartCategoryType) => {
    if (!updatedCategoryName.current) return;

    axios
      .put(
        `${import.meta.env.VITE_SERVER_URL}/categories/pcats/${category._id}`,
        {
          updatedCategoryName: updatedCategoryName.current.innerText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res: AxiosResponse<ResType>) => {
        setEnableEdit({ state: false, idx: null });
        setAlert({ type: "success", state: true, message: res.data.message });
      })
      .catch((err: AxiosError<ResType>) => {
        console.log(err);
        setAlert({ type: "error", state: true, message: err.response?.data.message! });
      });
  };

  const handleDeleteCategory = (category: PartCategoryType) => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/categories/pcats/${category._id}`, { withCredentials: true })
      .then((res: AxiosResponse<ResType>) => {
        setCategoryDeleted(false)
        setAlert({ type: "success", state: true, message: res.data.message });
      })
      .catch((err: AxiosError<ResType>) => {
        console.log(err);
        setAlert({ type: "error", state: true, message: err.response?.data.message! });
      });
  };

  useEffect(() => {
    if (categoryAdded) {
      setCategoryAdded(false);
    }

    if (categoryDeleted) {
      setCategoryDeleted(false);
    }
    axios
      .get<ResType, AxiosResponse<ResType & CategoriesType>>(`${import.meta.env.VITE_SERVER_URL}/categories/pcats`, {
        withCredentials: true,
      })
      .then((res: AxiosResponse<ResType & CategoriesType>) => {
        setCategories(res.data.categories);
      });
    return () => {};
  }, [categoryAdded, enableEdit, categoryDeleted]);

  useEffect(() => {
    function handleOutsideListClick(e: Event) {
      if (listElement.current && !listElement.current.contains(e.target as Node)) {
        setTriggerOptions({
          state: false,
          idx: null,
        });
      }
    }
    document.addEventListener("mousedown", handleOutsideListClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideListClick);
    };
  }, []);

  return (
    <main className=" mt-10 flex items-center flex-col">
      <section className="defWidthCategory h-full  grid gap-6 grid-cols-[40%_60%]">
        <div className="flex  justify-center bg-white">
          <form id="partcategory" onSubmit={handleAddCategory} className="p-10 w-full flex flex-col items-center gap-4">
            <h1 className="font-bold text-2xl text-center text-blue-800 uppercase">add part category</h1>
            <div className="flex flex-col w-full">
              <label className="block mb-4" htmlFor="name">
                Category Name :
              </label>
              <input ref={categoryName} className=" px-3 py-2 outline-blue-800 border" id="name" type="text" required />
            </div>
            <input
              className="cursor-pointer px-3 py-2 bg-orange-400 text-white rounded-md active:scale-[.98] outline-blue-800"
              type="submit"
              value={"Add Category"}
            />
          </form>
        </div>
        <div className="p-10 bg-white">
          <h1 className="font-bold text-2xl text-blue-800 uppercase">part categories</h1>
          <div className="grid border-b-2 font-bold pt-2 pb-1 w-full grid-cols-[20%_60%_20%]">
            <h3 className="">Sl No</h3>
            <h3 className="">Categories</h3>
          </div>
          {categories?.map((category, idx) => (
            <div className="grid border-b-2 py-3 w-full grid-cols-[20%_60%_20%] relative">
              {enableEdit.state && enableEdit.idx === idx ? (
                <>
                  <p key={idx}>{idx + 1}</p>
                  <p
                    key={category._id}
                    ref={updatedCategoryName}
                    contentEditable
                    suppressContentEditableWarning
                    className="w-fit px-3 py-1 outline-slate-300 bg-slate-100 shadow-inner"
                  >
                    {category.categoryName}
                  </p>
                  <div className="flex">
                    <CheckCircleIcon
                      className="h-8 w-8 text-green-500 cursor-pointer active:scale-95"
                      onClick={() => {
                        handleEditCategory(category);
                      }}
                    />
                    <XCircleIcon
                      className="h-8 w-8 text-red-500 cursor-pointer active:scale-95"
                      onClick={() => {
                        setEnableEdit((prev) => ({ state: !prev.state, idx: null }));
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p>{idx + 1}</p>
                  <p>{category.categoryName}</p>
                  <div
                    className=""
                    onClick={() => {
                      setTriggerOptions((prev) => {
                        return { state: !prev.state, idx };
                      });
                    }}
                  >
                    <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" />
                    {triggerOptions.state && triggerOptions.idx === idx && (
                      <div
                        ref={listElement}
                        className="absolute z-10 rounded-md shadow-lg right-28 top-full grid grid-rows-2 w-32 h-16 border bg-white "
                      >
                        <div
                          className="flex px-2 py-2 hover:bg-slate-200 active:bg-slate-300 items-center cursor-pointer border-b-2"
                          onClick={() => {
                            setEnableEdit({ state: true, idx });
                          }}
                        >
                          <PencilIcon className="h-6 w-6 text-green-500" />
                          <span className=" ml-2">Edit</span>
                        </div>
                        <div
                          className="flex px-2 py- hover:bg-slate-200 active:bg-slate-300 items-center cursor-pointer"
                          onClick={() => {
                            handleDeleteCategory(category);
                          }}
                        >
                          <TrashIcon className="h-6 w-6 text-red-500" />
                          <span className=" ml-2">Delete</span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
