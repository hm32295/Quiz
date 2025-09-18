
"use client";
import AddAndEditQuestion from "@/components/addAndEditQuestion/addAndEditQuestion";
import ConfirmDeleteModal from "@/components/confirmDeleteModal/confirmDeleteModal";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import ViewDataModal from "@/components/viewData/viewData";
import { addQuestionAsyncThunk } from "@/redux/Features/addQuestion";
import { DeleteQuestionAsyncThunk } from "@/redux/Features/deleteQuestion";
import { editQuestionAsyncThunk } from "@/redux/Features/editQuestion";
import { QuestionAsyncThunk } from "@/redux/Features/questionApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  { key: "Title", label: "  Title" },
  { key: "Description", label: "description" },
  { key: "level", label: "level" },
  { key: "Points", label: "Points" },
];


export default function Questions() {
  
  const [dataSingle,setDataSingle] = useState({});
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit,reset } = useForm();

// Add Question
    const [openModelEditAndAdd, setOpenModelEditAndAdd] = useState(false);
    const onSubmit =async (data: any) => {
      const dataForm = {
          title: data.title,
          description: data.description,
          options :{A: data.A,
                    B: data.B,
                    C: data.C,
                    D: data.D
                  },
          answer: data.answer,
          difficulty: data.difficulty,
          type: data.type
      }

      if(!dataSingle?.data?._id){
        
        await dispatch(addQuestionAsyncThunk(dataForm)).then(() => {
          dispatch(QuestionAsyncThunk());
        });
      }else if(dataSingle.data._id){
        await dispatch(editQuestionAsyncThunk({dataForm,id:dataSingle.data._id})).then(() => {
          dispatch(QuestionAsyncThunk());
        });
      }
      reset()
      setOpenModelEditAndAdd(false); 
    };

    const addQuestion=()=>{
      setIsEdit(false)
      setDataSingle({});
      reset({
        title: "",
        description: "",
        A: "",
        B: "",
        C: "",
        D: "",
        answer: "",
        difficulty: "",
        type: "",
      });
      setOpenModelEditAndAdd(true)
    }

  // Get All Question

  const {data,isLoading} = useSelector(state=>state.Question)
  useEffect(()=>{
    dispatch(QuestionAsyncThunk());
  },[dispatch])
    
// View Details

  const [openViewData, setOpenViewData] = useState(false);
  const handelDataToView =(data:any)=>{
   if (!data.data) return
    if(data){

        return[
          { label: "title", value: data.data.title },
          { label: "description", value: data.data.description },
          { label: "answer", value: data.data.answer },
          { label: "status", value: data.data.status },
          { label: "difficulty", value: data.data.difficulty },
          { label: "points", value: data.data.points },
          { label: "type", value: data.data.type },
        ];
    }
  
}
// Delete Question

  const [open, setOpen] = useState(false);
  const handleDeleteConfirm = async () => {
      setOpen(false);
      if (dataSingle?.data?._id) {
        await dispatch(DeleteQuestionAsyncThunk(dataSingle.data._id));
        dispatch(QuestionAsyncThunk());
      }
  };

// Edit Question
const handleEditQuestion = () => {
  const newData = dataSingle?.data
  setIsEdit(true)
  reset({
    title: newData?.title || "",
    description: newData?.description || "",
    A: newData?.options?.A || "",
    B: newData?.options?.B || "",
    C: newData?.options?.C || "",
    D: newData?.options?.D || "",
    answer: newData?.answer || "",
    difficulty: newData?.difficulty || "",
    type: newData?.type || "",
  });
  setOpenModelEditAndAdd(true);
};

if(isLoading){return 'Loading....'}

  return (
    <>
    <div className="flex justify-between p-3 ">
      <h2 className="font-bold capitalize">Bank Of Questions</h2>
      <button
      onClick={()=>{addQuestion()}} className="flex items-center gap-1 cursor-pointer">
        <FaPlusCircle  />
        Add Question
      </button>
    </div>
      <GenericTable
        columns={columns}
        titleItem = 'Question'
        data={data}
        setDataSingle={setDataSingle}
        actions={(row) => [
          {
            type: "view",
            color: "red",
            onClick: () => {setOpenViewData(true); setDataSingle(row.data);},
          },
          {
            type: "edit",
            color: "black",
            onClick: () => {setDataSingle(row.data); handleEditQuestion();},
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


       <AddAndEditQuestion
          isOpen={openModelEditAndAdd}
          edit ={isEdit}
          onClose={() => setOpenModelEditAndAdd(false)}
          register={register}
          isLoading={isLoading}
          onSubmit={handleSubmit(onSubmit)}
        />
    </>



  );
}




