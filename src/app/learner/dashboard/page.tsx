"use client";
import ActionsPanel from "@/components/actionsPanelQuiz/actionsPanelQuiz";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import JoinQuizModal from "@/components/joinQuizModal/joinQuizModal";
import TableSkeleton from "@/components/loading/tableSkeletonLoader";
import UpcomingQuizzes from "@/components/upcomingQuizzes/upcomingQuizzes";
import { lastFiveCompletedQuizAsyncThunk } from "@/redux/Features/lastFiveCompletedQuiz";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "@/redux/store";

// ✅ type for row in table
interface QuizTableRow {
  _id?: string; // للتوافق مع الجدول لو بيستخدم id
  Title: string;
  Question: number;
  level: string;
  Date: string;
}

// ✅ type for column
interface ColumnHeader<T> {
  key: keyof T;
  label: string;
}

export default function Dashboard() {
  const { t } = useTranslation();

  const columns: ColumnHeader<QuizTableRow>[] = [
    { key: "Title", label: t("dashboardQuizzes.columns.title") },
    { key: "Question", label: t("dashboardQuizzes.columns.question") },
    { key: "level", label: t("dashboardQuizzes.columns.level") },
    { key: "Date", label: t("dashboardQuizzes.columns.date") },
  ];

  const [dataSingle, setDataSingle] = useState<QuizTableRow | null>(null);
  const [openModelJoinQuiz, setOpenModelJoinQuiz] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { data: dataQuizCompleted, isLoading } = useSelector(
    (state: RootState) => state.lastFiveCompletedQuizSlice
  );

  useEffect(() => {
    dispatch(lastFiveCompletedQuizAsyncThunk());
  }, [dispatch]);

  if (isLoading) return <TableSkeleton />;

  const handelDataToRead = (): QuizTableRow[] | [] => {
    if (!dataQuizCompleted) return [];

    return dataQuizCompleted.map((quiz) => ({
      _id: quiz._id,
      Title: quiz.title,
      Question: quiz.questions.length,
      level: quiz.difficulty,
      Date: quiz.schadule,
    }));
  };

  return (
    <div className="p-2.5">
      <JoinQuizModal
        isOpen={openModelJoinQuiz}
        onClose={() => setOpenModelJoinQuiz(false)}
      />

      <ActionsPanel onClick={() => setOpenModelJoinQuiz(true)} type="student" />

      <UpcomingQuizzes />

      <div className="text-lg font-bold mb-4 text-gray-800 capitalize">
        {t("dashboardQuizzes.completedQuizzes")}
      </div>

      <GenericTable
        columns={columns}
        setDataSingle={setDataSingle}
        titleItem="quiz"
        data={handelDataToRead()}
      />
    </div>
  );
}
