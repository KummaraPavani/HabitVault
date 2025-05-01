
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function UpcomingSessions() {
  const { user, updateUserCredits } = useAuth();
  const { toast } = useToast();
  
  const [sessions] = useState([
    {
      id: 1,
      title: "Advanced JavaScript Patterns",
      instructor: "Sarah Johnson",
      date: "2024-05-02",
      time: "10:00",
      duration: 90,
      spotsLeft: 3,
      credits: 20
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      instructor: "Michael Chen",
      date: "2024-05-04",
      time: "15:00",
      duration: 60,
      spotsLeft: 5,
      credits: 15
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      instructor: "Dr. Alex Kumar",
      date: "2024-05-06",
      time: "13:00",
      duration: 120,
      spotsLeft: 4,
      credits: 25
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      instructor: "Emma Wilson",
      date: "2024-05-08",
      time: "11:00",
      duration: 75,
      spotsLeft: 6,
      credits: 18
    },
    {
      id: 5,
      title: "Data Science with Python",
      instructor: "James Miller",
      date: "2024-05-10",
      time: "14:00",
      duration: 90,
      spotsLeft: 3,
      credits: 22
    }
  ]);

  const handleJoinSession = (session) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please log in to join sessions"
      });
      return;
    }

    if (user.credits < session.credits) {
      toast({
        variant: "destructive",
        title: "Insufficient Credits",
        description: `You need ${session.credits} credits to join this session.`
      });
      return;
    }

    // Update user's credits
    const newCredits = user.credits - session.credits;
    updateUserCredits(newCredits);

    toast({
      title: "Session Joined",
      description: `You have successfully joined ${session.title}. ${session.credits} credits have been deducted.`
    });
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <motion.div
          key={session.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
              <p className="text-gray-600 mb-1">Instructor: {session.instructor}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(session.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {session.time} ({session.duration} min)
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {session.spotsLeft} spots left
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-primary font-semibold">{session.credits} credits</span>
              </div>
            </div>

            <Button
              onClick={() => handleJoinSession(session)}
              disabled={!user || user.credits < session.credits}
            >
              Join Session
            </Button>
          </div>
        </motion.div>
      ))}

      {sessions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No upcoming sessions found. Browse available sessions to join one!
        </div>
      )}
    </div>
  );
}
