"use client";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUserCircle,
  FaRegCircle,
} from "react-icons/fa";

type OptionMap = { [key: string]: string };

type Question = {
  _id: string;
  title: string;
  options: OptionMap & { _id?: string };
  answer: string; // letter e.g. 'A'
};

type Attempt = {
  _id: string;
  quiz: string;
  participant: string;
  score: number;
  started_at: string;
  finished_at: string;
  questions: Question[];
};

type PropsQuizResults = {
  attempt: { data: Attempt };
  studentAnswers: { question: string; answer: string }[];
};

export default function QuizResults({
  attempt,
  studentAnswers,
}: PropsQuizResults) {
  const data = attempt.data;
  const total = data?.questions?.length ?? 0;
  const scoreFromBackend = data?.score ?? 0;

  // حساب عدد الإجابات الصح
  const correctCount =
    data?.questions?.filter((q) => {
      const studentAns = studentAnswers.find((a) => a.question === q._id)?.answer;
      return studentAns === q.answer;
    }).length ?? 0;

  const wrongCount = total - correctCount;

  const finalScore =
    correctCount > 0
      ? Math.round((scoreFromBackend / correctCount) * total)
      : 0;

  const percent = total ? Math.round((correctCount / total) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="animate__animated animate__fadeIn bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div className="animate__animated animate__fadeInLeft">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Quiz Results
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaUserCircle className="text-indigo-500" />
              Participant:{" "}
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {data?.participant}
              </span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Started: {new Date(data?.started_at || "").toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Finished: {new Date(data?.finished_at || "").toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Correct: {correctCount} |
              <FaTimesCircle className="text-red-500" /> Wrong: {wrongCount}
            </p>
            <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium">
              Your Score: {scoreFromBackend}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 font-bold">
              Final Score: {finalScore} / {total}
            </p>
          </div>

<div className="flex justify-center md:justify-end w-full md:w-auto animate__animated animate__zoomIn">
  <div className="relative w-28 h-28 flex items-center justify-center">
    {/* الدائرة الخلفية */}
    <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-700"></div>

    {/* الدائرة الملونة حسب النسبة */}
    <div
      className={`absolute inset-0 rounded-full border-8 ${
        percent >= 70
          ? "border-green-500"
          : percent >= 40
          ? "border-yellow-500"
          : "border-red-500"
      }`}
      style={{
        clipPath: `inset(${100 - percent}% 0 0 0)`, // بيخليها تتلون على حسب النسبة
      }}
    ></div>

    {/* الرقم في النص */}
    <span className="relative text-xl font-bold text-gray-800 dark:text-gray-100">
      {percent}%
    </span>
  </div>
</div>

        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              style={{ width: `${percent}%` }}
              className="h-3 bg-gradient-to-r from-green-400 to-green-600 animate__animated animate__fadeInRight"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {data?.questions?.map((q: Question, idx: number) => {
            const correctLetter = q.answer;
            const studentAns = studentAnswers.find((a) => a.question === q._id)?.answer;

            return (
              <div
                key={q._id}
                className="animate__animated animate__fadeInUp border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Title */}
                <div className="flex items-start gap-3 mb-3">
                  <FaRegCircle className="text-indigo-500 w-6 h-6" />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                    {idx + 1}. {q.title}
                  </h3>
                </div>

                {/* Correct vs Student Answer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 bg-green-50 dark:bg-green-900/30 p-2 rounded-lg">
                    <FaCheckCircle className="text-green-500" />
                    <span>
                      <strong>Correct:</strong> {q.options[correctLetter]}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                      studentAns === correctLetter
                        ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                    }`}
                  >
                    <FaUserCircle />
                    <span>
                      <strong>Your:</strong>{" "}
                      {studentAns ? q.options[studentAns] : "Not Answered"}
                    </span>
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(q.options)
                    .filter(([key]) => key !== "_id")
                    .map(([letter, text]) => {
                      const isCorrect = letter === correctLetter;
                      const isStudent = letter === studentAns;

                      return (
                        <div
                          key={letter}
                          className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                            isCorrect
                              ? "bg-green-50 dark:bg-green-900/30 border border-green-300"
                              : isStudent
                              ? "bg-red-50 dark:bg-red-900/30 border border-red-300"
                              : "bg-gray-50 dark:bg-gray-800"
                          }`}
                        >
                          {isCorrect ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : isStudent ? (
                            <FaTimesCircle className="text-red-500" />
                          ) : (
                            <FaRegCircle className="text-gray-400" />
                          )}
                          <div className="flex-1 text-sm text-gray-700 dark:text-gray-200">
                            {letter}. {text}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
