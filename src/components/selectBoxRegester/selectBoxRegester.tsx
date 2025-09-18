type SelectBoxProps = {
  label: string;
  placeholder?: string;
  name: string;
  register?: any;
  validation?: object;
  error?: any;
  options: { value: string; label: string }[];
  children?: React.ReactNode;
};

export default function SelectBox({
  label,
  placeholder,
  name,
  register,
  validation,
  error,
  options,
  children,
}: SelectBoxProps) {
  return (
    <div className="w-full mb-[25px]">
      <label
        className="text-white w-full block mb-[5px] ml-[10px] capitalize"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="w-full rounded-[10px] border-2 flex-row-reverse justify-center items-center border-white bg-[#0D1321] flex gap-0.5 py-[10px] px-[16px]">
        <select
          {...(register ? register(name, validation) : {})}
          id={name}
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
      {error ? (
        error[name] && (
          <div className="text-amber-600 capitalize">{error[name].message}</div>
        )
      ) : (
        ""
      )}
    </div>
  );
}
