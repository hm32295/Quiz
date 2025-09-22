"use client";
import ConfirmDeleteModal from "@/components/confirmDeleteModal/confirmDeleteModal";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import { ColumnsHederTableInQuizzes } from "@/interfaces/interfaces";
import { deleteQuizAsyncThunk } from "@/redux/Features/deleteQuiz";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpcomingQuizzes from "@/components/upcomingQuizzes/upcomingQuizzes";
import ActionsPanel from "@/components/actionsPanelQuiz/actionsPanelQuiz";
import { lastFiveCompletedQuizAsyncThunk } from "@/redux/Features/lastFiveCompletedQuiz";
import { setData, show, showEdit } from "@/redux/Features/createQuiz";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/store";

export default function Quiz() {
  const { t } = useTranslation();
  const [dataSingle, setDataSingle] = useState<any>({});
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: dataQuizCompleted } = useSelector(
    (state: any) => state.lastFiveCompletedQuizSlice
  );

  const columns: ColumnsHederTableInQuizzes[] = [
    { key: "Title", label: t("quizPage_tableTitle") },
    { key: "Question", label: t("quizPage_tableQuestion") },
    { key: "level", label: t("quizPage_tableLevel") },
    { key: "Date", label: t("quizPage_tableDate") },
  ];

  const handelDataToRead = () => {
    if (!dataQuizCompleted) return [];
    return dataQuizCompleted.map((quiz: any) => {
      return {
        Title: quiz.title,
        Question: quiz.questions.length,
        level: quiz.difficulty,
        Date: quiz.schadule,
        ...quiz,
      };
    });
  };

  useEffect(() => {
    dispatch(lastFiveCompletedQuizAsyncThunk());
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const handleCloseConfirm = async () => {
    if (!dataSingle._id) return;
    try {
      const response = await dispatch(deleteQuizAsyncThunk(dataSingle._id));
      if (response?.payload?.message) {
        toast.success(response.payload.message || t("quizPage_deleteSuccess"));
      } else if (response?.payload) {
        toast.error(response?.payload || t("quizPage_deleteError"));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(lastFiveCompletedQuizAsyncThunk());
    setOpen(false);
  };

  const openAddAndEditFun = async (row: any) => {
    try {
      await dispatch(setData(row));
      dispatch(showEdit());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ActionsPanel onClick={() => dispatch(show())} />
      <UpcomingQuizzes />

      <div className="text-lg font-bold mb-4 text-gray-800 capitalize">
        {t("quizPage_completedQuizzes")}
      </div>
      <GenericTable
        columns={columns}
        setDataSingle={setDataSingle}
        titleItem="quiz"
        data={handelDataToRead()}
        actions={(row: any) => [
          {
            type: "view",
            color: "red",
            component: (
              <Link href={`/instructor/quizes/${row._id}`} className="text-blue-500">
                {t("quizPage_actionEdit")}
              </Link>
            ),
            onClick: () => {
              router.push(`/instructor/quizes/${row._id}`, row);
            },
          },
          {
            type: "edit",
            color: "black",
            onClick: () => {
              openAddAndEditFun(row);
            },
          },
          {
            type: "delete",
            color: "blue",
            onClick: () => {
              setDataSingle(row);
              setOpen(true);
            },
          },
        ]}
      />

      <ConfirmDeleteModal
        isOpen={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleCloseConfirm}
        title={t("quizPage_modalTitle")}
        message={<span>{t("quizPage_modalMessage")}</span>}
        confirmLabel={t("quizPage_modalConfirm")}
        cancelLabel={t("quizPage_modalCancel")}
      />
    </>
  );
}
