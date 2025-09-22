import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps<T extends Record<string, any>> {
  label: string;
  placeholder: string;
  type: string;
  children: React.ReactNode;
  name: keyof T;
  validation: {
    required: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  register: UseFormRegister<T>;
  error: FieldErrors<T>;
}

export default function Input<T extends Record<string, any>>({
  label,
  placeholder,
  type,
  children,
  register,
  name,
  validation,
  error,
}: InputProps<T>) {
  return (
    <div className="w-full mb-[25px]">
      <label
        className="text-white w-full block mb-[5px] ml-[10px] capitalize"
        htmlFor={String(name)}
      >
        {label}
      </label>

      <div className="w-full rounded-[10px] border-2 flex-row-reverse justify-center items-center border-white bg-[#0D1321] flex gap-0.5 py-[10px] px-[16px] ">
        <input
          {...register(name, validation)}
          id={String(name)}
          type={type}
          placeholder={placeholder}
          className=" bg-transparent text-white w-full text-[14px] ml-[8px] outline-0"
        />
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
