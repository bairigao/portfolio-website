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
    FaFlask,
    FaBrain,
    FaRobot,
    FaCog,
    FaTools,
    FaMicrochip,
    FaJava,
    FaMap,
    FaCloud
  } from "react-icons/fa";
  
  import {
    SiDotnet,
    SiPostgresql,
    SiMongodb,
    SiTensorflow,
    SiPytorch,
    SiAmazondynamodb,
    SiTerraform,
    SiDjango,
    SiLeaflet,
    SiGithubactions,
    SiOpenai,
    SiMysql
  } from "react-icons/si";

  import { PiFileCSharpFill } from "react-icons/pi";
  
  export const iconMap = {
    // Programming Languages
    'react': FaReact,
    'node': FaNode,
    'python': FaPython,
    'javascript': FaJs,
    'java': FaJava,
    'code': FaCode,
    'flask': FaFlask,
    
    // C# variants
    'csharp': PiFileCSharpFill,
    'c#': PiFileCSharpFill,
    'dotnet': SiDotnet,
    
    // Cloud Platforms
    'aws': FaAws,
    'azure': FaCloud,
    'docker': FaDocker,
    'server': FaServer,
    
    // Databases
    'database': FaDatabase,
    'postgresql': SiPostgresql,
    'postgis': FaDatabase,
    'mongodb': SiMongodb,
    'dynamodb': SiAmazondynamodb,
    'sql': SiMysql,
    'mysql': SiMysql,
    
    // Frameworks
    'django': SiDjango,
    'leaflet': SiLeaflet,
    
    // AI & Machine Learning
    'ai': FaBrain,
    'machine-learning': FaRobot,
    'machinelearning': FaRobot,
    'ml': FaRobot,
    'tensorflow': SiTensorflow,
    'pytorch': SiPytorch,
    'openai': SiOpenai,
    
    // DevOps & Automation
    'automation': FaCog,
    'devops': FaTools,
    'cicd': FaMicrochip,
    'ci/cd': FaMicrochip,
    'terraform': SiTerraform,
    'github-actions': SiGithubactions,
    'githubactions': SiGithubactions,
    
    // Version Control
    'git': FaGitAlt,
    
    // Maps
    'map': FaMap,
    'maps': FaMap
  };
  
  export const getIcon = (iconName) => {
    return iconMap[iconName.toLowerCase()] || FaCode; // Default to FaCode if icon not found
  };