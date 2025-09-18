'use client'
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import NoData from "../no-data/noData";

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
  titleItem: string;
  setDataSingle?:any;
  data: Record<string, any>[];
  actions?: (row: Record<string, any>) => Action[];
}

const GenericTable: React.FC<GenericTableProps> = ({ columns, data,titleItem, actions,setDataSingle }) => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openRow]);

  const renderActionIcon = (action: Action, row: Record<string, any>) => {
    const handleClick = () => {
      action.onClick(row);
      setOpenRow(null);
    };

    return (
      <button
        onClick={handleClick}
        style={{ color: action.color }}
        className="flex items-center cursor-pointer gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        {action.type === "edit" && <FaEdit size={16} />}
        {action.type === "delete" && <FaTrash size={16} />}
        {action.type === "view" && <FaEye size={16} />}
        <span className="font-medium capitalize">{action.type}</span>
      </button>
    );
  };
if(!data.length) return <NoData />
  return (
    <div className="w-full rounded-[10px] overflow-hidden pb-20 select-none" >
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse rounded-lg overflow-auto">
          <thead>
            <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white uppercase">
              <th className="px-4 py-3 text-left text-sm font-semibold">-</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-sm font-semibold"
                >
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition-colors"
                onClick={()=>setDataSingle(row)}
              >
                <td className="px-4 py-3 text-sm text-gray-800 cursor-pointer transition">
                    {idx+1}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-3 text-sm text-gray-800 cursor-pointer transition"
                  >
                    {row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td
                    ref={(el) => (dropdownRefs.current[idx] = el)}
                    className="px-4 py-3 text-center relative"
                  >
                    <button
                      className="p-2 rounded-full cursor-pointer hover:bg-gray-200"
                      onClick={() =>
                        setOpenRow(openRow === idx ? null : idx)
                      }
                    >
                      <HiOutlineDotsVertical size={20} />
                    </button>
                    {openRow === idx && (
                      <div className="absolute top-4 right-0 mt-2 w-40 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
                        {actions(row).map((action, i) => (
                          <div onClick={()=>{action.onClick(row)}} key={i}>{renderActionIcon(action, row)}</div>
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

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4 pt-1">
        {data.map((row, idx) => (
          <div
            key={idx}
            className="relative bg-white border border-gray-100 rounded-3xl shadow-lg p-5 transition hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Actions Dropdown */}
            {actions && (
              <div className="absolute top-4 right-4" ref={(el) => (dropdownRefs.current[idx] = el)}>
                <button
                  className="p-2 cursor-pointer rounded-full hover:bg-gray-200"
                  onClick={() => setOpenRow(openRow === idx ? null : idx)}
                >
                  <HiOutlineDotsVertical size={20} />
                </button>
                {openRow === idx && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
                    {actions(row).map((action, i) => (
                      <div key={i} >{renderActionIcon(action, row)}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Card Header */}
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              {row.title || `${titleItem} ${idx + 1}`}
            </h3>

            {/* Card Body */}
            <div className="flex flex-col gap-3">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="flex flex-col bg-gray-50 p-3 rounded-xl shadow-sm"
                >
                  <span className="text-sm font-semibold text-gray-500">
                    {col.label}
                  </span>
                  <span className="text-gray-800 font-medium line-clamp-2">
                    {row[col.key]}
                  </span>
                </div>
              ))}
            </div>

            {/* Extra */}
            {row.extra && (
              <div className="mt-3 text-sm text-gray-500 line-clamp-2">
                {row.extra}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenericTable;
