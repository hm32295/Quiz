"use client";

import { singleQuizAsyncThunk } from "@/redux/Features/singleQuiz";
import React, { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import "animate.css";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { submitQuizAsyncThunk } from "@/redux/Features/submitQuiz";
import QuizResults from "@/components/quizResults/quizResults";
import TableSkeleton from "@/components/loading/tableSkeletonLoader";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";



export default function QuizPage() {
  const { t } = useTranslation();
  const params = useParams();        
  const id = params?.id as string;

  const questions: any[] | null = null; 
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector((state: any) => state.singleQuiz);

  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const qs = questions || data?.data?.questions;
  const total = qs?.length || 0;
  const progress = total ? Math.round(((currentIndex + 1) / total) * 100) : 0;

  useEffect(() => {
    if (id) {
      dispatch(singleQuizAsyncThunk(id));
    }
  }, [id, dispatch]);

  const handleSelect = (question: string, option: string) => {
    setAnswers((prev) => {
      const exist = prev.find((a) => a.question === question);
      if (exist) {
        return prev.map((a) =>
          a.question === question ? { ...a, answer: option } : a
        );
      }
      return [...prev, { question, answer: option }];
    });
  };

  const getAnswer = (question: string) =>
    answers.find((a) => a.question === question)?.answer || "";

  const showAnswers = () => setSubmitted(true);

  const handelSubmit = async () => {
    if (answers.length) {
      const res = await dispatch(
        submitQuizAsyncThunk({ id, data: answers } as any)
      );
      if (res.payload) {
        setResultData(res.payload);
        setShowResult(true);
      }
    }
    setSubmitted(false);
  };

  if (isLoading || !qs || qs.length === 0) {
    return <TableSkeleton rows={3} cols={2} />;
  }

  if (submitted) {
    return (
      <div className="animate__animated animate__fadeIn bg-white p-6 rounded-xl shadow-md text-center max-w-2xl mx-auto mt-10">
        <h2 className="text-3xl font-bold text-emerald-600 mb-6">
          {t("quizTakingPage.submittedTitle")}
        </h2>
        <p className="text-slate-600 mb-6">
          {t("quizTakingPage.submittedText", {
            answered: answers.length,
            total: qs.length,
          })}
        </p>

        <div className="space-y-4 text-left">
          {qs.map((q, i) => {
            const ans = answers.find((a) => a.question === q._id);
            return (
              <div
                key={q._id}
                className="animate__animated animate__fadeInUp bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-semibold text-slate-800 mb-2">
                  {i + 1}. {q.title}
                </h3>
                {ans ? (
                  <p className="flex items-center gap-2 text-emerald-600 font-medium">
                    <FaCheckCircle className="text-emerald-500" />
                    {t("quizTakingPage.yourAnswer")}{" "}
                    <span className="text-slate-800">
                      {q.options[ans.answer]}
                    </span>
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-slate-500 italic">
                    <FaRegCircle className="text-slate-400" />
                    {t("quizTakingPage.noAnswer")}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setCurrentIndex(0);
            setAnswers([]);
          }}
          className="mt-8 capitalize mr-1.5 px-6 py-3 cursor-pointer bg-slate-600 hover:bg-slate-700 text-white rounded-lg shadow-md"
        >
          {t("quizTakingPage.retake")}
        </button>

        <button
          onClick={handelSubmit}
          className="mt-8 capitalize mr-1.5 px-6 py-3 cursor-pointer bg-slate-600 hover:bg-slate-700 text-white rounded-lg shadow-md"
        >
          {t("quizTakingPage.submit")}
        </button>
      </div>
    );
  }

  if (showResult && resultData) {
    return <QuizResults attempt={resultData} studentAnswers={answers} />;
  }

  const current = qs[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      <div className="w-full bg-slate-200 rounded-full h-3 mb-6">
        <div
          className="bg-emerald-500 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-slate-600 mb-4 text-right">
        {t("quizTakingPage.progress", {
          current: currentIndex + 1,
          total: total,
        })}
      </p>

      <div className="animate__animated animate__fadeInUp bg-white shadow-md rounded-xl p-5 border">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          {currentIndex + 1}. {current.title}
        </h3>
        <div className="grid gap-3">
          {Object.entries(current.options).map(([key, value], i) => {
            const selected = getAnswer(current._id) === key;
            return key !== "_id" ? (
              <label
                key={`${current._id}-${key}-${i}`}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${
                  selected
                    ? "bg-emerald-50 border-emerald-400"
                    : "bg-slate-50 border-slate-200 hover:border-emerald-300"
                }`}
              >
                <span className="font-medium text-slate-700">{value}</span>
                <input
                  type="radio"
                  name={current._id}
                  value={key}
                  checked={selected}
                  onChange={() => handleSelect(current._id, key)}
                  className="hidden"
                />
                {selected ? (
                  <FaCheckCircle className="text-emerald-500 text-xl" />
                ) : (
                  <FaRegCircle className="text-slate-400 text-xl" />
                )}
              </label>
            ) : null;
          })}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-lg shadow ${
            currentIndex === 0
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-slate-600 hover:bg-slate-700 text-white"
          } capitalize cursor-pointer`}
        >
          {t("quizTakingPage.previous")}
        </button>

        {currentIndex < total - 1 ? (
          <button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(prev + 1, total - 1))
            }
            className="px-4 py-2 capitalize cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow"
          >
            {t("quizTakingPage.next")}
          </button>
        ) : (
          <button
            onClick={showAnswers}
            className="px-4 py-2 capitalize cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow animate__animated animate__pulse animate__infinite"
          >
            {t("quizTakingPage.submitQuiz")}
          </button>
        )}
      </div>
    </div>
  );
}
