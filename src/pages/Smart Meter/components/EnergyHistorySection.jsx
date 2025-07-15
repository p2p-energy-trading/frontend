import { Bar } from "react-chartjs-2";
import Datagrid from "../../../components/datagrid/Datagrid";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { historyBarOptions } from "../helper/chartOptions";
import { energyHistoryHeader, tableOptions } from "../helper/smartMeter";

const EnergyHistorySection = ({ historyBarData, loading = false }) => {
  // Function to convert UTC time to WIB (+7 hours)
  const convertToWIB = (timeString) => {
    if (!timeString || typeof timeString !== "string") return timeString;

    // Parse the time string (e.g., "11.00" -> 11.00)
    const timeFloat = parseFloat(timeString);
    if (isNaN(timeFloat)) return timeString;

    // Extract hours and minutes
    const hours = Math.floor(timeFloat);
    const minutes = Math.round((timeFloat - hours) * 100);

    // Add 7 hours for WIB conversion
    let wibHours = hours + 7;

    // Handle overflow (24:00 -> 00:00)
    if (wibHours >= 24) {
      wibHours = wibHours - 24;
    }

    // Format back to "HH.MM" format
    const formattedHours = wibHours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}.${formattedMinutes}`;
  };

  if (loading) {
    return (
      <div className="card border-2 border-base-300 bg-base-100 p-6 mt-8 w-full overflow-x-auto">
        <div className="flex items-center gap-2 mb-2">
          <ChartBarIcon className="w-5 h-5 text-primary" />
          <span className="font-semibold">Energy History (Last 12h)</span>
        </div>
        <div className="w-full h-52 mb-4 relative min-w-[350px]">
          <div className="skeleton h-full w-full"></div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  return (
    <div className="card border-2 border-base-300 bg-base-100 p-6 mt-8 w-full overflow-x-auto">
      <div className="flex items-center gap-2 mb-2">
        <ChartBarIcon className="w-5 h-5 text-primary" />
        <span className="font-semibold ">Energy History (Last 12h)</span>
      </div>
      <div className="w-full h-52 mb-2 relative min-w-[350px]">
        <Bar
          options={historyBarOptions}
          data={{
            ...historyBarData,
            labels:
              historyBarData?.labels?.map((time) => convertToWIB(time)) || [],
          }}
          height={208}
        />
      </div>
      <Datagrid
        tableHeaderData={energyHistoryHeader}
        tableData={
          historyBarData?.labels?.map((time, idx) => [
            idx,
            convertToWIB(time), // Convert UTC time to WIB (+7 hours)
            historyBarData.datasets[0]?.data?.[idx]?.toFixed(2) || "0.00", // Solar
            Math.abs(historyBarData.datasets[1]?.data?.[idx] || 0).toFixed(2), // Usage (convert back from negative)
            historyBarData.datasets[2]?.data?.[idx]?.toFixed(2) || "0.00", // Grid
          ]) || []
        }
        tableOptions={tableOptions}
      />
    </div>
  );
};

export default EnergyHistorySection;
