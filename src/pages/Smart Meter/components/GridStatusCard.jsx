import { Line } from "react-chartjs-2";
import { chartOptionsGrid } from "../helper/chartOptions";
import StatusDot from "./StatusDot";

const GridStatusCard = ({ gridStatus, grid, gridChartData }) => (
  <div className="card border-2 border-base-300  p-6 flex flex-col gap-2  mt-2">
    <div className="flex items-center gap-2 mb-2">
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeWidth={2}
          stroke="currentColor"
          d="M3 12h18M12 3v18"
        />
      </svg>
      <span className="font-semibold ">Grid Status</span>
    </div>
    <div className="flex items-center gap-3">
      <StatusDot status={gridStatus} />
      <span className="">|</span>
      <span className="inline-flex items-center gap-1 ">
        <div className="flex items-end gap-2">
          <span
            id="sm-consume-value"
            className={`text-3xl font-bold ${
              gridStatus === "Exporting"
                ? "text-success"
                : gridStatus === "Importing"
                ? "text-error"
                : "text-base-content"
            } font-mono`}
          >
            {grid.toFixed(2)}
          </span>
          <span className="mb-1">kW</span>
        </div>
      </span>
    </div>
    <div className="w-full h-24 relative mt-2">
      <Line options={chartOptionsGrid} data={gridChartData} height={98} />
    </div>
    <div className="text-xs  mt-1">
      Net energy flow to grid (positive: export, negative: import)
    </div>
  </div>
);

export default GridStatusCard;