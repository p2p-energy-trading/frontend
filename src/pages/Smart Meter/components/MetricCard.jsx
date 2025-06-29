const MetricCard = ({
  icon,
  label,
  value,
  unit,
  color,
  chart,
  status,
  flow,
  description
}) => (
  <div className="card border-2 border-base-200 p-6 flex flex-col gap-2">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="font-semibold">{label}</span>
    </div>
    <div className="flex items-end gap-2">
      <span className={`text-3xl font-bold ${color} font-mono`}>{value}</span>
      <span className="mb-1">{unit}</span>
    </div>
    {status && (
      <div className="flex items-center gap-2 text-xs mt-1">
        <span
          className={
            status === "Charging"
              ? "text-success"
              : status === "Discharging"
              ? "text-error"
              : ""
          }
        >
          {status}
        </span>
        {status !== "Idle" && (
          <span>
            ({flow > 0 ? "+" : ""}
            {flow.toFixed(2)} kW)
          </span>
        )}
      </div>
    )}
    {chart}
    <div className="text-xs  mt-1">{description}</div>
  </div>
);

export default MetricCard;
