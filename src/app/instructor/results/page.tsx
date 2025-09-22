"use client";
import GenericTable from "@/components/GenericTableProps/GenericTableProps";
import TableSkeleton from "@/components/loading/tableSkeletonLoader";
import { groupAsyncThunk } from "@/redux/Features/getGroup";
import { resultsAsyncThunk } from "@/redux/Features/results";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

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
  participant: { _id: string; first_name: string; last_name: string; email: string } | null;
  score: number;
  started_at: string;
}

interface ResultItem {
  quiz: QuizType;
  participants: ParticipantType[];
}

export default function Results() {
  const { t } = useTranslation();
  const [, setDataSingle] = useState<any>([]);
  const { data = [], isLoading } = useSelector((state: any) => state.results);
  const { data: group = [], isLoading: isLoadingGroup } = useSelector((state: any) => state.Group);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(resultsAsyncThunk() as any);
    dispatch(groupAsyncThunk() as any);
  }, [dispatch]);

  if (isLoading || isLoadingGroup) {
    return <TableSkeleton rows={5} cols={3} />;
  }

  const handelDataToView = () => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item: ResultItem) => ({
      ...item,
      Title: item.quiz.title,
      Date: new Date(item.quiz.schadule).toLocaleString(),
      Participants: item.participants?.length || 0,
      status: item.quiz.status,
      groupName: group.find((e: any) => e._id === item.quiz.group)?.name || t("results_unknown"),
      persons: item.participants?.length
        ? item.participants.map((p) => p?.participant?.first_name || "N/A").join(", ")
        : t("results_noOne"),
    }));
  };

  const columns = [
    { key: "Title", label: t("results_column_title") },
    { key: "groupName", label: t("results_column_groupName") },
    { key: "Participants", label: t("results_column_participants") },
    { key: "Date", label: t("results_column_date") },
    { key: "persons", label: t("results_column_persons") }
  ];

  return (
    <div className="w-full">
      <GenericTable
        columns={columns}
        titleItem={t("results_table_title")}
        data={handelDataToView()}
        setDataSingle={setDataSingle}
        actions={(row) => [
          {
            type: "view",
            color: "red",
            component: (
              <Link href={`/instructor/results/${row.quiz._id}`} className="text-blue-500">
                {t("results_edit")}
              </Link>
            ),
            onClick: () => {
              console.log("view", row);
              router.push(`/instructor/results/${row.quiz._id}`, row);
            },
          },
        ]}
      />
    </div>
  );
}
