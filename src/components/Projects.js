import React, { useState } from "react";
import lunysChat from "../assets/lunys-agent.webp";
import vwAgent from "../assets/vw-agent.webp";
import trialsAgent from "../assets/trials-agent.webp";
import { ChevronUp, ChevronDown, ArrowLeft } from "lucide-react";

const projects = [
  { 
    title: "chatbot for Lunys brand",
    description: "corporate chatbot with access to client's databases, Snowflake, Azure resources and more. with innate ability to run its own code, analyze data, create charts, review documents and dataframes, this chatbot was designed as multi-agent multi-step system capable of solving complex tasks for the client's staff.",
    image: lunysChat
  },
  { 
    title: "document agent for VW group",
    description: "chatbot capable of synthesizing multiple documents into their sections and subsections, running a comparison analysis, interacting with users and providing feedback. this agent was designed to be used by the client's legal team to compare multiple documents and provide feedback on the differences. the engine synthesizes content into structured sections and subsections, creating navigable document maps. interactive UI with (among other) an @mention system that dynamically highlights relevant sections for user reference.",
    image: vwAgent
  },
  { 
    title: "clinical trials agent",
    description: "agentic chatbot with access to clinicaltrials.gov, euclinicaltrials.eu and PubMed. with a 'deep search' capability, the chatbot could research web for a long period of time. the system processes thousands of clinical trials simultaneously, correlating findings with research papers. the architecture's concurrent processing capability allows it to complete in minutes what would take hours manually. delivers results as interactive charts, executable notebooks, and comprehensive reports, making it an indispensable tool for evidence-based medical research.",
    image: trialsAgent
  }
];

function Projects({onBackClick}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };
  
  const currentProject = projects[currentIndex];
  
  return (
    <div className="projects-section">
      <button 
        onClick={onBackClick}
        className="back-button social-link"
      >
        <ArrowLeft strokeWidth={1} size={20} />
      </button>

      
      <div className="project-container">
        <button 
          onClick={prevProject}
          className="social-link nav-button nav-button-up">
          <ChevronUp strokeWidth={1} size={24} />
        </button>
        
        <div className="project-content">
          <div className="project-text">
            <h2 className="project-title">{currentProject.title}</h2>
            <p className="project-description">{currentProject.description}</p>
          </div>
          
          <div className="project-image">
            <img
              src={currentProject.image}
              className="project-image-content"
              alt={currentProject.title}
            />
          </div>
        </div>
        
        <button 
          onClick={nextProject}
          className="social-link nav-button nav-button-down">
          <ChevronDown strokeWidth={1} size={20} />
        </button>
      </div>
    </div>
  );
}

export default Projects;