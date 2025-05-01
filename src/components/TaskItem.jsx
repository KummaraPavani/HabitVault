
import React, { useState } from "react";
import { useTask } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

export default function TaskItem({ task }) {
  const { tasks, updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const subtasks = tasks.filter(t => t.parentTaskId === task.id);

  const handleSave = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card priority-${task.weight}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTask.title}
            onChange={e => setEditedTask({
              ...editedTask,
              title: e.target.value
            })}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editedTask.description}
            onChange={e => setEditedTask({
              ...editedTask,
              description: e.target.value
            })}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <div className="mt-2 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      {subtasks.length > 0 && (
        <div className="mt-4 pl-4 border-l">
          {subtasks.map(subtask => (
            <TaskItem key={subtask.id} task={subtask} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
