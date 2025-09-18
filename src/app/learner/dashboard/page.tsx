'use client'
import ActionsPanel from '@/components/actionsPanelQuiz/actionsPanelQuiz'
import ConfirmDeleteModal from '@/components/confirmDeleteModal/confirmDeleteModal'
import GenericTable from '@/components/GenericTableProps/GenericTableProps'
import JoinQuizModal from '@/components/joinQuizModal/joinQuizModal'
import UpcomingQuizzes from '@/components/upcomingQuizzes/upcomingQuizzes'
import { ColumnsHederTableInQuizzes } from '@/interfaces/interfaces'
import { lastFiveCompletedQuizAsyncThunk } from '@/redux/Features/lastFiveCompletedQuiz'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const columns:ColumnsHederTableInQuizzes[] = [
  { key: "Title", label: "Quiz Title" },
  { key: "Question", label: "Question Desc" },
  { key: "level", label: "Question difficulty level" },
  { key: "Date", label: "Date" },
];


/*
 {
    "data": {
        "quiz": "68cac0ef5358146037d52fd4",
        "participant": "68c7ca085358146037d4e15e",
        "score": 0,
        "started_at": "2025-09-17T15:02:46.021Z",
        "_id": "68cacd965358146037d53220",
        "updatedAt": "2025-09-17T15:02:46.022Z",
        "createdAt": "2025-09-17T15:02:46.022Z",
        "__v": 0
    },
    "message": "Student joined successfully"
}
*/
export default function Dashboard() {
    const [dataSingle,setDataSingle] = useState({});

    const [openModelJoinQuiz, setOpenModelJoinQuiz] = useState(false);

    const handleJoin = () => {
     
      setOpenModelJoinQuiz(false);
    };
  const dispatch = useDispatch();
  const {data:dataQuizCompleted} = useSelector(state=>state.lastFiveCompletedQuizSlice)


  const handelDataToRead =()=>{
    
    if(!dataQuizCompleted) return
    
    return dataQuizCompleted.map((quiz)=>{
      return { Title: quiz.title, Question: quiz.questions.length, level: quiz.difficulty,Date:quiz.schadule, ...quiz }
    })

  }
  useEffect(()=>{
      dispatch(lastFiveCompletedQuizAsyncThunk());

    },[dispatch])
      
  return (
    <div className='p-2.5'>
       <JoinQuizModal
          isOpen={openModelJoinQuiz}
          onClose={() => setOpenModelJoinQuiz(false)}
         
        />
      <ActionsPanel onClick={()=> setOpenModelJoinQuiz(true)} type='student' />
      <UpcomingQuizzes />
        <div className="text-lg font-bold mb-4 text-gray-800 capitalize">Completed Quizzes</div>
      <GenericTable
        columns={columns}
        setDataSingle={setDataSingle}
        titleItem="quiz"
        data={handelDataToRead()}
      />
 

 
    </div>
  )
}
