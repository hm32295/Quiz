"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaUser } from "react-icons/fa";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { StudentAsyncThunk } from "@/redux/Features/getStudent";
import { groupAsyncThunk } from "@/redux/Features/getGroup";
import StudentModal from "@/components/singleStudent";
import { useTranslation } from "react-i18next";

interface TypeGroup {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
}

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
  const { t, i18n } = useTranslation();
  const [activeGroup, setActiveGroup] = useState("");
  const [studentsGroup, setStudentsGroup] = useState<TypeStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<TypeStudent | null>(
    null
  );

  const { data: groups } = useSelector((state: any) => state.Group);
  const { data: allStudents } = useSelector((state: any) => state.Student);

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
      setStudentsGroup(filtered);
    }
  };

  // نحدد الاتجاه
  const direction = i18n.dir();

  return (
    <div className="p-4 bg-white rounded-2xl shadow animate__animated animate__fadeIn">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t("studentsListPage.title")}
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
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-gray-200">
                  {student?.img ? (
                    <Image
                      src={student.img || "/test student.jpg"}
                      alt={student.first_name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FaUser size={50} color="#999" />
                  )}
                </div>
                <div>
                  <h3 className="capitalize text-gray-800 font-medium text-sm">
                    {student.first_name} {student.last_name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {t("studentsListPage.labels.email")}:{" "}
                    {student.email || "-"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {t("studentsListPage.labels.status")}:{" "}
                    {student.status || "-"}
                  </p>
                </div>
              </div>

              {/* Icon */}
              <div onClick={() => setSelectedStudent(student)}>
                <FaArrowRight
                  className={`cursor-pointer text-gray-700 transition-all duration-300 group-hover:translate-x-1 ${
                    direction === "rtl" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-2 text-center">
            {activeGroup
              ? t("studentsListPage.messages.noStudents")
              : t("studentsListPage.buttons.selectGroup")}
          </p>
        )}
      </div>

      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}