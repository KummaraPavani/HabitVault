
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/contexts/AuthContext";
import HabitProvider from "@/contexts/HabitContext";
import ThemeProvider from "@/contexts/ThemeContext";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivateRoute from "@/components/PrivateRoute";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <HabitProvider>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/register" replace />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
            <Toaster />
          </HabitProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
