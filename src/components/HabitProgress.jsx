
import React from "react";
import { motion } from "framer-motion";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Check } from "lucide-react";

export default function HabitProgress({ habit, onToggle }) {
  const startDate = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, index) => {
          const isCompleted = habit.completions.some(c => 
            isSameDay(new Date(c), date)
          );

          return (
            <motion.button
              key={date.toString()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(habit.id, date)}
              className={`
                flex items-center justify-center p-2 rounded-lg
                ${isCompleted 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              <div className="text-center">
                <div className="text-xs mb-1">{format(date, 'EEE')}</div>
                <div className="text-sm font-semibold">
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    format(date, 'd')
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
