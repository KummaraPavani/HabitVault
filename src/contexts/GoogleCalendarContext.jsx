
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const GoogleCalendarContext = createContext({});

export function useGoogleCalendar() {
  return useContext(GoogleCalendarContext);
}

export default function GoogleCalendarProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const initializeGapi = async () => {
      try {
        await window.gapi.client.init({
          apiKey: "YOUR_API_KEY",
          clientId: "YOUR_CLIENT_ID",
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: "https://www.googleapis.com/auth/calendar.events",
        });

        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        setIsInitialized(true);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to initialize Google Calendar",
        });
      }
    };

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load("client:auth2", initializeGapi);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [toast]);

  const updateSigninStatus = (isSignedIn) => {
    setIsSignedIn(isSignedIn);
  };

  const signIn = async () => {
    try {
      await window.gapi.auth2.getAuthInstance().signIn();
      toast({
        title: "Success",
        description: "Successfully signed in to Google Calendar",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in to Google Calendar",
      });
    }
  };

  const signOut = async () => {
    try {
      await window.gapi.auth2.getAuthInstance().signOut();
      toast({
        title: "Success",
        description: "Successfully signed out from Google Calendar",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out from Google Calendar",
      });
    }
  };

  const addEventToCalendar = async (task) => {
    if (!isSignedIn) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to Google Calendar first",
      });
      return;
    }

    try {
      const event = {
        summary: task.title,
        description: task.description,
        start: {
          date: task.dueDate,
        },
        end: {
          date: task.dueDate,
        },
      };

      await window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      toast({
        title: "Success",
        description: "Task added to Google Calendar",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add task to Google Calendar",
      });
    }
  };

  const value = {
    isInitialized,
    isSignedIn,
    signIn,
    signOut,
    addEventToCalendar,
  };

  return (
    <GoogleCalendarContext.Provider value={value}>
      {children}
    </GoogleCalendarContext.Provider>
  );
}
