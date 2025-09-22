import { FaCalendarAlt } from "react-icons/fa";
import React, { ComponentProps, useRef } from "react";
import { useTranslation } from "react-i18next";

type ScheduleInputProps = {
  label: string; // translation key for label
  error?: string;
  width?: string;
} & ComponentProps<"input">;

const InputAdvanced = React.forwardRef<HTMLInputElement, ScheduleInputProps>(
  ({ label, error, width, placeholder, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { t } = useTranslation();

    const handleClick = () => {
      inputRef.current?.showPicker?.();
    };

    return (
      <div style={{ width }}>
        <div className="flex flex-col w-full">
          <div
            className="flex bg-transparent items-center border rounded-lg overflow-hidden"
            onClick={handleClick}
          >
            {/* Label */}
            <label className="block w-auto text-sm capitalize p-2 text-center bg-[#FFEDDF] h-full font-semibold">
              {label}
            </label>

            {/* Input */}
            <div className="relative flex items-center gap-2 text-sm text-gray-700 px-2 w-full">
              {(rest?.type === "date" || rest?.type === "datetime-local") && (
                <FaCalendarAlt className="text-gray-500" />
              )}
              <input
                ref={(el) => {
                  inputRef.current = el;
                  if (typeof ref === "function") ref(el);
                  else if (ref)
                    (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                      el;
                }}
                {...rest}
                placeholder={placeholder ?? t("inputAdvancedComponent.placeholder")}
                className="flex-1 p-2 text-sm outline-none bg-transparent placeholder:capitalize"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <span className="text-red-500 text-sm mt-1 capitalize">
              {error || t("inputAdvancedComponent.errorRequired")}
            </span>
          )}
        </div>
      </div>
    );
  }
);

InputAdvanced.displayName = "InputAdvanced";

export default InputAdvanced;









// import { FaCalendarAlt } from "react-icons/fa";
// import React, { ComponentProps, useRef } from "react";
// import { useTranslation } from "react-i18next";

// type ScheduleInputProps = {
//   label: string; // translation key for label
//   error?: string;
//   width?: string;
// } & ComponentProps<"input">;

// const Input = React.forwardRef<HTMLInputElement, ScheduleInputProps>(
//   ({ label, error, width, placeholder, ...rest }, ref) => {
//     const inputRef = useRef<HTMLInputElement | null>(null);
//     const { t } = useTranslation();

//     const handleClick = () => {
//       inputRef.current?.showPicker?.();
//     };

//     return (
//       <div style={{ width }}>
//         <div className="flex flex-col w-full">
//           <div
//             className="flex bg-transparent items-center border rounded-lg overflow-hidden"
//             onClick={handleClick}
//           >
//             {/* Label */}
//             <label className="text-white w-full block mb-[5px] ml-[10px] capitalize">
//               {label}
//             </label>

//             {/* Input */}
//             <div className="w-full rounded-[10px] border-2 flex-row-reverse justify-center items-center border-white bg-[#0D1321] flex gap-0.5 py-[10px] px-[16px] ">
//               {(rest?.type === "date" || rest?.type === "datetime-local") && (
//                 <FaCalendarAlt className="text-gray-500" />
//               )}
//               <input
//                 ref={(el) => {
//                   inputRef.current = el;
//                   if (typeof ref === "function") ref(el);
//                   else if (ref)
//                     (ref as React.MutableRefObject<HTMLInputElement | null>).current =
//                       el;
//                 }}
//                 {...rest}
//                 placeholder={placeholder ?? t("inputAdvancedComponent.placeholder")}
//                 className="bg-transparent text-white w-full text-[14px] ml-[8px] outline-0"
//               />
//             </div>
//           </div>

//           {/* Error */}
//           {error && (
//             <span className="text-amber-600 capitalize">
//               {error || t("inputAdvancedComponent.errorRequired")}
//             </span>
//           )}
//         </div>
//       </div>
//     );
//   }
// );

// Input.displayName = "InputAdvanced";

// export default Input;


// interface TypeData {
//   label:string
//   placeholder:string
//   type:string
//   children:React.ReactNode
//   name:string
//   validation:{required: string;
//     pattern?: {
//         value: RegExp;
//         message: string;
//     };}
//   register: UseFormRegister<LoginFormInputs>
//   error:any

// }

// export function Input({label,placeholder,type,children,register,name,validation ,error}:TypeData) {
  
//   return (
//     <div className='w-full mb-[25px]'> 
//       <label className='text-white w-full block mb-[5px] ml-[10px] capitalize' htmlFor={type+placeholder}>{label}</label>
//       <div className='w-full rounded-[10px] border-2 flex-row-reverse justify-center items-center border-white bg-[#0D1321] flex gap-0.5 py-[10px] px-[16px] '>

//         <input {...(register ? register(name, validation) : {})} id={type+placeholder} type={type} placeholder={placeholder} 
//         className=" bg-transparent text-white w-full text-[14px] ml-[8px] outline-0" />
//         {children}
//       </div>
//       {error ? error[name]&&<div className='text-amber-600 capitalize'>{error[name].message}</div> : ''}
//     </div>
//   )
// }
