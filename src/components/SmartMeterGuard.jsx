import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSmartMeterStatus } from "../hooks/useSmartMeterStatus";

const SmartMeterGuard = ({ children }) => {
  const { hasSmartMeter, loading, error } = useSmartMeterStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !hasSmartMeter && !error) {
      // Redirect to smart meter setup if user doesn't have a smart meter
      navigate("/smart-meter-setup");
    }
  }, [hasSmartMeter, loading, error, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-base-content/70">Checking smart meter status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error max-w-md">
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
      </div>
    );
  }

  if (!hasSmartMeter) {
    // This shouldn't happen due to useEffect redirect, but just in case
    return null;
  }

  return children;
};

export default SmartMeterGuard;
