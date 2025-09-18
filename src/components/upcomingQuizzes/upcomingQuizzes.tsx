"use client";
import Image from "next/image";
import ImageError from "/public/upcommingQuiz.png";
import { useDispatch, useSelector } from "react-redux";
import { firstFiveInCommingAsyncThunk } from "@/redux/Features/firstFiveIncommingQuiz";
import { useEffect } from "react";
// import Link from "next/link";

type QuizCardProps = {
  title: string;
  schadule: string;
  participants: number
  image: string;
  status?:string;
  _id?:string
};

const QuizCard = ({ title, schadule, image ,participants,status,_id}: QuizCardProps) => {
    const dateString = schadule;
    const dateObj = new Date(dateString);

    const datePart = dateObj.toISOString().split("T")[0];

    const timePart = dateObj.toISOString().split("T")[1].slice(0,5);

  return (
    <div
      className="
        flex items-center gap-4 p-4 rounded-xl border border-gray-200 
        bg-white shadow-sm hover:shadow-md hover:scale-[1.02]
        transition-all duration-300 animate__animated animate__fadeInUp
      "
    >
      {/* Image */}
      <div className="w-16 h-16 relative flex-shrink-0">
        {image}
        <Image
          src={image || ImageError}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {datePart} | {timePart}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          No. of students enrolled:{" "}
          <span className="font-medium">{participants}</span>
        </p>
      </div>

      {/* Open button */}
      {/* <Link href={`/learner/quizzes/${_id}`}  className="flex items-center text-green-600 font-medium ">
       {status}
      </Link> */}
    </div>
  );
};

export default function UpcomingQuizzes() {
  const dispatch = useDispatch()
  const {data , isLoading } = useSelector(state=> state.firstFiveInCommingSlice)
 useEffect(()=>{

   dispatch(firstFiveInCommingAsyncThunk())
 },[dispatch])
        
  if(isLoading) return <div>Loading ....</div>

  return (
    <section className="max-w-3xl mx-auto px-4 mt-4 mb-4">
      <h2 className="capitalize text-lg font-bold mb-4 text-gray-800">
        Upcoming quizzes
      </h2>
      <div className="space-y-4">
        {data.map((quiz, index) => (
          <QuizCard key={index} {...quiz} />
        ))}
      </div>
    </section>
  );
}
