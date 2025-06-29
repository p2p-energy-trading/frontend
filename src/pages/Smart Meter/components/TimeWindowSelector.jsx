import { TIME_WINDOWS } from "../helper/smartMeter";

const TimeWindowSelector = ({ timeWindow, setTimeWindow }) => (
  <div className="flex items-center gap-2 mt-4 mb-2">
    <label htmlFor="sm-time-window" className="font-semibold  text-xs">
      Time Window:
    </label>
    <select
      id="sm-time-window"
      className="text-xs border border-blue-200 rounded px-2 py-1"
      value={timeWindow}
      onChange={(e) => setTimeWindow(e.target.value)}
    >
      {TIME_WINDOWS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default TimeWindowSelector;