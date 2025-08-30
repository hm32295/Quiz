"use client";

import { FaArrowRight } from "react-icons/fa";
import "animate.css";
import Image from "next/image";

const quizzes = [
  {
    id: 1,
    title: "Introduction to computer programming",
    date: "12 / 03 / 2023",
    time: "09:00 AM",
    students: 32,
    img: "/test quiz.png",
  },
  {
    id: 2,
    title: "Psychology 101",
    date: "27 / 03 / 2023",
    time: "12:00 PM",
    students: 17,
    img: "/test quiz.png",
  },
];

const students = [
  {
    id: 1,
    name: "Emmanuel James",
    rank: "2nd",
    score: "87%",
    img: "/test student.jpg",
  },
  {
    id: 2,
    name: "Alice Jasmine",
    rank: "12th",
    score: "69%",
    img: "/test student.jpg",
  },
  {
    id: 3,
    name: "Harrison Menlaye",
    rank: "17th",
    score: "60%",
    img: "/test student.jpg",
  },
  {
    id: 4,
    name: "Jones Doherty",
    rank: "5th",
    score: "80%",
    img: "/test student.jpg",
  },
];

export default function Dashboard() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 p-4">
      {/* Upcoming Quizzes */}
      <div className="bg-white rounded-2xl shadow p-4 animate__animated animate__fadeInLeft">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Upcoming {quizzes.length} quizzes
          </h2>
          <button className="text-green-600 text-sm flex items-center gap-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:text-green-700">
            Quiz directory <FaArrowRight />
          </button>
        </div>

        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="flex justify-center flex-col sm:flex-row items-center gap-3 bg-gray-50 rounded-xl p-3"
            >
              {/* صورة */}
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={quiz.img}
                  alt={quiz.title}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* تفاصيل */}
              <div className="flex-1">
                <h3 className="text-gray-800 font-medium text-sm sm:text-base">
                  {quiz.title}
                </h3>
                <p className="text-gray-500 text-xs">
                  {quiz.date} | {quiz.time}
                </p>
                <p className="text-gray-500 text-xs">
                  No. of student’s enrolled: {quiz.students}
                </p>
              </div>

              {/* زر Open */}
              <button className="text-green-600 flex items-center gap-1 text-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:text-green-700">
                Open <FaArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Top Students */}
      <div className="bg-white rounded-2xl shadow p-4 animate__animated animate__fadeInRight">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Top 5 Students</h2>
          <button className="text-green-600 text-sm flex items-center gap-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:text-green-700">
            All Students <FaArrowRight />
          </button>
        </div>

        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between bg-gray-50 rounded-xl p-3"
            >
              
              <div className="flex items-center gap-3">
                <Image
                  src={student.img}
                  width={40}
                  height={40}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-gray-800 font-medium text-sm">
                    {student.name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Class rank: {student.rank} | Average score: {student.score}
                  </p>
                </div>
              </div>


              <FaArrowRight className="text-gray-600 transition-all duration-300 hover:scale-105 hover:text-gray-950 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
