import { Bar } from "react-chartjs-2";
import Datagrid from "../../../components/datagrid/Datagrid";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { historyBarOptions } from "../helper/chartOptions";
import { energyHistoryHeader, tableOptions } from "../helper/smartMeter";

const EnergyHistorySection = ({ energyHistory, historyBarData }) => (
  <div className="card border-2 border-base-200 bg-base-100 p-6 mt-8 w-full overflow-x-auto">
    <div className="flex items-center gap-2 mb-2">
      <ChartBarIcon className="w-5 h-5 text-primary" />
      <span className="font-semibold ">Energy History (Last 24h)</span>
    </div>
    <div className="w-full h-52 mb-2 relative min-w-[350px]">
      <Bar options={historyBarOptions} data={historyBarData} height={208} />
    </div>
    <Datagrid
      tableHeaderData={energyHistoryHeader}
      tableData={energyHistory.map((row, idx) => [
        idx,
        row.time,
        row.solar.toFixed(2),
        row.usage.toFixed(2),
        row.grid.toFixed(2),
        row.battery.toFixed(2),
      ])}
      tableOptions={tableOptions}
    />
    
  </div>
);

export default EnergyHistorySection;