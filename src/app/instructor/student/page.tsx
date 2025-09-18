"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaUser } from "react-icons/fa";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { StudentAsyncThunk } from "@/redux/Features/getStudent";
import { groupAsyncThunk } from "@/redux/Features/getGroup";
import { singleStudentAsyncThunk } from "@/redux/Features/singleStudent";

interface TypeGroup {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
}
/***  
 * [
    {
        "_id": "68ad68a944dab7b8cb0c919d",
        "first_name": "hamza",
        "last_name": "Mohamed",
        "email": "hamza.mo161@gmail.com",
        "status": "active",
        "role": "Student",
        "group": {
            "_id": "68bea1ed5358146037d4bb1b",
            "name": "data analysis",
            "status": "active",
            "instructor": "688a0cd644dab7b8cb0431dd",
            "students": [
                "68ad68a944dab7b8cb0c919d"
            ],
            "max_students": 25,
            "updatedAt": "2025-09-08T11:17:18.048Z",
            "createdAt": "2025-09-08T09:29:17.534Z",
            "__v": 0
        }
    }
]
 */
interface TypeStudent {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status?: string;
  score?: string;
  img?: string;
}

export default function StudentsList() {
  const [activeGroup, setActiveGroup] = useState("");
  const [studentsGroup, setStudentsGroup] = useState<TypeStudent[]>([]);

  const { data: groups, isLoading: isLoadingGroup } = useSelector(
    (state: any) => state.Group
  );
  const { data: allStudents, isLoading: isLoadingAllStudents } = useSelector(
    (state: any) => state.Student
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(groupAsyncThunk() as any);
    dispatch(StudentAsyncThunk() as any);
  }, [dispatch]);

  const handleGroupClick = (group: TypeGroup) => {
    setActiveGroup(group.name);

    if (allStudents?.length) {
      const filtered = allStudents.filter((student: TypeStudent) =>
        group.students.includes(student._id)
      );
      console.log(filtered);
      
      setStudentsGroup(filtered);
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow animate__animated animate__fadeIn">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Students list
      </h2>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {groups?.map((group: TypeGroup) => (
          <button
            key={group._id}
            onClick={() => handleGroupClick(group)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeGroup === group.name
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } cursor-pointer capitalize`}
          >
            {group.name}
          </button>
        ))}
      </div>

      {/* Students List */}
      <div className="grid md:grid-cols-2 gap-4">
        {studentsGroup?.length ? (
          studentsGroup.map((student) => (
            <div
              key={student._id}
              className="flex items-center justify-between rounded-xl border p-3 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] animate__animated animate__fadeInUp"
            >
              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-gray-200">
                  {student?.img ?
                    <Image
                      src={student.img || "/test student.jpg"}
                      alt={student.first_name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                   :<FaUser size={50} color="#999"/>
                   }
                </div>
                <div>
                  <h3 className="capitalize text-gray-800 font-medium text-sm">
                    {student.first_name} {student.last_name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                   email : {student.email || "-"} 
                  </p>
                  <p className="text-gray-500 text-xs">
                   status : {student.status || "-"}  
                  </p>
                </div>
              </div>

              {/* Icon */}
              <FaArrowRight className="text-gray-700 transition-all duration-300 group-hover:translate-x-1" />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-2 text-center">
            {activeGroup
              ? "No students found in this group."
              : "Please select a group."}
          </p>
        )}
      </div>

     
    </div>
  );
}
