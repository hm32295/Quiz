"use client";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import "animate.css";
import AddAndEditGroup from "@/components/addAndEditGroup/addAndEditGroup";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Group {
  id: number;
  name: string;
  students: number;
}

const groups: Group[] = [
  { id: 1, name: "JSB Angular", students: 20 },
  { id: 2, name: "JSB React", students: 20 },
  { id: 3, name: "FE Fundamentals", students: 20 },
  { id: 8, name: "FE Fundamentals", students: 20 },
  { id: 6, name: "FE Fundamentals", students: 20 },
  { id: 7, name: "FE Fundamentals", students: 20 },
  { id: 4, name: "name", students: 20 },
  { id: 5, name: "name", students: 20 },
];

export default function GroupsList() {
  const {register, handleSubmit,watch ,setValue} = useForm()
  const [openModelEditAndAdd,setOpenModelEditAndAdd] = useState(false);
  

  const onSubmit =(data)=>{
    
    
    console.log(data);
    setOpenModelEditAndAdd(false)
    
  }
  return (
    <div className="p-6 max-w-5xl mx-auto">
          <div className="flex justify-between p-3 ">
            <h2 className="font-bold capitalize">Groups list</h2>
            <button
            onClick={()=>{setOpenModelEditAndAdd(true)}} className="flex items-center gap-1 cursor-pointer">
              <FaPlusCircle  />
              Add Question
            </button>
          </div>
            {/* grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="animate__animated animate__fadeInUp flex justify-between items-center border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      Group : {group.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      No. of students : {group.students}
                    </p>
                  </div>

                  <div className="flex gap-3 text-gray-600">
                    <button className="hover:text-blue-500 cursor-pointer transition duration-200">
                      <FaEdit size={18} />
                    </button>
                    <button className="hover:text-red-500 cursor-pointer transition duration-200">
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <AddAndEditGroup
                      setValue={setValue}
                      isOpen={openModelEditAndAdd}
                      watch={watch}
                      onClose={() => setOpenModelEditAndAdd(false)}
                      register={register}
                      isLoading={false}
                      onSubmit={handleSubmit(onSubmit)}
                    />
    </div>
  );
}
