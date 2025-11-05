import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { 
  FaUser, 
  FaGithub, 
  FaLinkedin,
  FaGraduationCap,
  FaCode,
  FaAward,
  FaEnvelope,
  FaShareAlt
} from "react-icons/fa";

const aboutData = {
  education: {
    degree: "Computer Science",
    school: "Queensland University of Technology",
    gpa: "6.7/7",
    graduation: "2025"
  },
  highlights: [
    "Full-stack development experience with Python, C#, and SQL",
    "AWS certified with hands-on cloud migration experience",
    "Strong background in cloud architecture and IT infrastructure",
    "Experience in building secure and scalable web applications"
  ],
  skills: [
    "Cloud: AWS (EC2, S3, IAM), Azure (App Services, Virtual Machines, Docker)",
    "Backend: Python (Flask), C#, SQL, Django",
    "Frontend: React, HTML/CSS, Bootstrap",
    "Tools: Git, Docker, Agile methodologies, GitHub Actions, CI/CD Pipelines, IaC"
  ]
};

const socialLinks = {
  github: "https://github.com/bairigao",
  linkedin: "https://www.linkedin.com/in/si-li-395a49267/",
  email: "lis09296313@gmail.com"
};

const QuickLinks = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleEmailClick = () => {
    window.location.href = `mailto:${socialLinks.email}?subject=Getting%20in%20touch&body=Hi%20Si%20Li,%0D%0A%0D%0A`;
  };

  return (
    <>
      <div className="flex justify-center space-x-4">
        <Card 
          className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer w-40"
          onClick={() => setIsAboutModalOpen(true)}
        >
          <CardContent className="p-4 flex items-center justify-center space-x-2">
            <FaUser className="text-green-400" />
            <span>About Me</span>
          </CardContent>
        </Card>

        <Card 
          className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer w-40"
          onClick={() => setIsSocialModalOpen(true)}
        >
          <CardContent className="p-4 flex items-center justify-center space-x-2">
            <FaShareAlt className="text-purple-400" />
            <span>Connect</span>
          </CardContent>
        </Card>

        <Card 
          className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer w-40"
          onClick={() => setIsContactModalOpen(true)}
        >
          <CardContent className="p-4 flex items-center justify-center space-x-2">
            <FaEnvelope className="text-blue-400" />
            <span>Contact</span>
          </CardContent>
        </Card>
      </div>
      {/* About me Modal */}
      <Modal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)}>
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Si Li</h2>
            <p className="text-green-400">Graduate Software Developer</p>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <FaGraduationCap className="text-green-400 w-6 h-6" />
              <h3 className="text-xl font-bold">Education</h3>
            </div>
            <div className="ml-8 space-y-2">
              <p className="text-lg font-semibold">{aboutData.education.degree}</p>
              <p>{aboutData.education.school}</p>
              <p className="text-green-400">GPA: {aboutData.education.gpa}</p>
            </div>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <FaAward className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-bold">Key Highlights</h3>
            </div>
            <ul className="ml-8 space-y-2">
              {aboutData.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-purple-400">▹</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <FaCode className="text-blue-400 w-6 h-6" />
              <h3 className="text-xl font-bold">Technical Skills</h3>
            </div>
            <ul className="ml-8 space-y-2">
              {aboutData.skills.map((skill, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-400">▹</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-300 text-center italic">
            "Passionate about building scalable solutions and continuous learning in software development."
          </p>
        </div>
      </Modal>
      
      {/* Social Links Modal */}
      <Modal isOpen={isSocialModalOpen} onClose={() => setIsSocialModalOpen(false)}>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8">Let's Connect</h2>
          
          <div className="grid gap-4">
            <a 
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FaGithub className="w-8 h-8 text-white mr-4" />
              <div>
                <h3 className="font-bold">GitHub</h3>
                <p className="text-sm text-gray-300">Check out my projects and contributions</p>
              </div>
            </a>

            <a 
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FaLinkedin className="w-8 h-8 text-[#0077b5] mr-4" />
              <div>
                <h3 className="font-bold">LinkedIn</h3>
                <p className="text-sm text-gray-300">Connect with me professionally</p>
              </div>
            </a>
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <p className="text-center mb-6">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={handleEmailClick}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <FaEnvelope />
                <span>Send Email</span>
              </button>
            </div>

            <p className="text-center mt-6 text-gray-400">
              Or email me directly at: {socialLinks.email}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuickLinks;