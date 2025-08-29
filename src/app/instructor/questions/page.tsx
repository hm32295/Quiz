
"use client";
import ConfirmDeleteModal from "@/components/confirmDeleteModal/confirmDeleteModal";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import ViewDataModal from "@/components/viewData/viewData";
import { DeleteQuestionAsyncThunk } from "@/redux/Features/deleteQuestion";
import { QuestionAsyncThunk } from "@/redux/Features/questionApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  { key: "Title", label: "  Title" },
  { key: "Description", label: "description" },
  { key: "level", label: "level" },
  { key: "Points", label: "Points" },
];


export default function Questions() {
  const [openViewData, setOpenViewData] = useState(false);
  const [dataSingle,setDataSingle] = useState({})


  const dispatch = useDispatch();
    const {data,isLoading} = useSelector(state=>state.Question)
    useEffect(()=>{
      dispatch(QuestionAsyncThunk());
    },[dispatch])
    
      

      
  const [open, setOpen] = useState(false);

const handleDeleteConfirm = async () => {
  setOpen(false);

  if (dataSingle?._id) {
    await dispatch(DeleteQuestionAsyncThunk(dataSingle._id));
    dispatch(QuestionAsyncThunk());
  }
};

  return (
    <>
      <GenericTable
        columns={columns}
        titleItem = 'Question'
        data={data}
        actions={(row) => [
          {
            type: "view",
            color: "red",
            onClick: () => {setOpenViewData(true); setDataSingle(row.data);},
          },
          {
            type: "edit",
            color: "black",
            onClick: () => alert("Editing " + row.name),
          },
          {
            type: "delete",
            color: "blue",
            onClick: () =>{setDataSingle(row.data); setOpen(true)},
          },
        ]}
      />

      <ConfirmDeleteModal
        isOpen={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDeleteConfirm}
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

       <ViewDataModal
        isOpen={openViewData}
        onClose={() => setOpenViewData(false)}
        title="Question "
        data={handelDataToView(dataSingle)}
      />
    </>
  );
}


const handelDataToView =(data)=>{

  
  return[
   
    { label: "title", value: data.title },
    { label: "description", value: data.description },
    { label: "answer", value: data.answer },
    { label: "answer", value: data.answer },
    { label: "status", value: data.status },
    { label: "difficulty", value: data.difficulty },
    { label: "points", value: data.points },
    { label: "type", value: data.type },
  ];
  
}

