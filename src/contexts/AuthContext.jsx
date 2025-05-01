
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    if (password.length < minLength) errors.push("Password must be at least 8 characters long");
    if (!hasUpperCase) errors.push("Password must contain at least one uppercase letter");
    if (!hasLowerCase) errors.push("Password must contain at least one lowercase letter");
    if (!hasNumbers) errors.push("Password must contain at least one number");
    if (!hasSpecialChar) errors.push("Password must contain at least one special character");

    return errors;
  };

  const login = async (email, password) => {
    try {
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find(u => u.email === email);

      if (!existingUser || existingUser.password !== password) {
        throw new Error("Invalid email or password");
      }

      const userData = { id: existingUser.id, email: existingUser.email };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to log in",
      });
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      // Validate password
      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        throw new Error(passwordErrors[0]);
      }

      // Check if email already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some(u => u.email === email)) {
        throw new Error("Email already registered");
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
      };

      // Save to users list
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Initialize empty habits array for new user
      localStorage.setItem(`habits_${newUser.id}`, JSON.stringify([]));

      // Log user in
      const userData = { id: newUser.id, email: newUser.email };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast({
        title: "Success",
        description: "Account created successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create account",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    validatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
