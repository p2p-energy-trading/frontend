import { Bar } from "react-chartjs-2";
import Datagrid from "../../../components/datagrid/Datagrid";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { historyBarOptions } from "../helper/chartOptions";
import { energyHistoryHeader, tableOptions } from "../helper/smartMeter";
import { formatEnergy } from "../../../utils/formatUnits";
import { useMemo } from "react";

const EnergyHistorySection = ({
  historyBarData,
  loading = false,
  isProsumer = true,
}) => {
  // Filter datasets based on user role
  const filteredChartData = useMemo(() => {
    if (!historyBarData) return null;

    return {
      ...historyBarData,
      datasets: isProsumer
        ? historyBarData.datasets
        : historyBarData.datasets.filter(
            (dataset) => dataset.label !== "Solar"
          ),
    };
  }, [historyBarData, isProsumer]);

  // Filter table headers based on user role
  const filteredTableHeaders = useMemo(() => {
    return isProsumer
      ? energyHistoryHeader
      : energyHistoryHeader.filter((header) => header.columnName !== "Solar");
  }, [isProsumer]);

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
        <Bar options={historyBarOptions} data={filteredChartData} />
      </div>
      <Datagrid
        tableHeaderData={filteredTableHeaders}
        tableData={
          historyBarData?.labels?.map((time, idx) => {
            const solarDataset = historyBarData.datasets.find(
              (d) => d.label === "Solar"
            );
            const usageDataset = historyBarData.datasets.find(
              (d) => d.label === "Usage"
            );
            const gridDataset = historyBarData.datasets.find(
              (d) => d.label === "Grid"
            );

            const row = [
              idx,
              time, // Time already formatted as HH:mm
            ];

            if (isProsumer) {
              row.push(
                formatEnergy(Number(solarDataset?.data?.[idx]) || 0).formatted // Solar
              );
            }

            row.push(
              formatEnergy(Math.abs(Number(usageDataset?.data?.[idx]) || 0))
                .formatted, // Usage (convert back from negative)
              formatEnergy(Number(gridDataset?.data?.[idx]) || 0).formatted // Grid
            );

            return row;
          }) || []
        }
        tableOptions={tableOptions}
      />
    </div>
  );
};

export default EnergyHistorySection;
