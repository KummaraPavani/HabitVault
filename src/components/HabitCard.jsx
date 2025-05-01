
import React from "react";
import { useHabit } from "@/contexts/HabitContext";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HabitCard({ habit }) {
  const { toggleHabitCompletion, deleteHabit, calculateStreak, getCompletionRate } = useHabit();
  const streak = calculateStreak(habit.completions);
  const completionRate = getCompletionRate(habit);

  const handleToggle = () => {
    toggleHabitCompletion(habit.id, new Date().toISOString());
  };

  const todayCompletion = habit.completions.find(c => 
    format(new Date(c.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <motion.div
      className="habit-card"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {habit.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {habit.targetDays}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteHabit(habit.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className={`streak-badge ${streak > 0 ? 'streak-badge-active' : 'streak-badge-inactive'}`}>
          🔥 {streak} day streak
        </div>
        <div className="text-sm text-gray-500">
          {completionRate.toFixed(0)}% complete
        </div>
      </div>

      <Button
        variant={todayCompletion?.completed ? "default" : "outline"}
        className="w-full"
        onClick={handleToggle}
      >
        {todayCompletion?.completed ? "Completed Today ✓" : "Mark Complete"}
      </Button>
    </motion.div>
  );
}
