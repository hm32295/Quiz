'use client'
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import TableSkeleton from '@/components/loading/tableSkeletonLoader';
import StudentModal from '@/components/singleStudent';
import { StudentAsyncThunk } from '@/redux/Features/getStudent';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '@/redux/store';


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
  const { t } = useTranslation();
  const [, setDataSingle] = useState<Student | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <div>
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
