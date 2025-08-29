"use client";
import ConfirmDeleteModal from "@/components/confirmDeleteModal/confirmDeleteModal";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import { ColumnsHederTableInQuizzes } from "@/interfaces/interfaces";
import { QuizzesAsyncThunk } from "@/redux/Features/quizeApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns:ColumnsHederTableInQuizzes[] = [
  { key: "Title", label: "Question Title" },
  { key: "Question", label: "Question Desc" },
  { key: "level", label: "Question difficulty level" },
  { key: "Date", label: "Date" },
];

const data = [
  { Title: "Hamza", Question: "hamza@test.com", level: "Admin",Date:'Date' },
];

export default function Quiz() {
  const dispatch = useDispatch();
    const {dataQuize} = useSelector(state=>state.value)
      useEffect(()=>{
        dispatch(QuizzesAsyncThunk());
      },[])
      console.log(dataQuize);
      

      
  const [open, setOpen] = useState(false);

  const handleCloseConfirm = () => {
    setOpen(false);
  };

  const handleOpenConfirm = () => {
    setOpen(true);
  };

  return (
    <>
      <GenericTable
        columns={columns}
        data={data}
        actions={(row) => [
          {
            type: "view",
            color: "red",
            onClick: () => alert("Viewing " + row.name),
          },
          {
            type: "edit",
            color: "black",
            onClick: () => alert("Editing " + row.name),
          },
          {
            type: "delete",
            color: "blue",
            onClick: () => handleOpenConfirm(),
          },
        ]}
      />

      <ConfirmDeleteModal
        isOpen={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleCloseConfirm}
        title="Delete this course?"
        message={
          <span>
            This will permanently remove the course and all related data. <br />
            You can’t undo this action.
          </span>
        }
        confirmLabel="Yes, delete"
        cancelLabel="Keep it"
      />
    </>
  );
}
