
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { addDays, isSameDay, differenceInDays, startOfToday } from "date-fns";

const HabitContext = createContext({});

export function useHabit() {
  return useContext(HabitContext);
}

export default function HabitProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Clear habits when user logs out
  useEffect(() => {
    if (!user) {
      setHabits([]);
      return;
    }

    // Load habits for current user only
    const storedHabits = localStorage.getItem(`habits_${user.id}`);
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    } else {
      // Initialize empty habits array for new user
      setHabits([]);
      localStorage.setItem(`habits_${user.id}`, JSON.stringify([]));
    }
  }, [user]);

  const calculateStreak = (completions) => {
    if (!completions?.length) return 0;
    
    let streak = 0;
    const today = startOfToday();
    let currentDate = today;
    
    while (true) {
      const completion = completions.find(c => 
        isSameDay(new Date(c.date), currentDate)
      );
      
      if (!completion || !completion.completed) break;
      
      streak++;
      currentDate = addDays(currentDate, -1);
    }
    
    return streak;
  };

  const addHabit = (habit) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to add habits",
      });
      return;
    }

    const newHabit = {
      ...habit,
      id: Date.now().toString(),
      userId: user.id, // Add userId to habit
      completions: [],
      createdAt: new Date().toISOString()
    };

    const newHabits = [...habits, newHabit];
    setHabits(newHabits);
    localStorage.setItem(`habits_${user.id}`, JSON.stringify(newHabits));
    
    toast({
      title: "Success",
      description: "Habit added successfully",
    });
  };

  const toggleHabitCompletion = (habitId, date) => {
    if (!user) return;

    const newHabits = habits.map(habit => {
      if (habit.id !== habitId || habit.userId !== user.id) return habit;

      const existingCompletion = habit.completions.find(c => 
        isSameDay(new Date(c.date), new Date(date))
      );

      let newCompletions;
      if (existingCompletion) {
        newCompletions = habit.completions.map(c => 
          isSameDay(new Date(c.date), new Date(date))
            ? { ...c, completed: !c.completed }
            : c
        );
      } else {
        newCompletions = [
          ...habit.completions,
          { date, completed: true }
        ];
      }

      return {
        ...habit,
        completions: newCompletions
      };
    });

    setHabits(newHabits);
    localStorage.setItem(`habits_${user.id}`, JSON.stringify(newHabits));
  };

  const deleteHabit = (habitId) => {
    if (!user) return;

    // Only delete if habit belongs to current user
    const newHabits = habits.filter(h => !(h.id === habitId && h.userId === user.id));
    setHabits(newHabits);
    localStorage.setItem(`habits_${user.id}`, JSON.stringify(newHabits));
    
    toast({
      title: "Success",
      description: "Habit deleted successfully",
    });
  };

  const getCompletionRate = (habit) => {
    if (!habit.completions.length) return 0;
    const completed = habit.completions.filter(c => c.completed).length;
    return (completed / habit.completions.length) * 100;
  };

  const value = {
    habits: user ? habits.filter(h => h.userId === user.id) : [], // Only return current user's habits
    addHabit,
    toggleHabitCompletion,
    deleteHabit,
    calculateStreak,
    getCompletionRate
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}
