'use client'
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import TableSkeleton from '@/components/loading/tableSkeletonLoader';
import StudentModal from '@/components/singleStudent';
import { StudentAsyncThunk } from '@/redux/Features/getStudent';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  avg_score: number;
  [key: string]: unknown;
}

interface StudentState {
  data: Student[];
  isLoading: boolean;
  error?: string | null;
}

export default function Students() {
  const { t, i18n } = useTranslation();
  const [, setDataSingle] = useState<Student | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { data, isLoading } = useSelector(
    (state: RootState) => state.Student as StudentState
  );

  useEffect(() => {
    dispatch(StudentAsyncThunk());
  }, [dispatch]);

  const columns = [
    { label: t('studentsPage.columns.name'), key: 'first_name' },
    { label: t('studentsPage.columns.email'), key: 'email' },
    { label: t('studentsPage.columns.status'), key: 'status' },
    { label: t('studentsPage.columns.role'), key: 'role' },
  ];

  if (isLoading) return <TableSkeleton />;

  const direction = i18n.dir();

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex cursor-pointer items-center gap-2 mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
      >
        {direction === 'rtl' ? <FaArrowRight /> : <FaArrowLeft />}
        {t('studentsPage.buttons.back')}
      </button>

      <GenericTable<Student>
        columns={columns}
        titleItem={t('studentsPage.tableTitle')}
        data={data.map(s => ({ ...s, avg_score: s.avg_score ?? 0 }))}
        setDataSingle={setDataSingle}
        actions={(row: Student) => [
          {
            type: 'view',
            label: t('studentsPage.actions.view'),
            color: 'red',
            onClick: () => setSelectedStudent(row),
          },
        ]}
      />

      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
