
import React from "react";
import { useTask } from "@/contexts/TaskContext";
import { motion } from "framer-motion";

export default function UrgentTasks() {
  const { getTopUrgentTasks } = useTask();
  const urgentTasks = getTopUrgentTasks();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Top 5 Urgent Tasks</h2>
      <div className="space-y-4">
        {urgentTasks.map((task, index) => (
          <motion.div
            key={task.id}
            className={`p-4 rounded-lg shadow-sm priority-${task.weight}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
