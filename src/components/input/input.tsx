// import React from "react";
// import { FieldErrors, UseFormRegister } from "react-hook-form";

// interface InputProps<T extends Record<string, unknown>> {
//   label: string;
//   placeholder: string;
//   type: string;
//   children?: React.ReactNode;
//   name: keyof T;
//   validation: {
//     required: string;
//     pattern?: {
//       value: RegExp;
//       message: string;
//     };
//   };
//   register: UseFormRegister<T>;
//   error: FieldErrors<T>;
// }

// export default function Input<T extends Record<string, unknown>>({
//   label,
//   placeholder,
//   type,
//   children,
//   register,
//   name,
//   validation,
//   error,
// }: InputProps<T>) {
//   return (
//     <div className="w-full mb-[25px]">
//       <label
//         className="text-white w-full block mb-[5px] ml-[10px] capitalize"
//         htmlFor={String(name)}
//       >
//         {label}
//       </label>

//       <div className="w-full rounded-[10px] border-2 flex-row-reverse justify-center items-center border-white bg-[#0D1321] flex gap-0.5 py-[10px] px-[16px] ">
//         <input
//           {...register(name, validation)}
//           id={String(name)}
//           type={type}
//           placeholder={placeholder}
//           className=" bg-transparent text-white w-full text-[14px] ml-[8px] outline-0"
//         />
//         {children}
//       </div>

//       {error[name]?.message && (
//         <div className="text-amber-600 capitalize">
//           {error[name]?.message as string}
//         </div>
//       )}
//     </div>
//   );
// }

import { FaCalendarAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { ComponentProps, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type ScheduleInputProps = {
  label: string;
  error?: string;
  width?: string;
  startWithIcon?: React.ReactNode;
  endWithIcon?: React.ReactNode;
} & ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, ScheduleInputProps>(
  ({ label, error, width, placeholder, startWithIcon, endWithIcon, type, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
      inputRef.current?.showPicker?.();
    };

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div style={{ width }}>
        <div className="flex flex-col w-full mb-4">
          <div className="w-full mb-1" onClick={handleClick}>
            {/* Label */}
            <label className="text-white w-full block mb-[5px] ml-[10px] capitalize">
              {label}
            </label>

            {/* Input */}
            <div className="relative flex items-center gap-0.5 text-sm text-white px-2 py-1 w-full rounded-[8px] border-4">
              {(type === "date" || type === "datetime-local") && (
                <FaCalendarAlt className="text-gray-500" />
              )}

              {startWithIcon && <span>{startWithIcon}</span>}

              <input
                ref={(el) => {
                  inputRef.current = el;
                  if (typeof ref === "function") ref(el);
                  else if (ref)
                    (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
                }}
                {...rest}
                type={inputType}
                placeholder={placeholder ?? t("inputAdvancedComponent.placeholder")}
                className="bg-transparent text-white w-full text-[14px] p-2 outline-0"
              />

              {type === "password" ? (
                <span
                  className="cursor-pointer text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
                </span>
              ) : (
                endWithIcon && <span>{endWithIcon}</span>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <span className="text-amber-600 capitalize">
              {error || t("inputAdvancedComponent.errorRequired")}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
