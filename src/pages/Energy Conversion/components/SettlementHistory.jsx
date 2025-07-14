import React, { useMemo } from "react";
import Datagrid from "../../../components/datagrid/Datagrid";
import { EyeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const SettlementHistory = ({
  settlements,
  loading,
  metadata,
  onScopeChange,
  currentScope,
}) => {
  const tableHeaderData = useMemo(
    () => [
      { columnName: "Settlement ID", sort: false, filter: false },
      { columnName: "Smart Meter", sort: true, filter: true },
      { columnName: "Period Start", sort: true, filter: false },
      { columnName: "Period End", sort: true, filter: false },
      { columnName: "Net kWh", sort: true, filter: false },
      { columnName: "ETK Credited", sort: true, filter: false },
      { columnName: "Status", sort: true, filter: true },
      { columnName: "TX Hash", sort: false, filter: false },
      { columnName: "Created At", sort: true, filter: false },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (!settlements || settlements.length === 0) return [];

    return settlements.map((settlement, index) => [
      settlement.settlementId || index + 1, // ID for row selection
      settlement.settlementId,
      settlement.meterId,
      new Date(settlement.periodStartTime).toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      new Date(settlement.periodEndTime).toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      parseFloat(settlement.netKwhFromGrid).toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }) + " kWh",
      parseFloat(settlement.etkAmountCredited).toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }) + " ETK",
      {
        text: settlement.status,
        decorator: {
          status: {
            type: settlement.status === "SUCCESS" ? "success" : "error",
            badge: true,
          },
        },
      },
      settlement.blockchainTxHash
        ? {
            text: `${settlement.blockchainTxHash.slice(
              0,
              6
            )}...${settlement.blockchainTxHash.slice(-4)}`,
            decorator: "link",
            href: `http://34.101.197.110:8999/#section=explorer&widgetId=txn-detail&data="${settlement.blockchainTxHash}"`,
            target: "_blank",
          }
        : "-",
      new Date(settlement.createdAtBackend).toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    ]);
  }, [settlements]);

  const tableOptions = {
    numberOfRows: Math.max(1, tableData.length), // Dynamic height based on data
    pagination: false, // Disable pagination to show all rows
    itemsPerPage: false, // Hide items per page selector
    actionButtons: false, // Hide action buttons
    exportButton: true, // Keep export functionality
    search: true, // Hide search since we're showing all data
  };

  const getScopeIcon = (scope) => {
    switch (scope) {
      case "own":
        return <EyeIcon className="w-4 h-4" />;
      case "public":
        return <GlobeAltIcon className="w-4 h-4" />;
      default:
        return <EyeIcon className="w-4 h-4" />;
    }
  };

  const getScopeLabel = (scope) => {
    switch (scope) {
      case "own":
        return "My Settlements";
      case "public":
        return "Public Settlements";
      default:
        return "My Settlements";
    }
  };

  const getScopeDescription = (scope) => {
    switch (scope) {
      case "own":
        return "View your own settlement history";
      case "public":
        return "View public settlement transactions for transparency";
      default:
        return "View your own settlement history";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Scope Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["own", "public"].map((scope) => (
            <button
              key={scope}
              onClick={() => onScopeChange(scope)}
              className={`btn btn-sm ${
                currentScope === scope
                  ? "btn-primary"
                  : "btn-outline btn-primary"
              }`}
              title={getScopeDescription(scope)}
            >
              {getScopeIcon(scope)}
              <span className="hidden sm:inline">{getScopeLabel(scope)}</span>
            </button>
          ))}
        </div>

        {/* Metadata Display */}
        {metadata && (
          <div className="text-sm text-base-content/70 flex flex-wrap items-center gap-2">
            <span className="hidden sm:inline">Scope:</span>
            <span className="font-semibold">{getScopeLabel(currentScope)}</span>
            <span className="divider divider-horizontal hidden sm:block"></span>
            <span className="hidden sm:inline">Showing:</span>
            <span className="font-semibold">{metadata.totalReturned}</span>
            <span className="hidden sm:inline">of {metadata.limit} max</span>
          </div>
        )}
      </div>

      {/* Transparency Notice for Public Scope */}
      {currentScope === "public" && (
        <div className="alert alert-info">
          <GlobeAltIcon className="w-5 h-5" />
          <div>
            <div className="font-bold">Public Transparency View</div>
            <div className="text-sm">
              You are viewing public settlement transactions to promote
              transparency in the P2P energy trading network.
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      {!settlements || settlements.length === 0 ? (
        <div className="text-center py-8 text-base-content/60">
          <div className="flex flex-col items-center gap-2">
            {getScopeIcon(currentScope)}
            <div>
              No settlement history available for{" "}
              {getScopeLabel(currentScope).toLowerCase()}
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <Datagrid
            tableData={tableData}
            tableHeaderData={tableHeaderData}
            tableOptions={tableOptions}
          />
        </div>
      )}
    </div>
  );
};

export default SettlementHistory;
