"use client";
import AddAndEditQuiz from "@/components/addAndEditQuiz/addAndEditQuiz";
import ConfirmDeleteModal from "@/components/confirmDeleteModal/confirmDeleteModal";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import { ColumnsHederTableInQuizzes } from "@/interfaces/interfaces";
import { deleteQuizAsyncThunk } from "@/redux/Features/deleteQuiz";
import { getQuizAsyncThunk } from "@/redux/Features/getQuizzes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpcomingQuizzes from "@/components/upcomingQuizzes/upcomingQuizzes";
import ActionsPanel from "@/components/actionsPanelQuiz/actionsPanelQuiz";
import { lastFiveCompletedQuizAsyncThunk } from "@/redux/Features/lastFiveCompletedQuiz";
import { show } from "@/redux/Features/createQuiz";

const columns:ColumnsHederTableInQuizzes[] = [
  { key: "Title", label: "Quiz Title" },
  { key: "Question", label: "Question Desc" },
  { key: "level", label: "Question difficulty level" },
  { key: "Date", label: "Date" },
];


export default function Quiz() {
  const [dataSingle,setDataSingle] = useState({});
  const [update,setUpdate] = useState<{} | null>(null);
  const router = useRouter()
  const dispatch = useDispatch();
  const {data:dataQuizCompleted} = useSelector((state :any)=>state.lastFiveCompletedQuizSlice)


  const handelDataToRead =()=>{
    
    if(!dataQuizCompleted) return
    
    return dataQuizCompleted.map((quiz)=>{
      return { Title: quiz.title, Question: quiz.questions.length, level: quiz.difficulty,Date:quiz.schadule, ...quiz }
    })

  }
  useEffect(()=>{
      dispatch(lastFiveCompletedQuizAsyncThunk());

    },[dispatch])
      
  const [open, setOpen] = useState(false);

  const handleCloseConfirm = () => {
      console.log(dataSingle._id);
    if(!dataSingle._id) return
    dispatch(deleteQuizAsyncThunk(dataSingle._id))
    dispatch(getQuizAsyncThunk())
    setOpen(false);
  };

  const handleOpenConfirm = () => {
    setOpen(true);
  
    
  };
  const openAddAndEditFun = ()=>{

    setUpdate(dataSingle)
    dispatch(show())
  }
  

  
  return (
    <>
      <ActionsPanel  onClick={() => {setUpdate(null); dispatch(show())}}/>
      <UpcomingQuizzes />

      <div className="text-lg font-bold mb-4 text-gray-800 capitalize">Completed Quizzes</div>
      <GenericTable
        columns={columns}
        setDataSingle={setDataSingle}
        titleItem="quiz"
        data={handelDataToRead()}
        actions={(row) => [
          {
            type: "view",
            color: "red",
             component: (
              <Link href={`/instructor/quizes/${row._id}`} className="text-blue-500"> Edit</Link>
            ),
            onClick: () =>{router.push(`/instructor/quizes/${row._id}`,row)},
          },
          {
            type: "edit",
            color: "black",
           
            onClick: () =>{openAddAndEditFun()},
          },
          {
            type: "delete",
            color: "blue",
            onClick: () =>{setDataSingle(row); handleOpenConfirm()},
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

      <AddAndEditQuiz
          dataUpdate={update}
        
        />
    </>
  );
}
