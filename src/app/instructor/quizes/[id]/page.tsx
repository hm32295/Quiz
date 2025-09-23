"use client";
import { FaCalendarAlt, FaClock, FaEdit } from "react-icons/fa";
import "animate.css";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizAsyncThunk } from "@/redux/Features/getQuizzes";
import { setData, showEdit } from "@/redux/Features/createQuiz";
import TableSkeleton from "@/components/loading/tableSkeletonLoader";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "@/redux/store";


interface typeQuiz{
  schadule : string;
  title : string;
  duration : string;
  code : string;
  questions_number : string;
  score_per_question : string;
  description : string;
  type : string;
}
export default function QuizCard() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params?.id as string;

  const dispatch = useDispatch<AppDispatch>();
  const { data: quizzes, isLoading } = useSelector((state: RootState) => state.getQuiz);

  const quiz:typeQuiz = quizzes?.find((q: {_id:string}) => q._id === id)?? {
  
  schadule: "",
  title: "",
  duration: "",
  code: "",
  questions_number: "",
  score_per_question: "",
  description: "",
  type: ""
};

  useEffect(() => {
    if (!quizzes || quizzes.length === 0) {
      dispatch(getQuizAsyncThunk());
    }
  }, [dispatch, quizzes]);

  if (!quiz || isLoading)
    return (
      <div className="flex justify-center">
        <div className="w-72 max-w-72 mt-10">
          <TableSkeleton cols={1} rows={5} />
        </div>
      </div>
    );

  const dateString = quiz.schadule;
  const dateObj = new Date(dateString);

  const datePart = dateObj.toISOString().split("T")[0];
  const timePart = dateObj.toISOString().split("T")[1].slice(0, 5);

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
          <span className="text-gray-700 font-medium">
            {t("quizCard_duration")}
          </span>
          <span className="text-gray-800">{quiz.duration} minutes</span>
        </div>

        {/* Code */}
        <div className="flex justify-between items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">
            {t("quizCard_code")}
          </span>
          <span className="text-gray-800">{quiz.code} </span>
        </div>

        {/* Number of questions */}
        <div className="flex justify-between items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">
            {t("quizCard_questionsNumber")}
          </span>
          <span className="text-gray-800">{quiz.questions_number}</span>
        </div>

        {/* Score */}
        <div className="flex justify-between items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">
            {t("quizCard_scorePerQuestion")}
          </span>
          <span className="text-gray-800">{quiz.score_per_question}</span>
        </div>

        {/* Description */}
        <div className="flex flex-wrap justify-between items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium w-full">
            {t("quizCard_description")}
          </span>
          <span className="text-gray-800">{quiz.description}</span>
        </div>

        {/* Question bank */}
        <div className="flex justify-between flex-wrap items-center mb-3 bg-orange-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">
            {t("quizCard_questionBank")}
          </span>
          <span className="text-gray-800">{quiz.type}</span>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => {
            dispatch(setData(quiz));
            dispatch(showEdit());
          }}
          className="cursor-pointer flex items-center gap-2 w-full justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <FaEdit /> {t("quizCard_edit")}
        </button>
      </div>
    </div>
  );
}
