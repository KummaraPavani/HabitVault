
import React from "react";
import { useHabit } from "@/contexts/HabitContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

export default function StatsView() {
  const { habits, calculateStreak, getCompletionRate } = useHabit();

  const habitStats = habits.map(habit => ({
    name: habit.name,
    streak: calculateStreak(habit.completions),
    completionRate: getCompletionRate(habit)
  }));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Habit Statistics
        </h2>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={habitStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="streak" fill="#4F46E5" name="Current Streak" />
              <Bar dataKey="completionRate" fill="#10B981" name="Completion Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
