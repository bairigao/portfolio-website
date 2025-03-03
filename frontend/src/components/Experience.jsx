import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { getExperience } from "@/services/api";
const Experience = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await getExperience();
        setExperiences(response.data);
      } catch (err) {
        setError("Failed to fetch experience data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Card
        className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full"
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-6">
          <Terminal className="w-12 h-12 mb-4 text-purple-400" />
          <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
          <div className="grid grid-cols-1 gap-2">
            {experiences.map((exp, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-purple-400">▹</span>
                <span>{exp.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Work Experience</h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-xl">{exp.title}</h3>
                    <p className="text-purple-400">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 whitespace-nowrap">{exp.date}</span>
                </div>

                <ul className="space-y-2">
                  {exp.description.split("|").map((description, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span className="text-gray-300">{description}</span>
                    </li>
                  ))}
                </ul>

                {exp.highlights && (
                  <div className="mt-4 text-purple-400 italic">{exp.highlights}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Experience;
