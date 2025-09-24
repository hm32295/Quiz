"use client";
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/redux/store';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Participant type
interface Participant {
  participant?: {
    first_name: string;
    last_name: string;
  };
  score: number;
  started_at: string;
  finished_at: string;
}

// Quiz type
interface Quiz {
  _id: string;
  questions_number: number;
  score_per_question: number;
}

// Result slice item type
interface ResultItem {
  quiz: Quiz;
  participants: Participant[];
}

// Row type for table
interface ResultRow {
  _id?: string
  studentName: string;
  Score: number;
  Average: string;
  timeSubmitted: string;
}

// Column type for GenericTable
interface Column {
  key: keyof ResultRow;
  label: string;
}

export default function ResultsDetails() {
  const { t,i18n } = useTranslation();
  const params = useParams();
  const quizId = params.id as string;
  const router = useRouter()
  const direction = i18n.dir()
  const { data = [], isLoading } = useSelector(
    (state: RootState) => state.results as { data: ResultItem[]; isLoading: boolean }
  );

  useEffect(() => {
    if (!quizId) return;
  }, [quizId]);

  if (isLoading) return <div className="p-4">{t("resultsDetails_loading")}</div>;

  const handelTime = (start: string, end: string) => {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);
    const diffMs = dateEnd.getTime() - dateStart.getTime();
    return Math.floor(diffMs / (1000 * 60)) + " mins";
  };

  const handelAverage = (questions_number: number, score_per_question: number, score: number) => {
    const totalScore = questions_number * score_per_question;
    const average = (score / totalScore) * 100;
    return average.toFixed(2) + "%";
  };

  const handelDataToView = (): ResultRow[] => {
    const quiz = data?.find((quiz: ResultItem) => quiz.quiz._id === quizId);
    if (!quiz) return [];

    return quiz.participants.map((participant: Participant) => ({
      studentName: participant.participant
        ? `${participant.participant.first_name} ${participant.participant.last_name}`
        : t("resultsDetails_unknown"),
      Score: participant.score,
      Average: handelAverage(
        quiz.quiz.questions_number,
        quiz.quiz.score_per_question,
        participant.score
      ),
      timeSubmitted: handelTime(participant.started_at, participant.finished_at),
    }));
  };

  const columns: Column[] = [
    { key: "studentName", label: t("resultsDetails_column_studentName") },
    { key: "Score", label: t("resultsDetails_column_score") },
    { key: "Average", label: t("resultsDetails_column_average") },
    { key: "timeSubmitted", label: t("resultsDetails_column_timeSubmitted") },
  ];

  return (
    <div className="w-full">
    {/* Back Button */}
    <button
      onClick={() => router.back()}
      className="flex capitalize self-start cursor-pointer items-center gap-2 mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
    >
      {direction === 'rtl' ? <FaArrowRight /> : <FaArrowLeft />}
      {t('studentsPage.buttons.back')}
    </button>
      <GenericTable<ResultRow>
        columns={columns}
        titleItem={t("resultsDetails_table_title")}
        data={handelDataToView()}
      />
    </div>
  );
}
