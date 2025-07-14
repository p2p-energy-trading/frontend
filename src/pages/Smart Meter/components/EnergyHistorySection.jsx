import { Bar } from "react-chartjs-2";
import Datagrid from "../../../components/datagrid/Datagrid";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { historyBarOptions } from "../helper/chartOptions";
import { energyHistoryHeader, tableOptions } from "../helper/smartMeter";

const EnergyHistorySection = ({ historyBarData, loading = false }) => {
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
        <Bar options={historyBarOptions} data={historyBarData} height={208} />
      </div>
      <Datagrid
        tableHeaderData={energyHistoryHeader}
        tableData={
          historyBarData?.labels?.map((time, idx) => [
            idx,
            time,
            historyBarData.datasets[0]?.data?.[idx]?.toFixed(2) || "0.00", // Solar
            Math.abs(historyBarData.datasets[1]?.data?.[idx] || 0).toFixed(2), // Usage (convert back from negative)
            historyBarData.datasets[2]?.data?.[idx]?.toFixed(2) || "0.00", // Grid
            historyBarData.datasets[3]?.data?.[idx]?.toFixed(2) || "0.00", // Battery
          ]) || []
        }
        tableOptions={tableOptions}
      />
    </div>
  );
};

export default EnergyHistorySection;
