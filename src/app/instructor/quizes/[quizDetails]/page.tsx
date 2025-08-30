"use client";

import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export default function QuizCard() {
  return (
    <div
      className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-4 space-y-4 animate__animated animate__fadeInUp"
    >
      {/* العنوان */}
      <h2 className="text-lg font-semibold text-gray-800">
        Data Structures Quiz One
      </h2>

      {/* التاريخ والوقت */}
      <div className="flex items-center gap-4 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <FaRegCalendarAlt className="text-gray-500" />
          <span>12 / 03 / 2023</span>
        </div>
        <div className="flex items-center gap-1">
          <FaRegClock className="text-gray-500" />
          <span>09 : 00</span>
        </div>
      </div>

      {/* المدة */}
      <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
        <span className="text-gray-600">Duration</span>
        <span className="font-medium">10 minutes</span>
      </div>

      {/* عدد الأسئلة */}
      <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
        <span className="text-gray-600">Number of questions</span>
        <span className="font-medium">15</span>
      </div>

      {/* الدرجة لكل سؤال */}
      <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
        <span className="text-gray-600">Score per question</span>
        <span className="font-medium">1</span>
      </div>

      {/* الوصف */}
      <div>
        <span className="block text-gray-600 mb-1">Description</span>
        <p className="bg-orange-100 text-gray-700 rounded-lg p-2 text-sm">
          Lorem ipsum aset amet consectetur im nascsa assadcqw asasscc aidwqdjv
          asdewfas qwdass Lorem ipsum aset amet consectetur im nascsa assadcqw
          asasscc aidwqdjv
        </p>
      </div>

      {/* بنك الأسئلة */}
      <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
        <span className="text-gray-600 text-center">Question bank used</span>
        <span className="font-medium">Bank one</span>
      </div>

      {/* Randomize */}
      <div className="flex items-center gap-2">
        <input type="checkbox" defaultChecked className="w-4 h-4" />
        <span className="text-gray-700 text-sm">Randomize questions</span>
      </div>

      {/* زرار Edit */}
      <button
        className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-xl shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <FiEdit /> Edit
      </button>
    </div>
  );
}
