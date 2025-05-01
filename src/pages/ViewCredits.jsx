
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, Gift, ArrowRight } from "lucide-react";

export default function ViewCredits() {
  const navigate = useNavigate();
  // Mock credit data - in a real app, this would come from your backend
  const credits = {
    earned: 150,
    spent: 50,
    available: 100
  };

  const redeemableItems = [
    {
      title: "1-hour Private Session",
      credits: 50,
      description: "Book a private learning session with any instructor"
    },
    {
      title: "Course Bundle",
      credits: 100,
      description: "Access to 5 premium recorded sessions"
    },
    {
      title: "Expert Consultation",
      credits: 150,
      description: "30-minute consultation with an industry expert"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Your Credits</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-lg font-semibold mb-1">Earned Credits</h3>
              <p className="text-3xl font-bold text-primary">{credits.earned}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <Gift className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="text-lg font-semibold mb-1">Available Credits</h3>
              <p className="text-3xl font-bold text-green-600">{credits.available}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <ArrowRight className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <h3 className="text-lg font-semibold mb-1">Spent Credits</h3>
              <p className="text-3xl font-bold text-gray-600">{credits.spent}</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-6">Redeem Your Credits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {redeemableItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white border rounded-lg p-6 shadow-sm"
              >
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">{item.credits} credits</span>
                  <Button
                    variant="outline"
                    disabled={credits.available < item.credits}
                  >
                    Redeem
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => navigate('/offer-session')}
              className="mx-auto"
            >
              Earn More Credits
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
