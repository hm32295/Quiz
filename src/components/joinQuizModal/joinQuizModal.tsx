"use client";

import { joinQuizAsyncThunk } from "@/redux/Features/joinQuiz";
import "animate.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Spinner from "../loading/spinnerComponent";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";

type JoinQuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface TypeSubmit {
  code: string;
}

export default function JoinQuizModal({ isOpen, onClose }: JoinQuizModalProps) {
  const { register, handleSubmit, reset } = useForm<TypeSubmit>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { t } = useTranslation();

  const submit = async (data: TypeSubmit) => {
    setLoading(true);
    try {
      const res = await dispatch(joinQuizAsyncThunk(data)).unwrap();

      if (res.data?.quiz) {
        const quizId = res.data.quiz;
        router.push(`/learner/quizzes/${quizId}`);
      }
      toast.success('Done')
    } catch (err) {
      
      console.log(err || "err")
      
      // console.error("Error joining quiz:", err);
    } finally {
      setLoading(false);
      onClose();
      reset({ code: "" });
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t("joinQuizModal_title")}
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          {t("joinQuizModal_description")}
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex items-center border rounded-lg overflow-hidden mb-6">
            <span className="bg-orange-100 px-4 py-2 text-gray-700 font-semibold">
              {t("joinQuizModal_codeLabel")}
            </span>
            <input
              type="text"
              {...register("code", { required: t("joinQuizModal_required") })}
              placeholder={t("joinQuizModal_codePlaceholder")}
              className="flex-1 px-3 py-2 focus:outline-none text-gray-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              className="bg-green-500 cursor-pointer text-white py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
              {loading ? <Spinner /> : t("joinQuizModal_submit")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 cursor-pointer text-white py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              {t("joinQuizModal_cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
