import React, { ComponentProps } from "react";
import { useTranslation } from "react-i18next";

type Option = {
  label: string;
  value: string | number;
};

type InputFieldProps = {
  label: string;
  error?: string;
  width?: string;
  options: Option[];
  placeholder?: string;
} & ComponentProps<"select">;

const SelectBox = React.forwardRef<HTMLSelectElement, InputFieldProps>(
  ({ label, error, options, width, placeholder, ...rest }, ref) => {
    const { t } = useTranslation();

    return (
      <div style={{ width: width }}>
        <div className="flex flex-col w-full">
          <div className="flex bg-transparent items-center border rounded-lg overflow-hidden">
            <label className="block w-auto text-sm capitalize p-2 text-center bg-[#FFEDDF] h-full font-semibold">
              {label}
            </label>
            <select
              ref={ref}
              {...rest}
              defaultValue=""
              className="flex-1 p-2 capitalize text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#fff] bg-white h-full"
            >
              <option disabled className="text-gray-400 capitalize mb-2 bg-gray-100">
                {placeholder ?? t("selectBoxComponent.placeholder")}
              </option>

              {(options ?? []).map((opt, index) => (
                <option
                  key={opt.value + index.toString()}
                  value={opt.value}
                  className="text-gray-700 capitalize hover:bg-[#FFEDDF]"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <span className="text-red-500 text-sm mt-1">
              {error || t("selectBoxComponent.errorRequired")}
            </span>
          )}
        </div>
      </div>
    );
  }
);

SelectBox.displayName = "SelectBox";

export default SelectBox;
