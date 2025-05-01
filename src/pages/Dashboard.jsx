
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useHabit } from "@/contexts/HabitContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import HabitList from "@/components/HabitList";
import HabitForm from "@/components/HabitForm";
import StatsView from "@/components/StatsView";
import { Sun, Moon } from "lucide-react";

export default function Dashboard() {
  const { logout } = useAuth();
  const { habits } = useHabit();
  const { isDark, toggleTheme } = useTheme();
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [view, setView] = useState("list");

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HabitVault</h1>
          <div className="flex gap-4 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              onClick={() => setView(view === "list" ? "stats" : "list")}
            >
              {view === "list" ? "View Stats" : "View Habits"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowHabitForm(true)}
            >
              Add Habit
            </Button>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "list" ? (
          <HabitList />
        ) : (
          <StatsView habits={habits} />
        )}
      </main>

      {showHabitForm && (
        <HabitForm onClose={() => setShowHabitForm(false)} />
      )}
    </div>
  );
}
