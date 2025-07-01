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
            Last Seen:{" "}
            {selectedMeter?.lastSeen
              ? new Date(selectedMeter.lastSeen).toLocaleTimeString()
              : "N/A"}
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
              ? new Date(selectedMeter.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfoApi;
