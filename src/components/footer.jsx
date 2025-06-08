import React from "react";
import { Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/20">
      <div className="container mx-auto px-2 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/80 text-sm">
            <p>Powered by OpenWeatherMap API</p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/capsule11"
              target="_blank"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://openweathermap.org"
              target="_blank"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              <span>API Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
