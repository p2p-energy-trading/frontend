import React from "react";

/**
 * Footer component that displays a professional footer section.
 * Includes EnerchainX branding, copyright notice, developer credits,
 * and GitHub link for the developer.
 *
 * @component
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-12xl mx-auto px-5 py-5">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* EnerchainX logo */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary"
              >
                <path d="M13 3L4 14h6v7l9-11h-6V3z" />
              </svg>
              <span className="text-xl font-bold text-primary">EnerchainX</span>
            </div>
            <p className="text-base-content/70 text-sm">
              Peer-to-peer energy trading platform enabling prosumers to trade
              surplus energy using IoT, blockchain, and modern web technologies.
            </p>
          </div>

          {/* Platform info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base-content">Platform</h3>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>• Smart Meter Integration</li>
              <li>• Blockchain Technology</li>
              <li>• Real-time Energy Trading</li>
              <li>• Automated Settlements</li>
            </ul>
          </div>

          {/* Developer info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base-content">Developer</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/mnyasin26"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors group"
              >
                {/* GitHub icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="fill-current group-hover:fill-primary transition-colors"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-sm">mnyasin26</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-base-300 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-base-content/60">
            © {new Date().getFullYear()} EnerchainX. All rights reserved.
          </div>
          <div className="text-sm text-base-content/60">
            Built with React, NestJS & Blockchain Technology
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
