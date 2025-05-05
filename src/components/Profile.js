import React from "react";
import { Twitter, Linkedin, Mail, Presentation } from "lucide-react";
import profilePic from "../assets/profile-pic.jpeg";

function Profile({ onShowProjects }) {
  return (
    <div className="profile-section">
      <div className="profile-header">
        <img
          src={profilePic}
          alt="george salapa"
          className="profile-pic"
        />
        <div className="profile-info">
          <h1>george salapa</h1>
          <div className="skills">
            <ul className="skills-list">
              <li className="skill-tag">python</li>
              <li className="skill-tag">react</li>
              <li className="skill-tag">LLM</li>
              <li className="skill-tag">RAG</li>
              <li className="skill-tag">agentic AI</li>
              <li className="skill-tag">react native</li>
              <li className="skill-tag">AWS</li>
              <li className="skill-tag">iOS</li>
            </ul>
          </div>
          <div className="social-links-container">
            <div className="social-links">
              <a href="https://twitter.com/jurajsalapa" className="social-link">
                <Twitter strokeWidth={1} className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/george-salapa/" className="social-link">
                <Linkedin strokeWidth={1} className="social-icon" />
              </a>
              <a href="mailto:george@salapa.xyz" className="social-link">
                <Mail strokeWidth={1} className="social-icon" />
              </a>
              <button onClick={onShowProjects} className="social-link">
                <Presentation strokeWidth={1} className="social-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;