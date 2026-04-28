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
  timestamp,
  deviceConnected,
  deviceStatus,
}) => {
  const meters = userProfile?.meters || [];

  // Function to format relative time
  const formatRelativeTime = (dateString) => {
    // console.log("Formatting date string:", dateString);

    if (!dateString) return "N/A";

    const now = new Date();
    let date;

    // Check if dateString is already a Date object or ISO string
    if (dateString instanceof Date) {
      date = dateString;
    } else if (typeof dateString === "string") {
      // Try to parse the date string
      date = new Date(dateString);
    } else {
      return "N/A";
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn("Invalid date:", dateString);
      return "N/A";
    }

    // console.log("Parsed date:", date);
    // console.log("Now:", now);

    const diffInMs = now - date;
    // console.log("Diff in ms:", diffInMs);

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 text-xs">
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
          <div className="text-base-content/50 mt-1 text-[10px]">
            {selectedMeter?.deviceModel} v{selectedMeter?.deviceVersion}
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="font-semibold mb-1 flex items-center gap-1">
            <MapPinIcon className="w-3 h-3" />
            Location
          </div>
          <div className="font-mono">
            {selectedMeter?.location || "Unknown"}
          </div>
          <div className="text-base-content/50 mt-1 text-[10px]">
            {selectedMeter?.status || "N/A"}
          </div>
        </div>

        {/* Last Update */}
        <div>
          <div className="font-semibold mb-1 flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            Last Update
          </div>
          <div className="font-mono">{lastUpdate}</div>
          <div className="text-base-content/50 mt-1 text-[10px]">
            {formatRelativeTime(timestamp)}
          </div>
        </div>

        {/* Connection Status */}
        <div>
          <div className="font-semibold mb-1">Connection</div>
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
          <div className="text-base-content/50 mt-1 text-[10px] space-y-0.5">
            <div className="flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  deviceStatus?.lastStatus?.wifi?.connected
                    ? "bg-success"
                    : "bg-error"
                }`}
              ></div>
              <span>
                WiFi: {deviceStatus?.lastStatus?.wifi?.rssi || "N/A"} dBm
              </span>
            </div>
            {/* <div className="flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  deviceStatus?.lastStatus?.mqtt?.connected
                    ? "bg-success"
                    : "bg-error"
                }`}
              ></div>
              <span>
                MQTT: {deviceStatus?.lastStatus?.mqtt?.connected ? "OK" : "ERR"}
              </span>
            </div> */}
          </div>
        </div>

        {/* System Memory */}
        <div>
          <div className="font-semibold mb-1 text-base-content/60">Memory</div>
          <div className="font-mono">
            {(
              (deviceStatus?.lastStatus?.system?.free_heap || 0) / 1024
            ).toFixed(1)}{" "}
            KB
          </div>
          <div className="text-base-content/50 mt-1 text-[10px]">Free Heap</div>
        </div>

        {/* System Uptime */}
        <div>
          <div className="font-semibold mb-1 text-base-content/60">Uptime</div>
          <div className="font-mono">
            {(() => {
              const uptimeMilliseconds =
                deviceStatus?.lastStatus?.system?.uptime || 0;
              const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
              const days = Math.floor(uptimeSeconds / 86400);
              const hours = Math.floor((uptimeSeconds % 86400) / 3600);
              const minutes = Math.floor((uptimeSeconds % 3600) / 60);

              if (days > 0) {
                return `${days}d ${hours}h`;
              } else if (hours > 0) {
                return `${hours}h ${minutes}m`;
              } else {
                return `${minutes}m`;
              }
            })()}
          </div>
          <div className="text-base-content/50 mt-1 text-[10px]">
            {deviceStatus?.lastStatus?.system?.uptime
              ? `${Math.floor(
                  deviceStatus.lastStatus.system.uptime / 1000 / 3600
                )}h total`
              : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfoApi;
