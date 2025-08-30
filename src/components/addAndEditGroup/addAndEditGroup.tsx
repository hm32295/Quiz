"use client";

import { StudentAsyncThunk } from "@/redux/Features/gerStudent";
import { useEffect, useState, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch } from "react-redux";

interface GroupModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  register: any;
  setValue: any;
  watch: any; 
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AddAndEditGroup({
  isOpen,
  onClose,
  isLoading,
  register,
  setValue,
  watch,
  onSubmit,
}: GroupModalProps) {
  const dataStudents = ["Ahmed", "Mohamed", "Ali"];
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = watch("students") || [];

  const toggleStudent = (student: string) => {
    let updated = [...selected];
    if (updated.includes(student)) {
      updated = updated.filter((s) => s !== student);
    } else {
      updated.push(student);
    }
    setValue("students", updated);
  };

useEffect(() => {
  if (isOpen) {
    dispatch(StudentAsyncThunk());
    console.log("data");
  }
}, [isOpen, dispatch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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
          p-4 sm:p-6  animate__animated animate__slideInUp
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
        <form id="groupForm" onSubmit={onSubmit} className="flex flex-col gap-2">
          {/* group name */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <label className="block p-2 text-center bg-[#FFEDDF] h-full font-semibold text-sm sm:text-base">
              Group Name
            </label>
            <input
              {...register("name")}
              className="w-full p-1 focus:outline-none focus:ring-2 focus:ring-[#FFEDDF]"
            />
          </div>

          {/* custom select */}
          <div className="relative w-full flex mt-2" ref={dropdownRef}>
            <label className="block capitalize p-2 bg-[#FFEDDF] font-semibold text-sm sm:text-base rounded-t-lg">
              Select Students
            </label>

            <div
              className="border flex-1 p-2 flex justify-between items-center cursor-pointer rounded-b-lg bg-white"
              onClick={() => setOpen(!open)}
            >
              <div className="flex flex-wrap gap-1">
                {selected.length > 0 ? (
                  selected.map((s: string) => (
                    <span
                      key={s}
                      className="bg-[#FFEDDF] px-2 py-1 rounded text-sm capitalize"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">
                    Choose students...
                  </span>
                )}
              </div>
              <BiChevronDown
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </div>

            {open && (
              <div className="absolute top-full left-0 z-10 w-full bg-white rounded-b-lg shadow-md max-h-40 overflow-y-auto animate__animated animate__fadeIn">
                {dataStudents.map((student) => (
                  <div
                    key={student}
                    className={`p-2 cursor-pointer border-b border-gray-100 hover:bg-[#FFEDDF] capitalize ${
                      selected.includes(student) ? "bg-[#FFEDDF]" : ""
                    }`}
                    onClick={() => toggleStudent(student)}
                  >
                    {student}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* footer */}
          <div className="flex flex-row-reverse">
            <button
              type="submit"
              disabled={isLoading}
              form="groupForm"
              className="px-4 cursor-pointer py-1.5 rounded-xl bg-[#FFEDDF] hover:bg-[#ffd6b8] transition font-medium"
            >
              {isLoading ? "... Loading" : "✔ Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
