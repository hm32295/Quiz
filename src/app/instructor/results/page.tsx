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
import { AppDispatch, RootState } from "@/redux/store";

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

interface GroupType {
  _id: string;
  name: string;
}

interface ResultRow extends ResultItem {
  Title: string;
  Date: string;
  Participants: number;
  status: string;
  groupName: string;
  persons: string;
}

export default function Results() {
  const { t } = useTranslation();
  const [, setDataSingle] = useState<ResultRow | null>(null);

  const { data = [], isLoading } = useSelector(
    (state: RootState) => state.results as { data: ResultItem[]; isLoading: boolean }
  );

  const { data: group = [], isLoading: isLoadingGroup } = useSelector(
    (state: RootState) => state.Group as { data: GroupType[]; isLoading: boolean }
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(resultsAsyncThunk());
    dispatch(groupAsyncThunk());
  }, [dispatch]);

  if (isLoading || isLoadingGroup) {
    return <TableSkeleton rows={5} cols={3} />;
  }

  const handelDataToView = (): ResultRow[] => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item: ResultItem) => ({
      ...item,
      Title: item.quiz.title,
      Date: new Date(item.quiz.schadule).toLocaleString(),
      Participants: item.participants?.length || 0,
      status: item.quiz.status,
      groupName:
        group.find((e: GroupType) => e._id === item.quiz.group)?.name || t("results_unknown"),
      persons: item.participants?.length
        ? item.participants.map((p) => p?.participant?.first_name || "no one").join(", ")
        : t("results_noOne"),
    }));
  };

  const columns = [
    { key: "Title", label: t("results_column_title") },
    { key: "groupName", label: t("results_column_groupName") },
    { key: "Participants", label: t("results_column_participants") },
    { key: "Date", label: t("results_column_date") },
    { key: "persons", label: t("results_column_persons") },
  ];

  return (
    <div className="w-full">
      <GenericTable<ResultRow>
        columns={columns}
        titleItem={t("results_table_title")}
        data={handelDataToView()}
        setDataSingle={setDataSingle}
        actions={(row: ResultRow) => [
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
