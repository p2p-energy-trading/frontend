import { useState } from "react";
import {
  CogIcon,
  PowerIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const DeviceControlPanel = ({
  deviceStatus,
  sendControlCommand,
  isControlling,
  controlError,
  selectedMeter,
}) => {
  const [motorPercent, setMotorPercent] = useState(0);
  const [selectedMotor, setSelectedMotor] = useState("motor1");

  const handleGridControl = async (mode) => {
    await sendControlCommand({ grid: mode });
  };

  const handleMotorControl = async () => {
    const command = {
      [selectedMotor]: {
        percent: motorPercent,
        direction: motorPercent === 0 ? "stop" : "forward",
      },
    };
    await sendControlCommand(command);
  };

  const currentGridMode = deviceStatus?.lastStatus?.gridMode || "off";
  const motorStatus = deviceStatus?.lastStatus?.rawPayload || {};

  return (
    <div className="card bg-base-100 border-2 border-base-300 p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <CogIcon className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold">Device Control Panel</h3>
        <div className="badge badge-sm ml-2">
          {selectedMeter?.meterId || "No Device"}
        </div>
      </div>

      {controlError && (
        <div className="alert alert-error alert-sm mb-4">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <span className="text-sm">{controlError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grid Control */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <PowerIcon className="w-4 h-4" />
            Grid Mode Control
          </h4>
          <div className="text-xs text-base-content/60 mb-2">
            Current:{" "}
            <span className="font-mono badge badge-sm">{currentGridMode}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`btn btn-sm ${
                currentGridMode === "export" ? "btn-success" : "btn-outline"
              }`}
              onClick={() => handleGridControl("export")}
              disabled={isControlling}
            >
              <ArrowUpIcon className="w-3 h-3" />
              Export
            </button>
            <button
              className={`btn btn-sm ${
                currentGridMode === "import" ? "btn-error" : "btn-outline"
              }`}
              onClick={() => handleGridControl("import")}
              disabled={isControlling}
            >
              <ArrowDownIcon className="w-3 h-3" />
              Import
            </button>
            <button
              className={`btn btn-sm ${
                currentGridMode === "off" ? "btn-neutral" : "btn-outline"
              }`}
              onClick={() => handleGridControl("off")}
              disabled={isControlling}
            >
              <PowerIcon className="w-3 h-3" />
              Off
            </button>
          </div>
        </div>

        {/* Motor Control */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <CogIcon className="w-4 h-4" />
            Motor Control
          </h4>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <select
                className="select select-xs select-bordered w-24"
                value={selectedMotor}
                onChange={(e) => setSelectedMotor(e.target.value)}
              >
                <option value="motor1">Motor 1</option>
                <option value="motor2">Motor 2</option>
              </select>
              <span className="text-xs text-base-content/60">
                Current: {motorStatus[selectedMotor]?.percent || 0}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={motorPercent}
                onChange={(e) => setMotorPercent(parseInt(e.target.value))}
                className="range range-sm range-primary flex-1"
                disabled={isControlling}
              />
              <span className="text-xs font-mono w-10">{motorPercent}%</span>
            </div>

            <button
              className="btn btn-sm btn-primary"
              onClick={handleMotorControl}
              disabled={isControlling}
            >
              {isControlling ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Set Motor"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Device Status Overview */}
      <div className="divider"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <div className="font-semibold text-base-content/60">WiFi Status</div>
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                deviceStatus?.lastStatus?.wifiStatus?.connected
                  ? "bg-success"
                  : "bg-error"
              }`}
            ></div>
            <span className="font-mono">
              {deviceStatus?.lastStatus?.wifiStatus?.ip || "N/A"}
            </span>
          </div>
          <div className="text-base-content/50">
            RSSI: {deviceStatus?.lastStatus?.wifiStatus?.rssi || "N/A"} dBm
          </div>
        </div>

        <div>
          <div className="font-semibold text-base-content/60">MQTT Status</div>
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                deviceStatus?.lastStatus?.mqttStatus?.connected
                  ? "bg-success"
                  : "bg-error"
              }`}
            ></div>
            <span>
              {deviceStatus?.lastStatus?.mqttStatus?.connected
                ? "Connected"
                : "Disconnected"}
            </span>
          </div>
          <div className="text-base-content/50">
            Attempts: {deviceStatus?.lastStatus?.mqttStatus?.attempts || 0}
          </div>
        </div>

        <div>
          <div className="font-semibold text-base-content/60">
            System Memory
          </div>
          <div className="font-mono">
            {(
              (deviceStatus?.lastStatus?.systemStatus?.free_heap || 0) / 1024
            ).toFixed(1)}{" "}
            KB
          </div>
          <div className="text-base-content/50">Free Heap</div>
        </div>

        <div>
          <div className="font-semibold text-base-content/60">
            Last Heartbeat
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                deviceStatus?.lastHeartbeat?.status === "alive"
                  ? "bg-success"
                  : "bg-warning"
              }`}
            ></div>
            <span>{deviceStatus?.lastHeartbeat?.status || "N/A"}</span>
          </div>
          <div className="text-base-content/50">
            {deviceStatus?.lastHeartbeat?.timestamp
              ? new Date(
                  deviceStatus.lastHeartbeat.timestamp
                ).toLocaleTimeString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
              : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceControlPanel;
