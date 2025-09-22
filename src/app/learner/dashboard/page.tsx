"use client";
import ActionsPanel from "@/components/actionsPanelQuiz/actionsPanelQuiz";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import JoinQuizModal from "@/components/joinQuizModal/joinQuizModal";
import TableSkeleton from "@/components/loading/tableSkeletonLoader";
import UpcomingQuizzes from "@/components/upcomingQuizzes/upcomingQuizzes";
import { ColumnsHederTableInQuizzes } from "@/interfaces/interfaces";
import { lastFiveCompletedQuizAsyncThunk } from "@/redux/Features/lastFiveCompletedQuiz";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  const columns: ColumnsHederTableInQuizzes[] = [
    { key: "Title", label: t("dashboardQuizzes.columns.title") },
    { key: "Question", label: t("dashboardQuizzes.columns.question") },
    { key: "level", label: t("dashboardQuizzes.columns.level") },
    { key: "Date", label: t("dashboardQuizzes.columns.date") },
  ];

  const [setDataSingle] = useState({});
  const [openModelJoinQuiz, setOpenModelJoinQuiz] = useState(false);


  const dispatch = useDispatch();
  const { data: dataQuizCompleted, isLoading } = useSelector(
    (state) => state.lastFiveCompletedQuizSlice
  );

  useEffect(() => {
    dispatch(lastFiveCompletedQuizAsyncThunk() as any);
  }, [dispatch]);

  if (isLoading) return <TableSkeleton />;

  const handelDataToRead = () => {
    if (!dataQuizCompleted) return;

    return dataQuizCompleted.map((quiz) => {
      return {
        Title: quiz.title,
        Question: quiz.questions.length,
        level: quiz.difficulty,
        Date: quiz.schadule,
        ...quiz,
      };
    });
  };

  return (
    <div className="p-2.5">
      <JoinQuizModal
        isOpen={openModelJoinQuiz}
        onClose={() => setOpenModelJoinQuiz(false)}
      />

      <ActionsPanel
        onClick={() => setOpenModelJoinQuiz(true)}
        type="student"
      />

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
