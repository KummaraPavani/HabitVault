
import React, { useState } from "react";
import { useTask } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function TaskForm({ parentTaskId, onClose }) {
  const { addTask } = useTask();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    weight: 1,
    parentTaskId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
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
        className="bg-white p-6 rounded-lg w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <h2 className="text-2xl font-bold mb-4">
          {parentTaskId ? "Add Subtask" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={task.title}
              onChange={e => setTask({
                ...task,
                title: e.target.value
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={task.description}
              onChange={e => setTask({
                ...task,
                description: e.target.value
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={task.dueDate}
              onChange={e => setTask({
                ...task,
                dueDate: e.target.value
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weight (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={task.weight}
              onChange={e => setTask({
                ...task,
                weight: parseInt(e.target.value)
              })}
            />
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
