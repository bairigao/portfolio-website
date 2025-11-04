import { useState } from "react";
import { Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { getIcon } from "@/utils/iconMapping";
import skillsData from "@/data/skills.json";

const Skills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skills = skillsData;

  return (
    <>
      <Card 
        className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full"
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-6">
          <Code className="w-12 h-12 mb-4 text-green-400" />
          <h2 className="text-2xl font-bold mb-4">Skills & Technologies</h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.slice(0, 4).map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-green-400">▹</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon_name ? getIcon(skill.icon_name) : null;
              return (
                <div 
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg flex items-start space-x-4"
                >
                  {IconComponent && (
                    <IconComponent className="w-8 h-8 text-green-400 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="font-bold text-xl">{skill.name}</h3>
                    {skill.level && (
                      <span className="text-sm text-green-400">{skill.level}</span>
                    )}
                    {skill.description && (
                      <p className="text-gray-300 mt-2">{skill.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Skills;