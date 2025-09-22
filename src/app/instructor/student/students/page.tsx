'use client'
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import TableSkeleton from '@/components/loading/tableSkeletonLoader';
import StudentModal from '@/components/singleStudent';
import { StudentAsyncThunk } from '@/redux/Features/getStudent';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '@/redux/store';

interface Student {
  _id: string;
  first_name: string;
  email: string;
  status: string;
  role: string;
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

  // ✅ استخدم التايب
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
      <GenericTable
        columns={columns}
        titleItem={t('studentsPage.tableTitle')}
        data={data}
        setDataSingle={setDataSingle}
        actions={(row: Student) => [
          {
            type: t('studentsPage.actions.view'),
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
