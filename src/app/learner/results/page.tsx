'use client'
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import { ColumnsHederTableInQuizzes } from '@/interfaces/interfaces';
import { getQuizAsyncThunk } from '@/redux/Features/getQuizzes';
import { resultsAsyncThunk } from '@/redux/Features/results';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
const columns:ColumnsHederTableInQuizzes[] = [
  { key: "Title", label: "Quiz Title" },
  { key: "Question", label: "Question Desc" },
  { key: "level", label: "Question difficulty level" },
  { key: "Date", label: "Date" },
];
export default function Results() {
  const [dataSingle , setDataSingle] = useState({})
  const {data ,isLoading} = useSelector(state=> state.results)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(resultsAsyncThunk())
  },[dispatch])

  
    const handelDataToRead =()=>{
    
        if(!data) return
        
        return data.map((quiz)=>{
          return { Title: quiz.title, Question: quiz.questions.length, level: quiz.difficulty,Date:quiz.schadule, ...quiz }
        })

      }
  return (
    <div>
      <span className='capitalize text-black select-none '>Quiz results</span>

       <GenericTable
        columns={columns}
        setDataSingle={setDataSingle}
        titleItem="quiz"
        data={handelDataToRead()}
      />
     
    </div>
  )
}
