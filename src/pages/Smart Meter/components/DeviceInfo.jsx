import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { DEVICE_LIST } from "../helper/smartMeter";

const DeviceInfo = ({
  selectedDevice,
  // setSelectedDevice,
  lastUpdate,
  deviceConnected,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
    {/* <div>
      <div className="font-semibold">Device ID</div>
      <select
        id="sm-device-select"
        className="font-mono  bg-base-100 border border-blue-200 rounded"
        value={selectedDevice.device_id}
        onChange={(e) => {
          const dev = DEVICE_LIST.find((d) => d.device_id === e.target.value);
          setSelectedDevice(dev);
        }}
      >
        {DEVICE_LIST.map((device) => (
          <option key={device.device_id} value={device.device_id}>
            {device.device_id}
          </option>
        ))}
      </select>
    </div> */}
    <div>
      <div className="font-semibold ">Location</div>
      <div className="font-mono" id="sm-location">
        {selectedDevice.location}
      </div>
    </div>
    <div>
      <div className="font-semibold ">Last Update</div>
      <div className="font-mono" id="sm-last-update">
        {lastUpdate}
      </div>
    </div>
    <div>
      <div className="font-semibold ">Status</div>
      <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
        <CheckCircleIcon className="w-3 h-3" />
        {deviceConnected ? "Online" : "Offline"}
      </span>
    </div>
  </div>
);

export default DeviceInfo;
