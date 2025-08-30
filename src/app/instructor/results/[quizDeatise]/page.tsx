'use client'
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import React, { useState } from 'react'
const columns = [
  { key: "studentName", label: "Student name" },
  { key: "Score", label: "Score" },
  { key: "Average", label: "Average" },
  { key: "timeSubmitted", label: "Time submitted" },
];
const data =[
  {studentName: 'Title' ,timeSubmitted: '15',Average:'20',Score:'18'},
  {studentName: 'Title' ,timeSubmitted: '15',Average:'20',Score:'18'},
  {studentName: 'Title' ,timeSubmitted: '15',Average:'20',Score:'18'},
  {studentName: 'Title' ,timeSubmitted: '15',Average:'20',Score:'18'},
  {studentName: 'Title' ,timeSubmitted: '15',Average:'20',Score:'18'},
]
export default function ResultsDetails() {
  const [dataSingle,setDataSingle] = useState({})
  return (
    <div className='w-full'>
      <GenericTable
        columns={columns}
        titleItem = 'Question'
        data={data}
        setDataSingle={setDataSingle}
        // actions={(row) => [
        //   {
        //     type: "view",
        //     color: "red",
        //     onClick: () => {console.log(row)},
        //   },
        //   {
        //     type: "edit",
        //     color: "black",
        //     onClick: () => { console.log(row)},
        //   },
        //   {
        //     type: "delete",
        //     color: "blue",
        //     onClick: () =>{console.log(row)},
        //   },
        // ]}
      />
    </div>
  )
}
