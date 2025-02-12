import { useState } from "react";
import { FolderGit2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { FaPython, FaAws, FaGithub, FaDatabase, FaCode } from "react-icons/fa";
import { SiDotnet, SiFlask } from "react-icons/si";
import { PiFileCSharpFill } from "react-icons/pi"; 

const projectsData = [
  {
    title: "Event Management Web Application",
    date: "July 2024 – Nov 2024",
    techStack: "Python, Flask, SQLAlchemy, HTML/CSS, Bootstrap, GitHub",
    description: [
      "Developed a full-stack event management web app where users can register, browse, and book tickets for events.",
      "Designed and implemented a relational database using SQLAlchemy for handling users, events, and bookings.",
      "Integrated authentication (Flask-Login, bcrypt) to ensure secure user access.",
      "Collaborated in a team, using GitHub for version control and structured task management."
    ],
    icons: [FaPython, SiFlask, FaDatabase, FaGithub],
    color: "text-blue-400"
  },
  {
    title: "Hospital Management System",
    date: "Aug 2024 – Nov 2024",
    techStack: "C#, .NET, Object-Oriented Programming (OOP)",
    description: [
      "Developed a modular hospital management system for tracking patients, surgeons, and floor managers.",
      "Implemented a text-based interface while following scalable design principles for future UI expansion.",
      "Applied OOP concepts to ensure maintainability and reusability of code."
    ],
    icons: [PiFileCSharpFill, SiDotnet, FaCode],
    color: "text-purple-400"
  },
  {
    title: "Cloud Migration Project",
    date: "Feb 2024 – Jun 2024",
    techStack: "AWS EC2, S3, IAM, Python",
    description: [
      "Migrated on-premises systems to AWS, configuring cloud infrastructure for domain controllers, databases, and file storage.",
      "Automated tasks using Python scripts and monitored network traffic for performance optimization."
    ],
    icons: [FaAws, FaPython],
    color: "text-yellow-400"
  }
];

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card 
        className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full"
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-6">
          <FolderGit2 className="w-12 h-12 mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-2">
            {projectsData.slice(0, 3).map((project, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-blue-400">▹</span>
                <span>{project.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          
          <div className="space-y-8">
            {projectsData.map((project, index) => (
              <div 
                key={index}
                className="bg-gray-700 p-6 rounded-lg"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                  <h3 className="font-bold text-xl">{project.title}</h3>
                  <span className="text-sm text-gray-400">{project.date}</span>
                </div>
                
                <div className="flex gap-3 mb-4">
                  {project.icons.map((Icon, iconIndex) => (
                    <Icon key={iconIndex} className={`w-6 h-6 ${project.color}`} />
                  ))}
                </div>
                
                <div className="text-sm text-blue-400 mb-4">
                  🛠 {project.techStack}
                </div>
                
                <ul className="space-y-2">
                  {project.description.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">▹</span>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Projects;