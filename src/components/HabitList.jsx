
import React from "react";
import { useHabit } from "@/contexts/HabitContext";
import HabitCard from "@/components/HabitCard";
import { motion } from "framer-motion";

export default function HabitList() {
  const { habits } = useHabit();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Habits</h2>
      <div className="habit-grid">
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <HabitCard habit={habit} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
