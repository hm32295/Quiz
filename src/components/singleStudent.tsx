"use client";

import { FC, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

type Student = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avg_score: number;
  group?: { name: string };
};

type StudentModalProps = {
  student: Student | null;
  onClose: () => void;
};

const StudentModal: FC<StudentModalProps> = ({ student, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const { t,i18n } = useTranslation();
   const direction = i18n.dir();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!student || !mounted) return null;

  const data = [
    { label: t("studentModal.labels.name"), value: `${student.first_name} ${student.last_name}` },
    { label: t("studentModal.labels.email"), value: student.email },
    { label: t("studentModal.labels.role"), value: student.role },
    { label: t("studentModal.labels.group"), value: student.group?.name || t("studentModal.groupNA") },
    { label: t("studentModal.labels.avgScore"), value: student.avg_score }
  ];

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00000066] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-h-screen overflow-auto rounded-3xl shadow-2xl w-full sm:w-[600px] relative 
                   animate__animated animate__fadeInDown animate__faster"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className={`absolute top-5 ${direction === 'rtl' ? "left-5" :'right-5'} p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition cursor-pointer`}
          onClick={onClose}
        >
          <IoClose size={26} />
        </button>

        {/* Header */}
        <div className="p-3 sm:py-6 bg-gradient-to-r from-blue-100 to-blue-50 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{t("studentModal.title")}</h2>
        </div>

        {/* Body */}
        <div className="p-3 grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row justify-between items-center p-2 bg-gray-50 rounded-xl hover:bg-gray-100 gap-2 transition"
            >
              <span className="font-semibold text-gray-600 capitalize">
                {item.label}
              </span>
              <span className="text-gray-800 mt-1 sm:mt-0">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 sm:py-6 flex justify-end gap-3 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition cursor-pointer"
          >
            {t("studentModal.close")}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default StudentModal;
