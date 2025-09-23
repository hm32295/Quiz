'use client'
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import TableSkeleton from '@/components/loading/tableSkeletonLoader';
import { resultsAsyncThunk } from '@/redux/Features/results';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '@/redux/store';

// ✅ Quiz interface
interface Quiz {
  _id: string;
  title: string;
  questions: { _id: string; title: string }[];
  difficulty: string;
  schadule: string;
  [key: string]: unknown;
}

// ✅ ResultItem interface
interface ResultItem {
  quiz: Quiz;
  [key: string]: unknown;
}

// ✅ Table row interface
interface QuizResultRow {
  Title: string;
  _id?:string;
  Question: number;
  level: string;
  Date: string;
  [key: string]: unknown;
}

// ✅ Column type (fix: key = string)
interface ColumnHeader<T> {
  key: string; // علشان يتوافق مع Column<QuizResultRow>
  label: string;
}

export default function Results() {
  const { t } = useTranslation();
  const { data, isLoading } = useSelector(
    (state: RootState) =>
      state.results as { data: ResultItem[]; isLoading: boolean }
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resultsAsyncThunk());
  }, [dispatch]);

  const columns: ColumnHeader<QuizResultRow>[] = [
    { key: 'Title', label: t('resultsPage.columns.title') },
    { key: 'Question', label: t('resultsPage.columns.question') },
    { key: 'level', label: t('resultsPage.columns.level') },
    { key: 'Date', label: t('resultsPage.columns.date') },
  ];

  const handelDataToRead = (): QuizResultRow[] => {
    if (!data) return [];

    return data.map((item: ResultItem) => {
      const quiz = item.quiz;
      return {
        Title: quiz?.title ?? '',
        Question: quiz?.questions?.length ?? 0,
        level: quiz?.difficulty ?? '',
        Date: quiz?.schadule ?? '',
        ...quiz,
      };
    });
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <div>
      <span className="capitalize text-black select-none">
        {t('resultsPage.title')}
      </span>

      <GenericTable
        columns={columns}
        titleItem="quiz"
        data={handelDataToRead()}
      />
    </div>
  );
}
