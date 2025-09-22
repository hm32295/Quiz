"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface typeData {
  first_name: string;
  last_name: string;
  _id: string;
}

interface typeProps {
  setValue: (field: string, value: any) => void;
  data: typeData[];
  setOpenDropdown: (val: boolean) => void;
  openDropdown: boolean;
  dataUpdata?: { name?: string; students: string[] };
}

export default function SelectBoxGroup({
  data,
  setValue,
  setOpenDropdown,
  openDropdown,
  dataUpdata,
}: typeProps) {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (id: string) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const removeSelectedOption = (id: string) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== id));
  };

  useEffect(() => {
    if (dataUpdata?.name) {
      setSelectedOptions([...dataUpdata.students]);
    }
  }, [dataUpdata]);

  useEffect(() => {
    setValue("students", selectedOptions);
  }, [selectedOptions, setValue]);

  return (
    <div
      className="flex items-center border rounded-lg p-2"
      onClick={(e) => e.stopPropagation()}
    >
      <label
        htmlFor="selectBox"
        className="block capitalize text-center bg-[#FFEDDF] h-full font-semibold text-sm sm:text-base px-2"
      >
        {t("selectBoxGroup.label")}
      </label>
      <div className="relative w-full">
        {/* Select Box Header/Toggle */}
        <div
          className="border p-2 rounded cursor-pointer flex justify-between items-center bg-gray-100"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <div className="flex flex-wrap gap-2">
            {selectedOptions.length === 0 ? (
              <span className="text-gray-500">
                {t("selectBoxGroup.placeholder")}
              </span>
            ) : (
              selectedOptions.map((id) => {
                const student = data.find((opt) => opt._id === id);
                return (
                  <span
                    key={id}
                    className="bg-[#FFEDDF] text-black capitalize px-2 py-1 rounded flex items-center gap-1"
                  >
                    {student?.first_name} {student?.last_name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectedOption(id);
                      }}
                      className="ml-1 text-blue-800 hover:text-blue-900"
                      aria-label={t("selectBoxGroup.remove")}
                    >
                      &times;
                    </button>
                  </span>
                );
              })
            )}
          </div>
          <span>&#9662;</span> {/* Dropdown arrow */}
        </div>

        {/* Options Dropdown */}
        {openDropdown && (
          <div className="absolute z-10 w-full mt-1 border rounded shadow-lg bg-white max-h-40 overflow-y-auto">
            {data.map((option) => (
              <div
                key={option._id}
                className={`p-2 cursor-pointer hover:bg-gray-100  ${
                  selectedOptions.includes(option._id)
                    ? "bg-[#FFEDDF] mt-0.5"
                    : ""
                }`}
                onClick={() => handleOptionClick(option._id)}
              >
                {option.first_name} {option.last_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
