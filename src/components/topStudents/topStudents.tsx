import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
 import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { topStudentAsyncThunk } from "@/redux/Features/topStudents";
 
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


 export default function TopStudents() {
    const dispatch = useDispatch();
    const {data, isLoading} = useSelector(state=> state.topStudent)
    useEffect(()=>{
        dispatch(topStudentAsyncThunk())

    },[dispatch])
    if(isLoading) console.log(data)
   return (
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
   )
 }
 