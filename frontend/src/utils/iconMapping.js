import { 
    FaReact, 
    FaNode, 
    FaPython, 
    FaDatabase, 
    FaGitAlt, 
    FaAws, 
    FaDocker, 
    FaJs,
    FaCode,
    FaServer,
    FaFlask
  } from "react-icons/fa";
  
  import {
    SiDotnet,
    SiPostgresql,
    SiMongodb
  } from "react-icons/si";

  import { PiFileCSharpFill } from "react-icons/pi";
  
  export const iconMap = {
    // Programming Languages
    'react': FaReact,
    'node': FaNode,
    'python': FaPython,
    'database': FaDatabase,
    'git': FaGitAlt,
    'aws': FaAws,
    'docker': FaDocker,
    'javascript': FaJs,
    'code': FaCode,
    'server': FaServer,
    'flask': FaFlask,
    'csharp': PiFileCSharpFill,
    'dotnet': SiDotnet,
    'postgresql': SiPostgresql,
    'mongodb': SiMongodb
  };
  
  export const getIcon = (iconName) => {
    return iconMap[iconName.toLowerCase()] || FaCode; // Default to FaCode if icon not found
  };