"use client";

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export default function TableSkeleton({ rows = 5, cols = 4 }: TableSkeletonProps) {
  return (
    <div className="w-full rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="p-2 bg-gray-100"></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <td key={colIndex} className="p-3">
                  <div className="h-14 bg-gray-200 animate-pulse rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
