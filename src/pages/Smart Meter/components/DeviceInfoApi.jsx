import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import {
  ClockIcon,
  MapPinIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const DeviceInfoApi = ({
  selectedMeter,
  setSelectedMeter,
  userProfile,
  lastUpdate,
  deviceConnected,
}) => {
  const meters = userProfile?.meters || [];

  // Function to format relative time
  const formatRelativeTime = (dateString) => {
    if (!dateString) return "N/A";

    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    // If less than 1 minute
    if (diffInMinutes < 1) {
      return "Just now";
    }

    // If less than 1 hour
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    // If less than 24 hours
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    // If today
    if (diffInDays === 0) {
      const timeString = date.toLocaleTimeString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return `Today at ${timeString}`;
    }

    // If yesterday
    if (diffInDays === 1) {
      const timeString = date.toLocaleTimeString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return `Yesterday at ${timeString}`;
    }

    // If less than a week
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    // If less than a month
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }

    // If less than a year
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }

    // If more than a year
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="card bg-base-100 border-2 border-base-300 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-xs">
        {/* Device Selection */}
        <div>
          <div className="font-semibold mb-1 flex items-center gap-1">
            <CpuChipIcon className="w-3 h-3" />
            Smart Meter
          </div>
          {meters.length > 1 ? (
            <select
              className="select select-xs select-bordered w-full font-mono"
              value={selectedMeter?.meterId || ""}
              onChange={(e) => {
                const meter = meters.find((m) => m.meterId === e.target.value);
                setSelectedMeter(meter);
              }}
            >
              {meters.map((meter) => (
                <option key={meter.meterId} value={meter.meterId}>
                  {meter.meterId}
                </option>
              ))}
            </select>
          ) : (
            <div className="font-mono badge badge-primary badge-sm">
              {selectedMeter?.meterId || "No Device"}
            </div>
          )}
          <div className="text-base-content/50 mt-1">
            {selectedMeter?.deviceModel} v{selectedMeter?.deviceVersion}
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="font-semibold mb-1 flex items-center gap-1">
            <MapPinIcon className="w-3 h-3" />
            Location
          </div>
          <div className="font-mono text-xs">
            {selectedMeter?.location || "Unknown"}
          </div>
          <div className="text-base-content/50 mt-1">
            Status: {selectedMeter?.status || "N/A"}
          </div>
        </div>

        {/* Last Update */}
        <div>
          <div className="font-semibold mb-1 flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            Last Update
          </div>
          <div className="font-mono text-xs">{lastUpdate}</div>
          <div className="text-base-content/50 mt-1">
            Last Seen: {formatRelativeTime(selectedMeter?.lastSeen)}
          </div>
        </div>

        {/* Connection Status */}
        <div>
          <div className="font-semibold mb-1">Connection Status</div>
          <span
            className={`inline-flex items-center gap-1 font-semibold ${
              deviceConnected ? "text-success" : "text-error"
            }`}
          >
            {deviceConnected ? (
              <CheckCircleIcon className="w-3 h-3" />
            ) : (
              <XCircleIcon className="w-3 h-3" />
            )}
            {deviceConnected ? "Online" : "Offline"}
          </span>
          <div className="text-base-content/50 mt-1">
            Created:{" "}
            {selectedMeter?.createdAt
              ? new Date(selectedMeter.createdAt).toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour12: false,
                })
              : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfoApi;
