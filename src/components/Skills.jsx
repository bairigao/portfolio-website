import { useState } from "react";
import { Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import {
  FaReact, FaNode, FaPython, FaDatabase, 
  FaGitAlt, FaAws, FaDocker, FaJs
} from "react-icons/fa";

const skillsData = [
  { name: "JavaScript", icon: FaJs, level: "Advanced", 
    description: "Modern ES6+, TypeScript, Async Programming" },
  { name: "React", icon: FaReact, level: "Advanced", 
    description: "Redux, Hooks, Context API, Next.js" },
  { name: "Node.js", icon: FaNode, level: "Intermediate", 
    description: "Express, REST APIs, Authentication" },
  { name: "Python", icon: FaPython, level: "Intermediate", 
    description: "Django, Data Analysis, Automation" },
  { name: "SQL", icon: FaDatabase, level: "Advanced", 
    description: "PostgreSQL, MySQL, Database Design" },
  { name: "Git", icon: FaGitAlt, level: "Advanced", 
    description: "Version Control, Collaboration, CI/CD" },
  { name: "AWS", icon: FaAws, level: "Intermediate", 
    description: "EC2, S3, Lambda, CloudFormation" },
  { name: "Docker", icon: FaDocker, level: "Intermediate", 
    description: "Containerization, Docker Compose" }
];

const Skills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card 
        className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-6">
          <Code className="w-12 h-12 mb-4 text-green-400" />
          <h2 className="text-2xl font-bold mb-4">Skills & Technologies</h2>
          <div className="grid grid-cols-2 gap-2">
            {skillsData.slice(0, 6).map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-green-400">▹</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-3xl font-bold mb-6">Skills & Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div 
                key={index}
                className="bg-gray-700 p-4 rounded-lg flex items-start space-x-4"
              >
                <IconComponent className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl">{skill.name}</h3>
                  <span className="text-sm text-green-400">{skill.level}</span>
                  <p className="text-gray-300 mt-2">{skill.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default Skills; 