"use client";

import Image from "next/image";
import { FaArrowRight, FaArrowLeft, FaUser } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topStudentAsyncThunk } from "@/redux/Features/topStudents";
import { StudentAsyncThunk } from "@/redux/Features/getStudent";
import TableSkeleton from "../loading/tableSkeletonLoader";
import StudentModal from "../singleStudent";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/store";

interface studentsType {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avg_score: number;
  group: { name: string };
  img?: string;
}

export default function TopStudents() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const { data, isLoading } = useSelector((state: any) => state.Student);
  const { t, i18n } = useTranslation();

  const direction = i18n.dir(); 

  useEffect(() => {
    dispatch(topStudentAsyncThunk());
    dispatch(StudentAsyncThunk());
  }, [dispatch]);

  if (isLoading) return <TableSkeleton cols={1} rows={5} />;

  const getFiveTopStudents = () => {
    const withAvg = data.filter((s: studentsType) => typeof s.avg_score === "number");
    const sorted = withAvg.sort((a: studentsType, b: studentsType) => (b.avg_score ?? 0) - (a.avg_score ?? 0));
    return sorted.slice(0, 5);
  };

  const ArrowIcon = direction === "rtl" ? FaArrowLeft : FaArrowRight;

  return (
    <div className="bg-white rounded-2xl shadow p-4 animate__animated animate__fadeInRight">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{t("topStudents.title")}</h2>
        <Link
          href={"/instructor/student/students"}
          className="text-green-600 text-sm flex items-center gap-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:text-green-700"
        >
          {t("topStudents.allStudents")} <ArrowIcon />
        </Link>
      </div>

      <div className="space-y-3">
        {getFiveTopStudents().map((student: studentsType) => (
          <div
            key={student._id}
            onClick={() => setSelectedStudent(student)}
            className="flex items-center justify-between bg-gray-50 rounded-xl p-3"
          >
            <div className="flex items-center gap-3">
              {student?.img ? (
                <Image
                  src={student.img || "/test student.jpg"}
                  alt={student.first_name}
                  width={56}
                  height={56}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUser size={50} color="#999" />
              )}
              <div>
                <h3 className="text-gray-800 font-medium text-sm capitalize">
                  {student.first_name + " " + student.last_name}
                </h3>
                <p className="text-gray-500 text-xs">
                  {t("topStudents.avgScore")}: {student.avg_score || 0}
                </p>
              </div>
            </div>

            <ArrowIcon className="text-gray-600 transition-all duration-300 hover:scale-105 hover:text-gray-950 cursor-pointer" />
          </div>
        ))}
      </div>

      <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
}
