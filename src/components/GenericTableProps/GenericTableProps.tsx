"use client";
import { useState, useEffect, useRef } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaTable,
  FaList,
  FaThLarge,
  FaSearch,
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import NoData from "../no-data/noData";
import { useTranslation } from "react-i18next";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface Action<T> {
  type: "edit" | "delete" | "view";
  color: string;
  onClick: (row: T) => void;
}

interface GenericTableProps<T extends { _id?: string }> {
  columns: Column<T>[];
  titleItem: string;
  data: T[];
  setDataSingle?: (row: T) => void;
  actions?: (row: T) => Action<T>[];
  itemsPerPage?: number;
}

const GenericTable = <T extends { _id?: string }>({
  columns,
  data,
  titleItem,
  actions,
  setDataSingle,
  itemsPerPage = 5,
}: GenericTableProps<T>) => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card" | "list">("table");
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

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
    const close = () => setOpenRow(null);

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close);
    };
  }, [openRow]);

  const renderActionIcon = (action: Action<T>, row: T) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setDataSingle?.(row);
        action.onClick(row);
        setOpenRow(null);
      }}
      style={{ color: action.color }}
      className="flex items-center cursor-pointer gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition"
    >
      {action.type === "edit" && <FaEdit size={16} />}
      {action.type === "delete" && <FaTrash size={16} />}
      {action.type === "view" && <FaEye size={16} />}
      <span className="font-medium capitalize">
        {action.type === "edit" && t("genericTable_edit")}
        {action.type === "delete" && t("genericTable_delete")}
        {action.type === "view" && t("genericTable_view")}
      </span>
    </button>
  );

  return (
    <div className="w-full rounded-xl overflow-hidden pb-20 select-none">
      {/* Search + view mode */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-1/3">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder={t("genericTable_searchPlaceholder", { item: titleItem })}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode("table")}
            className={`hidden sm:inline-flex cursor-pointer p-2 rounded-lg shadow ${
              viewMode === "table" ? "bg-gray-200" : "bg-gray-100"
            }`}
          >
            <FaTable size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`cursor-pointer p-2 rounded-lg shadow ${
              viewMode === "list" ? "bg-gray-200" : "bg-gray-100"
            }`}
          >
            <FaList size={18} />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`cursor-pointer p-2 rounded-lg shadow ${
              viewMode === "card" ? "bg-gray-200" : "bg-gray-100"
            }`}
          >
            <FaThLarge size={18} />
          </button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <NoData />
      ) : (
        <>
          {/* Table View */}
          {viewMode === "table" && (
            <div className="w-full pt-12 pb-8 overflow-x-auto rounded-xl">
              <table className="w-full border-collapse bg-white rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase">
                    <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
                    {columns.map((col) => (
                      <th key={String(col.key)} className="px-4 py-3 text-left text-sm font-semibold">
                        {col.label}
                      </th>
                    ))}
                    {actions && (
                      <th className="px-4 py-3 text-center">{t("genericTable_actions")}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr
                      key={row._id ?? idx}
                      className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setDataSingle?.(row)}
                    >
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {startIdx + idx + 1}
                      </td>
                      {columns.map((col) => (
                        <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-800">
                          {String(row[col.key])}
                        </td>
                      ))}
                      {actions && (
                        <td
                          ref={(el) => (dropdownRefs.current[idx] = el)}
                          className="px-4 py-3 text-center relative"
                        >
                          <button
                            className="p-2 rounded-full cursor-pointer hover:bg-gray-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenRow(openRow === idx ? null : idx);
                            }}
                          >
                            <HiOutlineDotsVertical size={20} />
                          </button>
                          {openRow === idx && (
                            <div
                              className={`absolute w-40 bg-white rounded-xl shadow-xl z-50 overflow-hidden top-7 ${
                                isRTL ? "left-0" : "right-0"
                              }`}
                            >
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
          )}

          {/* Card/Grid View */}
          {viewMode === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map((row, idx) => (
                <div
                  key={row._id ?? idx}
                  onClick={() => setDataSingle?.(row)}
                  className="relative bg-white border border-gray-200 rounded-2xl shadow p-5 transition hover:shadow-md hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-gray-800">
                      {"title" in row ? String((row as any).title) : `${titleItem} ${startIdx + idx + 1}`}
                    </h3>
                    {actions && (
                      <div className="relative" ref={(el) => (dropdownRefs.current[idx] = el)}>
                        <button
                          className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenRow(openRow === idx ? null : idx);
                          }}
                        >
                          <HiOutlineDotsVertical size={20} />
                        </button>
                        {openRow === idx && (
                          <div
                            className={`absolute w-40 bg-white rounded-xl shadow-xl z-50 overflow-hidden top-10 ${
                              isRTL ? "left-0" : "right-0"
                            }`}
                          >
                            {actions(row).map((action, i) => (
                              <div key={i}>{renderActionIcon(action, row)}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    {columns.map((col) => (
                      <div key={String(col.key)} className="flex flex-col bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm font-semibold text-gray-500">
                          {col.label}
                        </span>
                        <span className="text-gray-800 font-medium line-clamp-2">
                          {String(row[col.key])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="flex flex-col gap-3">
              {paginatedData.map((row, idx) => (
                <div
                  key={row._id ?? idx}
                  onClick={() => setDataSingle?.(row)}
                  className="flex items-center justify-between bg-white border rounded-xl shadow p-4 hover:shadow-md transition cursor-pointer"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {"title" in row ? String((row as any).title) : `${titleItem} ${startIdx + idx + 1}`}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {columns.map((col) => `${String(row[col.key])} `).join(" | ")}
                    </p>
                  </div>
                  {actions && (
                    <div className="relative" ref={(el) => (dropdownRefs.current[idx] = el)}>
                      <button
                        className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenRow(openRow === idx ? null : idx);
                        }}
                      >
                        <HiOutlineDotsVertical size={20} />
                      </button>
                      {openRow === idx && (
                        <div
                          className={`absolute w-40 bg-white rounded-xl shadow-xl z-50 overflow-hidden top-10 ${
                            isRTL ? "left-0" : "right-0"
                          }`}
                        >
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
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded-lg cursor-pointer disabled:opacity-50"
              >
                {t("genericTable_prev")}
              </button>
              <span className="text-sm">
                {t("genericTable_page", { current: page, total: totalPages })}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded-lg cursor-pointer disabled:opacity-50"
              >
                {t("genericTable_next")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GenericTable;
