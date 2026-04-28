const BatteryCard = ({ batteryStatus, batteryRate, batteryPercent }) => {
  // Determine battery bar color based on percentage
  const getBatteryColor = () => {
    const percent = batteryPercent || 0;
    if (percent >= 80) return "bg-success";
    if (percent >= 50) return "bg-warning";
    if (percent >= 20) return "bg-orange-500";
    return "bg-error";
  };

  // Determine icon color based on status
  const getIconColor = () => {
    if (batteryStatus === "Charging") return "text-success";
    if (batteryStatus === "Discharging") return "text-error";
    return "text-base-content";
  };

  return (
    <div className="card border-2 border-base-300 rounded-xl p-6 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-2">
        <svg
          className={`w-6 h-6 ${getIconColor()}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <rect
            x="2"
            y="7"
            width="18"
            height="10"
            rx="3"
            strokeWidth={2}
            stroke="currentColor"
          />
          <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor" />
        </svg>
        <span className="font-semibold">Battery Storage</span>
      </div>

      {/* Battery Status and Rate */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <span
            className={`text-lg font-bold ${
              batteryStatus === "Charging"
                ? "text-success"
                : batteryStatus === "Discharging"
                ? "text-error"
                : "text-base-content/60"
            }`}
          >
            {batteryStatus}
          </span>
        </div>
        {batteryStatus !== "Idle" &&
          batteryRate !== undefined &&
          !isNaN(batteryRate) &&
          batteryRate !== 0 && (
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Rate:</span>
              <span className="text-lg font-bold font-mono">
                {batteryRate.toFixed(2)}%/hr
              </span>
            </div>
          )}
      </div>

      {/* Battery Percentage Bar */}
      <div className="w-full bg-base-200 rounded-full h-6 relative overflow-hidden">
        <div
          id="sm-battery-bar"
          className={`${getBatteryColor()} h-6 rounded-full transition-all duration-700`}
          style={{ width: `${batteryPercent || 0}%` }}
        ></div>
      </div>
      <div className="text-sm text-center font-mono font-bold mt-1">
        {(batteryPercent || 0).toFixed(1)}% SOC
      </div>
    </div>
  );
};

export default BatteryCard;
