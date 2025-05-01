
import React from "react";
import { useTask } from "@/contexts/TaskContext";
import TaskItem from "@/components/TaskItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function TaskList() {
  const { tasks } = useTask();

  const mainTasks = tasks.filter(task => !task.parentTaskId);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <DndContext collisionDetection={closestCenter}>
        <SortableContext
          items={mainTasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {mainTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
