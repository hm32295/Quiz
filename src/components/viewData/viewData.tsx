"use client";
import { FC } from "react";
import { IoClose } from "react-icons/io5";

interface ViewDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: { label: string; value: string | number }[];
}

const ViewDataModal: FC<ViewDataModalProps> = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] bg-opacity-60 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white h-auto overflow-auto rounded-3xl shadow-2xl w-full  relative transform transition-transform duration-300 hover:scale-[1.02]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute cursor-pointer top-5 right-5 p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <IoClose size={26} />
        </button>

        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-50 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title + ' Details' }</h2>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 gap-2 transition"
            >
              <span className="font-semibold text-gray-600 capitalize">{item.label}</span>
              <span className="text-gray-800 mt-1 sm:mt-0">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 flex justify-end gap-3 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 cursor-pointer bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDataModal;
