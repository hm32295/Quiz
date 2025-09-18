"use client";

import { StudentAsyncThunk } from "@/redux/Features/getStudent";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import SelectBoxGroup from "../selectBoxGroup/selectBoxGroup";
import { SetGroupAsyncThunk } from "@/redux/Features/setGroup";
import { Dispatch } from "@reduxjs/toolkit";
import { editGroupAsyncThunk } from "@/redux/Features/editGroup";
import { groupAsyncThunk } from "@/redux/Features/getGroup";



interface GroupForm {
  name: string;
  students: string[];
  _id:string;
}

interface GroupModalProps {
  isOpen: boolean;
  dataUpdate:GroupForm
  isLoading?: boolean;
  setOpenModelEditAndAdd: Dispatch<SetStateAction<boolean>>;

  onClose: () => void;
}

export default function AddAndEditGroup({
  isOpen,
  onClose,
  dataUpdate,
  setOpenModelEditAndAdd
}: GroupModalProps) {


  const [isAdd , setIsAdd] = useState(true)
  const { data: dataStudents ,isLoading} = useSelector((state: any) => state.Student);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ react-hook-form
  const {register,handleSubmit,reset, setValue,formState: { errors } } = useForm<GroupForm>({
    defaultValues: { name: "", students: [] },
    mode: "onChange",
  });
const onSubmit = async(data:GroupForm)=>{
  
  if(isAdd){
    await dispatch(SetGroupAsyncThunk(data))
  }else{
    await dispatch(editGroupAsyncThunk({data ,id:dataUpdate._id}))
    console.log('edit');
    
  }
    dispatch(groupAsyncThunk())
    reset({
      name:'',
      students:[]
    })
    setOpenModelEditAndAdd(false)
    
  }
 useEffect(() => {
  
  if (dataUpdate?.name) {
    reset({
      name: dataUpdate.name || "",
      students: dataUpdate.students || []
    });
    setIsAdd(false)
  }else{
    reset({
      name:"",
      students:[]
    })
    setIsAdd(true)
  }
}, [dataUpdate, reset]);
  // get Students From Api
  useEffect(() => {
    if (isOpen) {
      dispatch(StudentAsyncThunk() as any);
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        // setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={()=> setIsOpenDropdown(false)}>
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50 animate__animated animate__fadeIn"
        onClick={onClose}
      />

      {/* modal content */}
      <div
        className="
          relative w-full h-auto sm:w-[90%] md:w-[700px] 
          bg-white shadow-2xl rounded-none sm:rounded-2xl 
          p-4 sm:p-6 animate__animated animate__slideInUp
        "
      >
        {/* header */}
        <div className="flex justify-between items-center border-b pb-1 mb-3">
          <h2 className="text-lg md:text-xl font-bold capitalize">
            Set up a new Group
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-600 hover:text-red-500 text-[18px]"
          >
            ✖
          </button>
        </div>

        {/* form */}
        <form
          id="groupForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          {/* group name */}
          <div>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <label className="block p-2 text-center bg-[#FFEDDF] h-full font-semibold text-sm sm:text-base">
                Group Name
              </label>
              <input
                {...register("name", {
                  required: "Group name is required",
                })}
                className="w-full p-1 focus:outline-none focus:ring-2 focus:ring-[#FFEDDF]"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

      
            <SelectBoxGroup dataUpdata={dataUpdate} data={dataStudents || []} setValue={setValue} setOpenDropdown={setIsOpenDropdown} openDropdown={isOpenDropdown} />
      
          {/* footer */}
          <div className="flex flex-row-reverse">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 cursor-pointer py-1.5 rounded-xl bg-[#FFEDDF] hover:bg-[#ffd6b8] transition font-medium disabled:opacity-50"
            >
              {isLoading ? "... Loading" : (isAdd?"✔ Save" : '✔ Edit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
