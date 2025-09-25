"use client";
import Image from "next/image";
import ImageError from "/public/upcommingQuiz.png";
import { useDispatch, useSelector } from "react-redux";
import { firstFiveInCommingAsyncThunk } from "@/redux/Features/firstFiveIncommingQuiz";
import { useEffect } from "react";
import TableSkeleton from "../loading/tableSkeletonLoader";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "@/redux/store";

type QuizCardProps = {
  title: string;
  schadule: string;
  participants: number;
  image: string;
  status?: string;
  _id?: string;
};

const QuizCard = ({ title, schadule, image, participants }: QuizCardProps) => {
  const { t } = useTranslation();
  const dateString = schadule;
  const dateObj = new Date(dateString);

  const datePart = dateObj.toISOString().split("T")[0];
  const timePart = dateObj.toISOString().split("T")[1].slice(0, 5);

  return (
    <div
      className="
      w-[300px]
        flex flex-col sm:flex-row items-center px-2.5 gap-4 py-4 rounded-xl border border-gray-200 
        bg-white shadow-sm hover:shadow-md hover:scale-[1.02]
        transition-all duration-300 animate__animated animate__fadeInUp
      "
    >
      {/* Image */}
      <div className="w-16 h-16 relative flex-shrink-0">
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
          {t("upcomingQuizzes_studentsEnrolled")}{" "}
          <span className="font-medium">{participants}</span>
        </p>
      </div>
    </div>
  );
};

export default function UpcomingQuizzes() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector(
    (state: RootState) => state.firstFiveInCommingSlice
  );

  useEffect(() => {
    dispatch(firstFiveInCommingAsyncThunk());
  }, [dispatch]);

  if (isLoading) return <TableSkeleton cols={1} rows={4} />;

  return (
    <section className="flex flex-1 flex-wrap justify-start max-w-3xl px-1 sm:px-3 mt-4 mb-4">
      <h2 className="w-full capitalize text-lg font-bold mb-4 text-gray-800">
        {t("upcomingQuizzes_title")}
      </h2>
      <div className=" space-y-4 w-auto flex gap-1 justify-between flex-wrap">
        {data.map((quiz: QuizCardProps, index: number) => (
          <QuizCard key={index} {...quiz} />
        ))}
      </div>
    </section>
  );
}
