'use client'
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface Column {
  key: string;
  label: string;
}

interface Action {
  type: "edit" | "delete" | "view";
  color: string;
  onClick: (row: Record<string, any>) => void;
}

interface GenericTableProps {
  columns: Column[];
  data: Record<string, any>[];
  actions?: (row: Record<string, any>) => Action[];
}

const GenericTable: React.FC<GenericTableProps> = ({ columns, data, actions }) => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // إغلاق الدروب داون عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openRow !== null &&
        dropdownRefs.current[openRow] &&
        !dropdownRefs.current[openRow]?.contains(e.target as Node)
      ) {
        setOpenRow(null);
      }
    };

    document.addEventListener("click", handleClickOutside); // استخدم click مش mousedown
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openRow]);

  const renderActionIcon = (action: Action, row: Record<string, any>) => {
    const handleClick = () => {
      action.onClick(row); 
      setOpenRow(null); // يقفل بعد تنفيذ الأكشن
    };

    const btnClasses =
      "cursor-pointer flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100";

    switch (action.type) {
      case "edit":
        return (
          <button onClick={handleClick} style={{ color: action.color }} className={btnClasses}>
            <FaEdit size={16} /> Edit
          </button>
        );
      case "delete":
        return (
          <button onClick={handleClick} style={{ color: action.color }} className={btnClasses}>
            <FaTrash size={16} /> Delete
          </button>
        );
      case "view":
        return (
          <button onClick={handleClick} style={{ color: action.color }} className={btnClasses}>
            <FaEye size={16} /> View
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Table for large screens */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-900 text-white">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-2 border border-gray-300 text-left">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 py-2 border border-gray-300">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-100 transition-colors border-t">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 border border-gray-300">
                    {row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td
                    ref={(el) => (dropdownRefs.current[idx] = el)}
                    className="px-4 py-2 border border-gray-300 text-center relative overflow-visible"
                  >
                    <button
                      className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                      onClick={() => setOpenRow(openRow === idx ? null : idx)}
                    >
                      <HiOutlineDotsVertical size={20} />
                    </button>
                    {openRow === idx && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border overflow-hidden rounded-lg shadow-lg z-50">
                        {actions(row).map((action, i) => (
                          <div key={i}>{renderActionIcon(action, row)}</div>
                        ))}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="block md:hidden space-y-4">
        {data.map((row, idx) => (
          <div key={idx} className="border rounded-lg shadow p-4 bg-white flex justify-between items-start">
            <div className="flex-1">
              {columns.map((col) => (
                <div key={col.key} className="flex justify-between py-1">
                  <span className="font-semibold">{col.label}:</span>
                  <span>{row[col.key]}</span>
                </div>
              ))}
            </div>

            {/* Actions as dropdown */}
            {actions && (
              <div ref={(el) => (dropdownRefs.current[idx] = el)} className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                  onClick={() => setOpenRow(openRow === idx ? null : idx)}
                >
                  <HiOutlineDotsVertical size={20} />
                </button>
                {openRow === idx && (
                  <div className="absolute right-0 mt-2 w-32 bg-white overflow-hidden border rounded-lg shadow-lg z-50">
                    {actions(row).map((action, i) => (
                      <div key={i}>{renderActionIcon(action, row)}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenericTable;
