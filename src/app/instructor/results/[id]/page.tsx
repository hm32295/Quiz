'use client'
import GenericTable from '@/components/GenericTableProps/GenericTableProps';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function ResultsDetails() {
  const { t } = useTranslation();
  const params = useParams(); 
  const quizId = params.id;

  const { data = [], isLoading } = useSelector((state: any) => state.results);

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

  const handelDataToView = () => {
    const quiz = data?.find((quiz: any) => quiz.quiz._id === quizId);
    if (!quiz) return [];

    return quiz.participants.map((participant: any) => ({
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

  const columns = [
    { key: "studentName", label: t("resultsDetails_column_studentName") },
    { key: "Score", label: t("resultsDetails_column_score") },
    { key: "Average", label: t("resultsDetails_column_average") },
    { key: "timeSubmitted", label: t("resultsDetails_column_timeSubmitted") },
  ];

  return (
    <div className="w-full">
      <GenericTable
        columns={columns}
        titleItem={t("resultsDetails_table_title")}
        data={handelDataToView()}
      />
    </div>
  );
}
