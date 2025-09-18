import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { useState } from "react";

interface ScheduleCardProps {
  onChange?: (data: { date: string; time: string }) => void;
}

export default function ScheduleCard({
  onChange,
}: ScheduleCardProps) {
  const [date, setDate] = useState("2023-05-11");
  const [time, setTime] = useState("13:00");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    onChange?.({ date: e.target.value, time });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    onChange?.({ date, time: e.target.value });
  };

  return (
    <div className="flex items-center gap-3 border rounded-full px-3 py-2 bg-white shadow-sm w-fit">
      {/* Schedule Button */}
      <span className="bg-[#FFEDDF] text-black px-3 py-1 rounded-full text-sm font-medium">
        Schedule
      </span>

      {/* Date */}
      <div className="relative flex items-center gap-1 text-sm text-gray-700">
        <FaCalendarAlt className="text-gray-500" />
        <span>{new Date(date).toLocaleDateString("en-GB")}</span>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Time */}
      <div className="relative flex items-center gap-1 text-sm text-gray-700">
        <FaClock className="text-gray-500" />
        <span>{time}</span>
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
