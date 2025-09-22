"use client";
import React, { useEffect, useState } from "react";
import AddAndEditQuestion from "@/components/addAndEditQuestion/addAndEditQuestion";
import ConfirmDeleteModal from "@/components/confirmDeleteModal/confirmDeleteModal";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import TableSkeleton from "@/components/loading/tableSkeletonLoader";
import ViewDataModal from "@/components/viewData/viewData";
import { DeleteQuestionAsyncThunk } from "@/redux/Features/deleteQuestion";
import { QuestionAsyncThunk } from "@/redux/Features/questionApi";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "@/redux/store";


interface Question {
  _id: string;
  title: string;
  description: string;
  answer: string;
  status: string;
  difficulty: string;
  points: number;
  type: string;
}


interface QuestionState {
  data: Question[];
  isLoading: boolean;
  error?: string | null;
}

export default function QuestionsWithI18n() {
  const { t } = useTranslation();

  
  const [dataSingle, setDataSingle] = useState<Question | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Add/Edit modal
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const handleAddClick = async () => {
    setIsEditMode(false);
    setDataSingle(null);
    setOpenAddEditModal(true);
  };

  
  const { data, isLoading } = useSelector(
    (state: RootState) => state.Question as QuestionState
  );

  useEffect(() => {
    dispatch(QuestionAsyncThunk());
  }, [dispatch]);

  // View data modal
  const [openViewData, setOpenViewData] = useState(false);
  const mapDataToView = (item: Question | null) => {
    if (!item) return;
    return [
      { label: t("questionsPage.modals.view.fields.title"), value: item.title },
      { label: t("questionsPage.modals.view.fields.description"), value: item.description },
      { label: t("questionsPage.modals.view.fields.answer"), value: item.answer },
      { label: t("questionsPage.modals.view.fields.status"), value: item.status },
      { label: t("questionsPage.modals.view.fields.difficulty"), value: item.difficulty },
      { label: t("questionsPage.modals.view.fields.points"), value: item.points },
      { label: t("questionsPage.modals.view.fields.type"), value: item.type }
    ];
  };

  // Delete question
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleDeleteConfirm = async () => {
    setOpenDeleteConfirm(false);
    const id = dataSingle?._id;
    if (id) {
      try {
        const response = await dispatch(DeleteQuestionAsyncThunk(id));
        if (response?.payload?.message) {
          toast.success(response.payload.message || t("questionsPage.toast.deleteSuccess"));
        } else if (response?.payload) {
          toast.error(response.payload || t("questionsPage.toast.deleteError"));
        }
      } catch (error) {
        console.error(error);
        toast.error(t("questionsPage.modals.addEdit.error"));
      }
      dispatch(QuestionAsyncThunk());
    }
  };

  // Edit question
  const handleEditQuestion = async () => {
    setIsEditMode(true);
    setOpenAddEditModal(true);
  };

  // columns
  const columns = [
    { key: "Title", label: t("questionsPage.table.columns.title") },
    { key: "Description", label: t("questionsPage.table.columns.description") },
    { key: "level", label: t("questionsPage.table.columns.level") },
    { key: "Points", label: t("questionsPage.table.columns.points") }
  ];

  if (isLoading) {
    return <TableSkeleton rows={5} cols={3} />;
  }

  return (
    <>
      <div className="flex justify-between p-3 ">
        <h2 className="font-bold capitalize">{t("questionsPage.header.title")}</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-1 cursor-pointer"
        >
          <FaPlusCircle />
          {t("questionsPage.header.addButton")}
        </button>
      </div>

      <GenericTable
        columns={columns}
        titleItem={t("questionsPage.table.titleItem")}
        data={data}
        setDataSingle={setDataSingle}
        actions={(row: Question) => [
          {
            type: "view",
            color: "red",
            onClick: async () => {
              setDataSingle(row);
              setOpenViewData(true);
            },
            label: t("questionsPage.actions.view")
          },
          {
            type: "edit",
            color: "black",
            onClick: handleEditQuestion,
            label: t("questionsPage.actions.edit")
          },
          {
            type: "delete",
            color: "blue",
            onClick: async () => {
              setDataSingle(row);
              setOpenDeleteConfirm(true);
            },
            label: t("questionsPage.actions.delete")
          }
        ]}
      />

      <ConfirmDeleteModal
        isOpen={openDeleteConfirm}
        onCancel={() => setOpenDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title={t("questionsPage.modals.delete.title")}
        message={<span>{t("questionsPage.modals.delete.message")}</span>}
        confirmLabel={t("questionsPage.modals.delete.confirmLabel")}
        cancelLabel={t("questionsPage.modals.delete.cancelLabel")}
      />

      <ViewDataModal
        isOpen={openViewData}
        onClose={() => setOpenViewData(false)}
        title={t("questionsPage.modals.view.title")}
        data={mapDataToView(dataSingle)}
      />

      <AddAndEditQuestion
        dataSingle={dataSingle}
        isOpen={openAddEditModal}
        edit={isEditMode}
        onClose={() => setOpenAddEditModal(false)}
      />
    </>
  );
}
