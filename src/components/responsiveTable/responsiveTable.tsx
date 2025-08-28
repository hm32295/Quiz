import React from "react";

interface Question {
  title: string;
  desc: string;
  level: string;
  date: string;
}

interface Props {
  data: Question[];
}

const ResponsiveTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full">
      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white text-left">
              <th className="p-3">Question Title</th>
              <th className="p-3">Question Desc</th>
              <th className="p-3">Difficulty</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((q, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{q.title}</td>
                <td className="p-3">{q.desc}</td>
                <td className="p-3">{q.level}</td>
                <td className="p-3">{q.date}</td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="grid gap-4 md:hidden">
        {data.map((q, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 border"
          >
            <p className="text-gray-700">
              <span className="font-semibold">Title:</span> {q.title}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Desc:</span> {q.desc}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Level:</span> {q.level}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Date:</span> {q.date}
            </p>
            <div className="mt-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTable;
