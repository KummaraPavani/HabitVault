
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Clock } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-primary">EduPair</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl font-extrabold text-gray-900 mb-8">
                Create a decentralized learning ecosystem
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Join a community of learners and educators. Share knowledge, earn credits, and grow together.
              </p>
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Process Steps */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Create Profile",
                  description: "Join the community",
                },
                {
                  icon: <BookOpen className="h-8 w-8" />,
                  title: "Offer Sessions",
                  description: "Share your expertise",
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: "Earn Credits",
                  description: "Get rewarded",
                },
                {
                  icon: <Clock className="h-8 w-8" />,
                  title: "Redeem Credits",
                  description: "Learn from others",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">Why EduPair?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Skill-based Learning",
                  description: "Learn practical skills from experienced practitioners",
                },
                {
                  title: "Community Growth",
                  description: "Be part of a supportive learning community",
                },
                {
                  title: "Free Contribution Model",
                  description: "Share knowledge and earn while learning",
                },
                {
                  title: "Flexibility & Inclusion",
                  description: "Learn at your own pace, from anywhere",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-gray-50 rounded-xl"
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">© 2024 EduPair. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
