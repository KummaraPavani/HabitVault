
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function OfferSession() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [session, setSession] = useState({
    category: "",
    title: "",
    description: "",
    date: "",
    time: "",
    duration: 60,
    maxParticipants: 5,
    credits: 20
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new session with user ID and generated session ID
    const newSession = {
      ...session,
      id: Date.now(),
      teacherId: user.id,
      participants: [],
      status: 'scheduled'
    };

    // Save to localStorage
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push(newSession);
    localStorage.setItem('sessions', JSON.stringify(sessions));

    toast({
      title: "Success",
      description: "Your session has been created successfully!",
    });

    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Offer a Learning Session</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="category">Course Category</Label>
              <select
                id="category"
                value={session.category}
                onChange={(e) => setSession(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="arts">Arts</option>
                <option value="languages">Languages</option>
                <option value="science">Science</option>
              </select>
            </div>

            <div>
              <Label htmlFor="title">Session Title</Label>
              <Input
                id="title"
                value={session.title}
                onChange={(e) => setSession(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Introduction to Web Development"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Session Description</Label>
              <textarea
                id="description"
                value={session.description}
                onChange={(e) => setSession(prev => ({ ...prev, description: e.target.value }))}
                placeholder="What will participants learn?"
                className="w-full px-3 py-2 border rounded-md h-32"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    value={session.date}
                    onChange={(e) => setSession(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="time">Time</Label>
                <div className="relative">
                  <Input
                    id="time"
                    type="time"
                    value={session.time}
                    onChange={(e) => setSession(prev => ({ ...prev, time: e.target.value }))}
                    required
                  />
                  <Clock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="30"
                  max="180"
                  value={session.duration}
                  onChange={(e) => setSession(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxParticipants">Maximum Participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  min="1"
                  max="20"
                  value={session.maxParticipants}
                  onChange={(e) => setSession(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="credits">Credits Required</Label>
                <Input
                  id="credits"
                  type="number"
                  min="10"
                  max="100"
                  value={session.credits}
                  onChange={(e) => setSession(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Session
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
