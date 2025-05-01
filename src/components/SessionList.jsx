
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function SessionList() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userSessions, setUserSessions] = useState([]);

  useEffect(() => {
    // Load user's sessions from localStorage
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    const userSessions = sessions.filter(session => session.teacherId === user?.id);
    setUserSessions(userSessions);
  }, [user]);

  const handleEdit = (sessionId) => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    const sessionToEdit = sessions.find(s => s.id === sessionId);
    
    if (sessionToEdit) {
      // Update session logic here
      toast({
        title: "Session Updated",
        description: "Your session has been updated successfully.",
      });
    }
  };

  const handleCancel = (sessionId) => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem('sessions', JSON.stringify(updatedSessions));
    
    setUserSessions(prev => prev.filter(s => s.id !== sessionId));
    toast({
      title: "Session Cancelled",
      description: "The session has been cancelled successfully.",
    });
  };

  return (
    <div className="space-y-4">
      {userSessions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You haven't created any sessions yet. Click "Offer New Session" to get started!
        </div>
      ) : (
        userSessions.map((session) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                <p className="text-gray-600 mb-4">{session.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
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
                    {session.participants?.length || 0}/{session.maxParticipants}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(session.id)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleCancel(session.id)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
