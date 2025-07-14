import React, { useState } from "react";
import { useNavigate } from "react-router";
import { apiPost } from "../../utils/api";

const SmartMeterSetup = () => {
  const [formData, setFormData] = useState({
    meterId: "",
    location: "",
    deviceModel: "",
    deviceVersion: "",
    meterBlockchainAddress: "",
    capabilities: {
      battery: false,
      solar: false,
      motor: false,
      pwm: false,
      relay: false,
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleCapabilityChange = (capability) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: {
        ...prev.capabilities,
        [capability]: !prev.capabilities[capability],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.meterId || !formData.location) {
      setError("Meter ID and Location are required");
      setLoading(false);
      return;
    }

    try {
      const response = await apiPost("/smart-meters/create", {
        meterId: formData.meterId,
        location: formData.location,
        deviceModel: formData.deviceModel || "Generic Smart Meter",
        deviceVersion: formData.deviceVersion || "1.0.0",
        meterBlockchainAddress: formData.meterBlockchainAddress || undefined,
        capabilities: formData.capabilities,
      });

      const data = await response.json();
      if (data.success) {
        // Navigate to dashboard after successful setup
        navigate("/dashboard-user");
      } else {
        setError(data.message || "Failed to create smart meter");
      }
    } catch (error) {
      console.error("Smart meter setup error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create smart meter. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // For now, allow skipping - in production you might want to require this
    navigate("/dashboard-user");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">EnerchainX</h1>
            <p className="text-base-content/70 mt-2">Smart Meter Setup</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Connect Your Smart Meter
            </h2>
            <p className="text-base-content/70">
              To start trading energy, you need to connect your IoT smart meter
              device. This will enable real-time monitoring and automated energy
              settlements.
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Required Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Meter ID <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="meterId"
                  value={formData.meterId}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="e.g., METER_001"
                  required
                  disabled={loading}
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Unique identifier for your smart meter
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Location <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="e.g., Home Solar Panel"
                  required
                  disabled={loading}
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Where is your smart meter installed?
                  </span>
                </label>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Device Model</span>
                </label>
                <input
                  type="text"
                  name="deviceModel"
                  value={formData.deviceModel}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Generic Smart Meter"
                  disabled={loading}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Device Version</span>
                </label>
                <input
                  type="text"
                  name="deviceVersion"
                  value={formData.deviceVersion}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="1.0.0"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Blockchain Address (Optional)
                </span>
              </label>
              <input
                type="text"
                name="meterBlockchainAddress"
                value={formData.meterBlockchainAddress}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="0x..."
                disabled={loading}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Ethereum address for this meter (optional)
                </span>
              </label>
            </div>

            {/* Device Capabilities */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Device Capabilities
                </span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(formData.capabilities).map(
                  ([capability, enabled]) => (
                    <label key={capability} className="cursor-pointer label">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => handleCapabilityChange(capability)}
                        className="checkbox checkbox-primary"
                        disabled={loading}
                      />
                      <span className="label-text ml-2 capitalize">
                        {capability}
                      </span>
                    </label>
                  )
                )}
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Select the features your smart meter supports
                </span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleSkip}
                className="btn btn-outline"
                disabled={loading}
              >
                Skip for Now
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Create Smart Meter"
                )}
              </button>
            </div>
          </form>

          {/* Info Section */}
          <div className="mt-6 p-4 bg-info/10 rounded-lg">
            <h3 className="font-medium text-info mb-2">
              📋 Setup Instructions
            </h3>
            <ul className="text-sm text-base-content/70 space-y-1">
              <li>
                • Install your IoT smart meter device in your electrical panel
              </li>
              <li>• Connect to WiFi and configure MQTT settings</li>
              <li>• Enter the Meter ID exactly as configured on your device</li>
              <li>• Select capabilities based on your hardware setup</li>
              <li>
                • The system will automatically start monitoring your energy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartMeterSetup;
