const BatteryCard = ({
  battery,
  batteryStatus,
  batteryFlow,
  description,
  chart,
}) => (
  <div className="card border-2 border-base-300 rounded-xl p-6 flex flex-col gap-2">
    <div className="flex items-center gap-2 mb-2">
      <svg
        className="w-6 h-6 text-success"
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
      <span className="font-semibold">Battery</span>
    </div>
    <div className="flex items-end gap-2">
      <span
        id="sm-battery-value"
        className="text-3xl font-bold text-success font-mono"
      >
        {battery.toFixed(2)}
      </span>
      <span className="mb-1">kW</span>
      <div className="flex items-center gap-2 text-xs mb-1">
        <span className="">|</span>
        <span
          className={
            batteryStatus === "Charging"
              ? "text-success"
              : batteryStatus === "Discharging"
              ? "text-error"
              : ""
          }
        >
          {batteryStatus}
        </span>
        {batteryStatus !== "Idle" && (
          <span>
            ({batteryFlow > 0 ? "+" : ""}
            {batteryFlow.toFixed(2)} kW)
          </span>
        )}
      </div>
    </div>
    {/* <div className="w-full bg-gray-200 rounded-full h-5 mt-2 relative">
      <div
        id="sm-battery-bar"
        className="bg-success h-5 rounded-full transition-all duration-700"
        style={{ width: `${batteryPercent}%` }}
      ></div>
      <span className="absolute right-2 top-0.5 text-xs text-primary-content font-mono">
        {batteryPercent}%
      </span>
    </div> */}
    {chart}
    <div className="text-xs mt-auto">{description}</div>
  </div>
);

export default BatteryCard;
