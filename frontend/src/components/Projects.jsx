import { useState, useEffect } from "react";
import { FolderGit2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { getProjects } from "@/services/api";
import { getIcon } from "@/utils/iconMapping";

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        console.log('Projects response:', response); // Debug log
        setProjects(response.data || []);
      } catch (err) {
        console.error('Error fetching projects:', err); // Debug log
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            {projects.slice(0, 3).map((project, index) => (
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
          <h2 className="text-3xl font-bold">Projects</h2>
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                
                {project.tech_stack && (
                  <div className="flex gap-3 mb-4">
                    {(typeof project.tech_stack === "string" 
                      ? project.tech_stack.split(',') // If it's a string, split it
                      : project.tech_stack // If it's already an array, use it as is
                    ).map((tech, iconIndex) => {
                      const IconComponent = getIcon(tech.trim().toLowerCase());
                      return IconComponent ? (
                        <IconComponent 
                          key={iconIndex} 
                          className={`w-6 h-6 ${project.color || 'text-blue-400'}`} 
                        />
                      ) : null;
                    })}
                  </div>
                )}

                
                {project.description && (
                  <ul className="space-y-2">
                    {project.description.split('|').map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">▹</span>
                        <span className="text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {project.github_url && (
                  <a 
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Projects;