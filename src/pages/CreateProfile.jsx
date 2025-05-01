
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const SKILLS = [
  "Web Development", "Mobile Development", "Data Science",
  "UI/UX Design", "Digital Marketing", "Business Strategy",
  "Language Learning", "Mathematics", "Physics",
  "Music", "Photography", "Writing"
];

export default function CreateProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skillsToTeach: [],
    skillsToLearn: [],
    courseCategory: "technology"
  });

  const handleSkillToggle = (skill, type) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(skill)
        ? prev[type].filter(s => s !== skill)
        : [...prev[type], skill]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data to localStorage for now
    localStorage.setItem('userProfile', JSON.stringify(formData));
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Create Your Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="How you'll be known in the community"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 border rounded-md h-32"
                  required
                />
              </div>

              <div>
                <Label>Skills You Can Teach</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {SKILLS.map(skill => (
                    <div
                      key={`teach-${skill}`}
                      onClick={() => handleSkillToggle(skill, 'skillsToTeach')}
                      className={`p-2 rounded-md cursor-pointer text-sm ${
                        formData.skillsToTeach.includes(skill)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Skills You Want to Learn</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {SKILLS.map(skill => (
                    <div
                      key={`learn-${skill}`}
                      onClick={() => handleSkillToggle(skill, 'skillsToLearn')}
                      className={`p-2 rounded-md cursor-pointer text-sm ${
                        formData.skillsToLearn.includes(skill)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="courseCategory">Preferred Course Category</Label>
                <select
                  id="courseCategory"
                  value={formData.courseCategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseCategory: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="technology">Technology</option>
                  <option value="business">Business</option>
                  <option value="arts">Arts</option>
                  <option value="languages">Languages</option>
                  <option value="science">Science</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Skip for Now
              </Button>
              <Button type="submit">
                Create Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
