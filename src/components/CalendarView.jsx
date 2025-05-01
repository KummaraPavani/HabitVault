
import React from "react";
import { useTask } from "@/contexts/TaskContext";
import { motion } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

export default function CalendarView() {
  const { tasks } = useTask();
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {format(today, "MMMM yyyy")}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dayTasks = tasks.filter(task =>
            isSameDay(new Date(task.dueDate), day)
          );

          return (
            <motion.div
              key={day.toString()}
              className="min-h-[100px] border rounded-lg p-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
            >
              <div className="text-right text-sm text-gray-600">
                {format(day, "d")}
              </div>
              <div className="mt-1 space-y-1">
                {dayTasks.map(task => (
                  <div
                    key={task.id}
                    className={`text-xs p-1 rounded priority-${task.weight} truncate`}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
