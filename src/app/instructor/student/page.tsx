"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import "animate.css";

const groups = ["Group 1", "Group 2", "Group 3"];

const students = [
  {
    id: 1,
    name: "Emmanuel James",
    rank: "2nd",
    score: "87%",
    img: "/test student.jpg",
    color: "bg-sky-200",
  },
  {
    id: 2,
    name: "Alice Jasmine",
    rank: "12th",
    score: "69%",
    img: "/test student.jpg",
    color: "bg-yellow-200",
  },
  {
    id: 3,
    name: "Dino Menlaye",
    rank: "17th",
    score: "60%",
    img: "/test student.jpg",
    color: "bg-black text-white",
  },
  {
    id: 4,
    name: "Jones Doherty",
    rank: "5th",
    score: "80%",
    img: "/test student.jpg",
    color: "bg-orange-300",
  },
];

export default function StudentsList() {
  const [activeGroup, setActiveGroup] = useState("Group 1");

  return (
    <div className="p-4 bg-white rounded-2xl shadow animate__animated animate__fadeIn">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Students list
      </h2>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeGroup === group
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } cursor-pointer`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Students List */}
      <div className="grid md:grid-cols-2 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className={`flex items-center justify-between rounded-xl border p-3 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] animate__animated animate__fadeInUp`}
          >
            {/* Profile */}
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center ${student.color}`}
              >
                <Image
                  src={student.img}
                  alt={student.name}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-gray-800 font-medium text-sm">
                  {student.name}
                </h3>
                <p className="text-gray-500 text-xs">
                  Class rank: {student.rank} | Average score: {student.score}
                </p>
              </div>
            </div>

            {/* Icon */}
            <FaArrowRight className="text-gray-700 transition-all duration-300 group-hover:translate-x-1" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 text-gray-600 text-sm">
        ... 1 2 3 ...
      </div>
    </div>
  );
}
