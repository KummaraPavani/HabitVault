
import React, { useState } from "react";
import { useHabit } from "@/contexts/HabitContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function HabitForm({ onClose }) {
  const { addHabit } = useHabit();
  const [habit, setHabit] = useState({
    name: "",
    targetDays: "Everyday",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(habit);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Add New Habit
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              required
              value={habit.name}
              onChange={e => setHabit({
                ...habit,
                name: e.target.value
              })}
              placeholder="e.g., Drink 2L water"
            />
          </div>

          <div>
            <Label htmlFor="targetDays">Target Days</Label>
            <select
              id="targetDays"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={habit.targetDays}
              onChange={e => setHabit({
                ...habit,
                targetDays: e.target.value
              })}
            >
              <option>Everyday</option>
              <option>Weekdays</option>
              <option>Weekends</option>
              <option>Custom</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
