import { useState } from "react";
import { Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { 
  FaLaptopCode, 
  FaServer, 
  FaNetworkWired, 
  FaTools,
  FaUsersCog
} from "react-icons/fa";

const experienceData = [
  {
    title: "School IT Officer",
    company: "Brisbane Catholic Education (Clairvaux Mackillop College)",
    date: "July 2024 – Current",
    responsibilities: [
      "Maintain open-source ticketing system front-end and back-end",
      "Created custom automation scripts to improve workflow efficiency",
      "Administered and maintained the school's computer network and server infrastructure, ensuring seamless daily operations",
      "Provided hands-on technical support to students and staff, diagnosing and resolving hardware and software issues efficiently",
      "Planned, deployed, and configured IT hardware and software to support operational goals",
      "Managed user accounts and system access controls to align with organizational policies"
    ],
    icons: [FaServer, FaNetworkWired, FaTools],
    color: "text-green-400",
    highlights: "Created automation scripts to streamline IT operations"
  },
  {
    title: "EUC Support Engineer",
    company: "NRI (1ICT)",
    date: "Nov 2023 – July 2024",
    responsibilities: [
      "Configured OS images for end-user devices and managed device lifecycles",
      "Utilized Cisco Meraki, Marvel, and Intune for device deployment and asset tracking",
      "Performed troubleshooting and diagnostics"
    ],
    icons: [FaLaptopCode, FaUsersCog],
    color: "text-blue-400"
  }
];

const Experience = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            {experienceData.map((exp, index) => (
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
            {experienceData.map((exp, index) => (
              <div 
                key={index}
                className="bg-gray-700 p-6 rounded-lg"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-xl">{exp.title}</h3>
                    <p className="text-purple-400">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 whitespace-nowrap">{exp.date}</span>
                </div>
                
                <div className="flex gap-3 mb-4">
                  {exp.icons.map((Icon, iconIndex) => (
                    <Icon key={iconIndex} className={`w-6 h-6 ${exp.color}`} />
                  ))}
                </div>
                
                <ul className="space-y-2">
                  {exp.responsibilities.map((responsibility, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span className="text-gray-300">{responsibility}</span>
                    </li>
                  ))}
                </ul>
                
                {exp.highlights && (
                  <div className="mt-4 text-purple-400 italic">
                    {exp.highlights}
                  </div>
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