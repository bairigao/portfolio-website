import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaProjectDiagram, FaTools, FaBriefcase, FaSignOutAlt, FaHome } from "react-icons/fa";
import ProjectForm from "../components/admin/ProjectForm";
import SkillForm from "../components/admin/SkillForm";
import ExperienceForm from "../components/admin/ExperienceForm";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleBacktoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">  {/* Modified this div */}
            <button
              onClick={handleBacktoHome}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              <FaHome />
              <span>Back to Home</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded transition ${
              activeTab === "projects" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            <FaProjectDiagram />
            <span>Projects</span>
          </button>
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded transition ${
              activeTab === "skills" ? "bg-green-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            <FaTools />
            <span>Skills</span>
          </button>
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded transition ${
              activeTab === "experience" ? "bg-purple-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("experience")}
          >
            <FaBriefcase />
            <span>Experience</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-lg p-6">
          {activeTab === "projects" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
              <ProjectForm />
            </div>
          )}
          
          {activeTab === "skills" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Manage Skills</h2>
              <SkillForm />
            </div>
          )}
          
          {activeTab === "experience" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Manage Experience</h2>
              <ExperienceForm />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-8 py-4">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p>Portfolio Admin Panel © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;