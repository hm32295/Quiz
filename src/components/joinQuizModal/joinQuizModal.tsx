"use client";

import { joinQuizAsyncThunk } from "@/redux/Features/joinQuiz";
import "animate.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type JoinQuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface typeSubmit {
  code: string;
}

export default function JoinQuizModal({ isOpen, onClose }: JoinQuizModalProps) {
  const { register, handleSubmit, reset } = useForm<typeSubmit>();
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const submit = async (data: typeSubmit) => {
    try {
      const res = await dispatch(joinQuizAsyncThunk(data)).unwrap();

      if (res?.data?.quiz) {
        const quizId = res.data.quiz;
        router.push(`/learner/quizzes/${quizId}`);
      }

      onClose();
      reset({ code: "" });
    } catch (err) {
      console.error("Error joining quiz:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate__animated animate__fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md text-center animate__animated animate__zoomIn"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Quiz</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Input the code received for the quiz below to join
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex items-center border rounded-lg overflow-hidden mb-6">
            <span className="bg-orange-100 px-4 py-2 text-gray-700 font-semibold">
              Code
            </span>
            <input
              type="text"
              {...register("code", { required: "The field is required" })}
              placeholder="Enter quiz code"
              className="flex-1 px-3 py-2 focus:outline-none text-gray-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              className="bg-green-500 cursor-pointer text-white py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
              ✓
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 cursor-pointer text-white py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              ✕
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
