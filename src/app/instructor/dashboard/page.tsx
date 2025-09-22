"use client";

import TopStudents from "@/components/topStudents/topStudents";
import UpcomingQuizzes from "@/components/upcomingQuizzes/upcomingQuizzes";


export default function Dashboard() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 p-1">
     <div className="bg-white rounded-2xl shadow p-4 animate__animated animate__fadeInRight">
        <UpcomingQuizzes />
     </div>
      
      <TopStudents />
    </div>
  );
}
