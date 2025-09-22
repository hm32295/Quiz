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
