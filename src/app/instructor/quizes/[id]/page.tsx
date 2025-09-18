"use client";
import { FaCalendarAlt, FaClock, FaEdit } from "react-icons/fa";
import "animate.css";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizAsyncThunk } from "@/redux/Features/getQuizzes";
import AddAndEditQuiz from "@/components/addAndEditQuiz/addAndEditQuiz";
import { show } from "@/redux/Features/createQuiz";

export default function QuizCard() {
   const params = useParams();
  const id = params?.id as string;

  const dispatch = useDispatch();
  const { data: quizzes } = useSelector((state: any) => state.getQuiz);

  const quiz = quizzes?.find((q: any) => q._id === id);

  useEffect(() => {
    
    if (!quizzes || quizzes.length === 0) {
      dispatch(getQuizAsyncThunk() as any);
    }
  }, [dispatch, quizzes]);

  if (!quiz) return <p>Loading...</p>;

  const dateString = quiz.schadule;
  const dateObj = new Date(dateString);

  const datePart = dateObj.toISOString().split("T")[0];

  const timePart = dateObj.toISOString().split("T")[1].slice(0,5);

  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-5 animate__animated animate__fadeInUp">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 capitalize">
          {quiz.title}
        </h2>

        {/* Date & Time */}
        <div className="flex items-center text-gray-600 text-sm gap-4 mb-4">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-orange-500" />
            <span>{datePart}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-orange-500" />
            <span>{timePart}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex justify-between items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">Duration</span>
          <span className="text-gray-800">{quiz.duration} minutes</span>
        </div>
        {/* Code */}
        <div className="flex justify-between items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">Code</span>
          <span className="text-gray-800">{quiz.code} </span>
        </div>

        {/* Number of questions */}
        <div className="flex justify-between items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">Number of questions</span>
          <span className="text-gray-800">{quiz.questions_number}</span>
        </div>

        {/* Score */}
        <div className="flex justify-between items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">Score per question</span>
          <span className="text-gray-800">{quiz.score_per_question}</span>
        </div>

        {/* Description */}
      
        <div className="flex flex-wrap justify-between items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium w-full">Description</span>
          <span className="text-gray-800">{quiz.description}</span>
        </div>
        {/* Question bank */}
        <div className="flex justify-between flex-wrap items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">Question bank used</span>
          <span className="text-gray-800">{quiz.type}</span>
        </div>

        {/* Randomize */}
        <div className="flex items-center gap-2 mb-4 select-none cursor-pointer">
          <input type="checkbox"  id="randomize" className="w-4 h-4 cursor-pointer" defaultChecked />
          <label htmlFor="randomize" className="text-gray-700 cursor-pointer">Randomize questions</label>
        </div>

        {/* Edit Button */}
        <button 
        onClick={()=> dispatch(show())}
        className="cursor-pointer flex items-center gap-2 w-full justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
          <FaEdit /> Edit
        </button>
      </div>




       <AddAndEditQuiz
          dataUpdate={quiz}
          isEdit = {true}
        />
    </div>
  );
}
