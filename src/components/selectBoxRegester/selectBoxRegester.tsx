import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface SelectBoxProps<T extends Record<string, any>> {
  label: string;
  placeholder?: string;
  name: keyof T;
  register: UseFormRegister<T>;
  validation?: {
    required?: string;
    pattern?: { value: RegExp; message: string };
  };
  error: FieldErrors<T>;
  options: { value: string; label: string }[];
  children?: React.ReactNode;
}

export default function SelectBox<T extends Record<string, any>>({
  label,
  placeholder,
  name,
  register,
  validation,
  error,
  options,
  children,
}: SelectBoxProps<T>) {
  return (
    <div className="w-full mb-[25px]">
      <label
        className="text-white w-full block mb-[5px] ml-[10px] capitalize"
        htmlFor={String(name)}
      >
        {label}
      </label>

      <div className="w-full rounded-[10px] border-2 flex-row-reverse justify-center items-center border-white bg-[#0D1321] flex gap-0.5 py-[10px] px-[16px]">
        <select
          {...register(name, validation)}
          id={String(name)}
          className="bg-transparent text-white w-full text-[14px] ml-[8px] outline-0"
          defaultValue=""
        >
          <option value="" disabled className="bg-[#0D1321]">
            {placeholder || "اختر"}
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value} className="bg-[#0D1321]">
              {opt.label}
            </option>
          ))}
        </select>
        {children}
      </div>

      {error[name] && (
        <div className="text-amber-600 capitalize">
          {String(error[name]?.message)}
        </div>
      )}
    </div>
  );
}
