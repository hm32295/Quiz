"use client";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import { groupAsyncThunk } from "@/redux/Features/getGroup";
import { resultsAsyncThunk } from "@/redux/Features/results";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface QuizType {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  closed_at: string;
}

interface ParticipantType {
  _id: string;
  quiz: { _id: string; title: string };
  participant: { _id: string; first_name: string; last_name: string; email: string };
  score: number;
  started_at: string;
}

interface ResultItem {
  quiz: QuizType;
  participants: ParticipantType[];
}

const columns = [
  { key: "Title", label: "Title" },
  { key: "groupName", label: "Group name" },
  { key: "Participants", label: "Participants" },
  { key: "Date", label: "Date" },
  { key: "persons", label: "Persons" },
];

export default function Results() {
  const [dataSingle, setDataSingle] = useState<any>(null);
  const { data, isLoading } = useSelector((state: any) => state.results);
  const { data:group, isLoading:isLoadingGroup } = useSelector((state: any) => state.Group);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resultsAsyncThunk() as any);
    dispatch(groupAsyncThunk() as any);
  }, [dispatch]);

  if (isLoading || isLoadingGroup) return <div className="capitalize">loading...</div>;


  const handelDataToView = () => {
  
    if (!data) return [];
    return data.map((item: ResultItem) => {
      return {
        ...item,
        Title: item.quiz.title,
        Date: new Date(item.quiz.schadule).toLocaleString(),
        Participants: item.participants.length,
        status: item.quiz.status,
        groupName: group.find(e=> e._id === item.quiz.group).name || 'UnKnown',
        persons: item.participants.map((p) => p.participant.first_name).join(", ") || "No One",
      };
    });
  };

  return (
    <div className="w-full">
      <GenericTable
        columns={columns}
        titleItem="Question"
        data={handelDataToView()}
        setDataSingle={setDataSingle}
        actions={(row) => [
          {
            type: "view",
            color: "red",
            onClick: () => console.log("view", row),
          },
          
        ]}
      />
    </div>
  );
}
