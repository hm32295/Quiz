"use client";
import { FC, ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";




interface ViewDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: { label: string; value: string | number | ReactNode }[];
}

const ViewDataModal: FC<ViewDataModalProps> = ({ isOpen, onClose, title, data }) => {
  const { t ,i18n} = useTranslation();


  const direction = i18n.dir();
  if (!isOpen) return null;

  return (
    <div
      className="fixed select-none inset-0 z-50 flex items-center justify-center bg-[#00000066] bg-opacity-60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-h-screen overflow-auto rounded-3xl shadow-2xl w-full sm:w-[600px] relative 
                   animate__animated animate__fadeInDown animate__faster"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className={`absolute top-5 ${direction === 'rtl' ? "left-5":"right-5"} p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition cursor-pointer`}
          onClick={onClose}
        >
          <IoClose size={26} />
        </button>

        {/* Header */}
        <div className="p-3 sm:py-6 bg-gradient-to-r from-blue-100 to-blue-50 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("viewDataModal_unique.headerTitle", { title })}
          </h2>
        </div>

        {/* Body */}
        <div className="p-3 grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2">
          {data?.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row justify-between items-center p-2 bg-gray-50 rounded-xl hover:bg-gray-100 gap-2 transition"
            >
              <span className="font-semibold text-gray-600 capitalize">{item.label}</span>
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
            {t("viewDataModal_unique.closeButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDataModal;
