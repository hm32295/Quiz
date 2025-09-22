'use client'
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import TableSkeleton from '@/components/loading/tableSkeletonLoader';
import StudentModal from '@/components/singleStudent';
import { StudentAsyncThunk } from '@/redux/Features/getStudent';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '@/redux/store';

export default function Students() {
  const { t } = useTranslation();
  const [, setDataSingle] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector((state: any) => state.Student);

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
        actions={(row: any) => [
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
