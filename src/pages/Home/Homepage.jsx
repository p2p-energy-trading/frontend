import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

// Homepage component renders the comprehensive landing page
const Homepage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard-user");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-none px-6 lg:px-12">
          <div className="lg:w-1/2">
            <img
              src="hero-section.svg"
              className="w-full"
              alt="EnerchainX Smart Energy Grid"
            />
          </div>
          <div className="lg:w-1/2 lg:pr-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6">
              EnerchainX
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Revolutionary P2P Energy Trading Platform
            </h2>
            <p className="text-lg text-base-content/80 mb-8 leading-relaxed">
              Transform how you trade energy with our cutting-edge peer-to-peer
              platform. Connect directly with energy producers and consumers,
              trade ETK tokens seamlessly, and participate in a sustainable
              energy ecosystem powered by blockchain technology and IoT smart
              meters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleGetStarted}
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
              </button>
              {!isAuthenticated && (
                <button
                  className="btn btn-outline btn-lg"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-base-100">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              How EnerchainX Works
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Our platform makes energy trading simple and accessible for
              everyone. Here's how you can start trading energy in just a few
              steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-success to-success/70 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Connect Smart Meter IoT Hub
                </h3>
                <div className="space-y-3 text-left">
                  <p className="text-base-content/80 font-medium">
                    Install our IoT smart meter device as your energy management
                    hub:
                  </p>
                  <ul className="text-sm text-base-content/70 space-y-2">
                    <li>
                      • <strong>Real-time monitoring:</strong> Solar panels,
                      battery storage, home load, and grid connection
                    </li>
                    <li>
                      • <strong>MQTT communication:</strong> Bi-directional data
                      every 5-30 seconds
                    </li>
                    <li>
                      • <strong>Remote control:</strong> Grid mode switching,
                      relay controls, motor management
                    </li>
                    <li>
                      • <strong>Health monitoring:</strong> Device heartbeat and
                      status tracking
                    </li>
                    <li>
                      • <strong>Settlement triggers:</strong> Automatic energy
                      calculation every 5 minutes
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-warning to-warning/70 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Automated Energy Settlement
                </h3>
                <div className="space-y-3 text-left">
                  <p className="text-base-content/80 font-medium">
                    Net energy automatically converted to ETK tokens:
                  </p>
                  <ul className="text-sm text-base-content/70 space-y-2">
                    <li>
                      • <strong>Settlement period:</strong> Every 5 minutes
                      automatic calculation
                    </li>
                    <li>
                      • <strong>Net energy formula:</strong> Export kWh - Import
                      kWh = Net kWh
                    </li>
                    <li>
                      • <strong>Token conversion:</strong> 1 kWh = 1 ETK
                      (EnergyConverter contract)
                    </li>
                    <li>
                      • <strong>Minimum threshold:</strong> 100Wh (0.1 kWh)
                      required for execution
                    </li>
                    <li>
                      • <strong>Blockchain settlement:</strong> ETK mint/burn
                      with transaction confirmation
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  P2P Trading Marketplace
                </h3>
                <div className="space-y-3 text-left">
                  <p className="text-base-content/80 font-medium">
                    Trade ETK tokens with other prosumers securely:
                  </p>
                  <ul className="text-sm text-base-content/70 space-y-2">
                    <li>
                      • <strong>Trading pairs:</strong> ETK/IDRS with real-time
                      order book
                    </li>
                    <li>
                      • <strong>Order types:</strong> BID (buy) and ASK (sell)
                      with price matching
                    </li>
                    <li>
                      • <strong>Whitelist-based escrow:</strong> Seamless
                      trading without manual token approvals
                    </li>
                    <li>
                      • <strong>Direct execution:</strong> Smart contracts
                      handle secure transfers automatically
                    </li>
                    <li>
                      • <strong>IDRS payments:</strong> Indonesian Rupiah
                      Stablecoin (1 IDR = 1 IDRS)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 bg-base-200">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Platform Architecture
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Built on three core technologies that work together to create a
              secure, scalable, and efficient energy trading ecosystem.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* IoT Layer */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">IoT Smart Meters</h3>
                </div>
                <img
                  src="smart-meter-arc.svg"
                  className="h-full p-4"
                  alt="IoT Smart Meter Architecture"
                />
                <ul className="space-y-2 text-base-content/70">
                  <li>• Real-time energy monitoring</li>
                  <li>• Bi-directional MQTT communication</li>
                  <li>• Remote device control</li>
                  <li>• Battery, solar, and grid management</li>
                  <li>• Automated settlement triggers</li>
                </ul>
              </div>
            </div>

            {/* Blockchain Layer */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Blockchain</h3>
                </div>
                <img
                  src="blockchain-arc.svg"
                  className="h-full p-4"
                  alt="Blockchain Architecture"
                />
                <ul className="space-y-2 text-base-content/70">
                  <li>• Private Ethereum network</li>
                  <li>• ETK & IDRS token contracts</li>
                  <li>• Smart contract automation</li>
                  <li>• Secure escrow system</li>
                  <li>• Transparent transaction logs</li>
                </ul>
              </div>
            </div>

            {/* Web Application Layer */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Web Platform</h3>
                </div>
                <img
                  src="web-platform-arc.svg"
                  className="h-full p-4"
                  alt="Web Application Interface"
                />
                <ul className="space-y-2 text-base-content/70">
                  <li>• ReactJS modern frontend</li>
                  <li>• NestJS robust backend</li>
                  <li>• Real-time data visualization</li>
                  <li>• Intuitive trading interface</li>
                  <li>• Mobile-responsive design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Impact Section */}
      <section className="py-20 bg-gradient-to-br from-success/10 to-info/10">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Platform Benefits & Impact
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              EnerchainX is more than just a trading platform—it's a catalyst
              for energy independence and environmental sustainability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Economic Benefits */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">
                  Economic Benefits
                </h3>
                <ul className="text-sm text-base-content/70 space-y-1">
                  <li>• Monetize excess energy</li>
                  <li>• Reduce electricity bills</li>
                  <li>• Fair market pricing</li>
                  <li>• New revenue streams</li>
                </ul>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-info/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-info"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">
                  Environmental Impact
                </h3>
                <ul className="text-sm text-base-content/70 space-y-1">
                  <li>• Promote renewable energy</li>
                  <li>• Reduce carbon footprint</li>
                  <li>• Optimize energy usage</li>
                  <li>• Support sustainability</li>
                </ul>
              </div>
            </div>

            {/* Technical Advantages */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-warning"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">
                  Technical Advantages
                </h3>
                <ul className="text-sm text-base-content/70 space-y-1">
                  <li>• Automated settlements</li>
                  <li>• Real-time monitoring</li>
                  <li>• Secure transactions</li>
                  <li>• Transparent records</li>
                </ul>
              </div>
            </div>

            {/* Social Impact */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-error"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Social Impact</h3>
                <ul className="text-sm text-base-content/70 space-y-1">
                  <li>• Energy democratization</li>
                  <li>• Community empowerment</li>
                  <li>• Grid decentralization</li>
                  <li>• Energy independence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="w-full px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Energy Future?
          </h2>
          <p className="text-xl text-primary-content/90 mb-8">
            Join thousands of prosumers who are already trading energy and
            earning from their renewable sources. Start your journey towards
            energy independence today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn btn-accent btn-lg"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? "Access Dashboard" : "Create Free Account"}
            </button>
            <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
