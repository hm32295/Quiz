'use client'
interface typeSize{
    sm: "h-4 w-4";
    md: "h-6 w-6";
    lg: "h-10 w-10";
}
export default function Spinner({ size = "md" }:{size?:'sm' | "md" | 'lg'}) {
  const sizes:typeSize = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 ${sizes[size]}`}
      ></div>
    </div>
  );
}
