'use client'
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import React, { useState } from 'react'
const columns = [
  { key: "Title", label: "  Title" },
  { key: "groupName", label: "Group name" },
  { key: "Participants", label: "Participants" },
  { key: "Date", label: "Date" },
  { key: "persons", label: "persons" },
];
const data =[
  {Title: 'Title' ,Date: '15-12',Participants:'Participants',groupName:'groupName',persons:10},
  {Title: 'Title' ,Date: '15-12',Participants:'Participants',groupName:'groupName',persons:10},
  {Title: 'Title' ,Date: '15-12',Participants:'Participants',groupName:'groupName',persons:10},
  {Title: 'Title' ,Date: '15-12',Participants:'Participants',groupName:'groupName',persons:10},
  {Title: 'Title' ,Date: '15-12',Participants:'Participants',groupName:'groupName',persons:10},
]
export default function Results() {
  const [dataSingle,setDataSingle] = useState({})
  return (
    <div className='w-full'>
      <GenericTable
        columns={columns}
        titleItem = 'Question'
        data={data}
        setDataSingle={setDataSingle}
        actions={(row) => [
          {
            type: "view",
            color: "red",
            onClick: () => {console.log(row)},
          },
          {
            type: "edit",
            color: "black",
            onClick: () => { console.log(row)},
          },
          {
            type: "delete",
            color: "blue",
            onClick: () =>{console.log(row)},
          },
        ]}
      />
    </div>
  )
}
