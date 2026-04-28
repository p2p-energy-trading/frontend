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
  userProfile,
}) => {
  const handleGridControl = async (mode) => {
    await sendControlCommand({ grid: mode });
  };

  const currentGridMode = deviceStatus?.lastStatus?.grid?.mode || "off";
  const isProsumer = userProfile?.role === "Prosumer";

  // console.log("DeviceControlPanel - userProfile:", userProfile);
  // console.log("DeviceControlPanel - isProsumer:", isProsumer);

  // console.log("DeviceControlPanel render:", {
  //   deviceStatus,
  //   isControlling,
  //   controlError,
  // });

  return (
    <div className="card bg-base-100 border-2 border-base-300 p-6">
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

      {/* Grid Control */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <PowerIcon className="w-4 h-4" />
          Grid Mode Control
        </h4>
        <div className="text-xs text-base-content/60 mb-2">
          Current:{" "}
          <span className="font-mono badge badge-sm">{currentGridMode}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {isProsumer && (
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
          )}
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
    </div>
  );
};

export default DeviceControlPanel;
