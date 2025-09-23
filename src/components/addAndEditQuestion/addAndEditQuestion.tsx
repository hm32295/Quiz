"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addQuestionAsyncThunk } from "@/redux/Features/addQuestion";
import { QuestionAsyncThunk } from "@/redux/Features/questionApi";
import { editQuestionAsyncThunk } from "@/redux/Features/editQuestion";
import Spinner from "../loading/spinnerComponent";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/store";

interface OptionType {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface DataSingleType {
  _id?: string;
  title?: string;
  description?: string;
  options?: OptionType;
  A?: string;
  B?: string;
  C?: string;
  D?: string;
  answer?: string;
  difficulty?: string;
  type?: string;
}

interface DataType {
  Title: string;
  data: DataSingleType;
}

interface QuestionModalProps {
  isOpen: boolean;
  dataSingle?: DataType | undefined;
  onClose: () => void;
  edit: boolean;
}

export default function AddAndEditQuestion({
  isOpen,
  edit,
  onClose,
  dataSingle,
}: QuestionModalProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<DataSingleType>();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const fieldRequired = {
    required:
      t("questionsPageAddEdit.validation.required") || "This field is required",
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const onSubmit = async (data: DataSingleType) => {
    setLoading(true);
    const dataForm: DataSingleType = {
      title: data.title,
      description: data.description,
      options: {
        A: data.options?.A || data.A || "",
        B: data.options?.B || data.B || "",
        C: data.options?.C || data.C || "",
        D: data.options?.D || data.D || "",
      },
      answer: data.answer,
      difficulty: data.difficulty,
      type: data.type,
    };

    try {
      let response;
      if (!edit) {
        response = await dispatch(addQuestionAsyncThunk(dataForm));
      } else if (edit && dataSingle?.data?._id) {
        response = await dispatch(
          editQuestionAsyncThunk({ dataForm, id: dataSingle.data._id,} )
        );
      }

      if (response?.payload?.message) {
        toast.success(
          response.payload.message ||
            t("questionsPageAddEdit.toast.successAdd")
        );
        reset();
        onClose();
      } else if (response?.payload) {
        toast.error(response.payload || t("questionsPageAddEdit.toast.error"));
      }
    } catch (error) {
      console.error(error);
      toast.error(
        t("questionsPageAddEdit.toast.error") || "Something went wrong"
      );
    } finally {
      setLoading(false);
      dispatch(QuestionAsyncThunk());
    }
  };

  useEffect(() => {
    const defaults: DataSingleType = edit
      ? dataSingle?.data || {}
      : {
          title: "",
          description: "",
          options: { A: "", B: "", C: "", D: "" },
          answer: "",
          difficulty: "",
          type: "",
        };

    reset({
      title: defaults.title,
      description: defaults.description,
      A: defaults.options?.A,
      B: defaults.options?.B,
      C: defaults.options?.C,
      D: defaults.options?.D,
      answer: defaults.answer,
      difficulty: defaults.difficulty,
      type: defaults.type,
    });
  }, [edit, reset, dataSingle]);

  if (!isOpen) return null;

  const answerOptions =
    (t("questionsPageAddEdit.options.answers", { returnObjects: true }) as
      | string[]
      | undefined) || ["A", "B", "C", "D"];
  const difficultyOptions =
    (t("questionsPageAddEdit.options.difficulties", {
      returnObjects: true,
    }) as string[] | undefined) || ["easy", "medium", "hard"];
  const categoryOptions =
    (t("questionsPageAddEdit.options.categories", {
      returnObjects: true,
    }) as string[] | undefined) || ["FE", "BE", "DO"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-fadeIn"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-h-screen sm:w-[90%] md:w-[700px] bg-white shadow-2xl rounded-xl p-4 sm:p-6 overflow-y-auto animate-slideUp"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-1 mb-3">
          <h2 className="text-lg md:text-xl font-bold capitalize">
            {edit
              ? t("questionsPageAddEdit.modal.editTitle")
              : t("questionsPageAddEdit.modal.addTitle")}
          </h2>
          <button
            onClick={onClose}
            aria-label={t("questionsPageAddEdit.modal.closeBtnAria")}
            className="cursor-pointer text-gray-600 hover:text-red-500 text-[18px]"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <form
          id="questionForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          {/* Title */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <label className="p-2 bg-[#FFEDDF] font-semibold">
              {t("questionsPageAddEdit.fields.title")}
            </label>
            <input
              {...register("title", fieldRequired)}
              disabled={loading}
              className="w-full p-1 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <label className="p-2 bg-[#FFEDDF] font-semibold">
              {t("questionsPageAddEdit.fields.description")}
            </label>
            <textarea
              {...register("description", fieldRequired)}
              disabled={loading}
              rows={3}
              className="w-full p-2 focus:outline-none"
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-2">
            {answerOptions.map((opt) => (
              <div
                key={opt}
                className="flex items-center border rounded-lg overflow-hidden"
              >
                <label className="p-2 bg-[#FFEDDF] font-semibold">
                  {t("questionsPageAddEdit.fields.optionLabel", { option: opt })}
                </label>
                <input
                  {...register(opt as keyof DataSingleType, fieldRequired)}
                  disabled={loading}
                  className="w-full p-1 focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Answer */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <label className="p-2 bg-[#FFEDDF] font-semibold">
              {t("questionsPageAddEdit.fields.rightAnswer")}
            </label>
            <select
              {...register("answer", fieldRequired)}
              disabled={loading}
              className="w-full p-2 capitalize"
            >
              <option value="">
                {t("questionsPageAddEdit.fields.selectRightAnswer")}
              </option>
              {answerOptions.map((ele) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <label className="p-2 bg-[#FFEDDF] font-semibold">
              {t("questionsPageAddEdit.fields.difficulty")}
            </label>
            <select
              {...register("difficulty", fieldRequired)}
              disabled={loading}
              className="w-full p-2 capitalize"
            >
              <option value="">
                {t("questionsPageAddEdit.fields.selectDifficulty")}
              </option>
              {difficultyOptions.map((ele) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <label className="p-2 bg-[#FFEDDF] font-semibold">
              {t("questionsPageAddEdit.fields.category")}
            </label>
            <select
              {...register("type", fieldRequired)}
              disabled={loading}
              className="w-full p-2 capitalize"
            >
              <option value="">
                {t("questionsPageAddEdit.fields.selectCategory")}
              </option>
              {categoryOptions.map((ele) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="flex flex-row-reverse">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1.5 cursor-pointer rounded-xl bg-[#FFEDDF] hover:bg-[#ffd6b8] transition"
            >
              {loading ? (
                <Spinner />
              ) : edit ? (
                t("questionsPageAddEdit.fields.edit")
              ) : (
                t("questionsPageAddEdit.fields.save")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
