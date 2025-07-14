export function getSolarChartData(energyHistory, colorWarning) {
  return {
    labels: energyHistory.map((d) => d.time).reverse(),
    datasets: [
      {
        label: "Solar (kW)",
        data: energyHistory.map((d) => d.solar).reverse(),
        borderColor: colorWarning,
        backgroundColor: colorWarning + "33",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };
}

export function getConsumeChartData(energyHistory, colorError) {
  return {
    labels: energyHistory.map((d) => d.time).reverse(),
    datasets: [
      {
        label: "Usage (kW)",
        data: energyHistory.map((d) => d.usage).reverse(),
        borderColor: colorError,
        backgroundColor: colorError + "33",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };
}

export function getGridChartData(
  energyHistory,
  gridStatus,
  colorSuccess,
  colorError,
  colorWarning,
  colorBaseContent
) {
  return {
    labels: energyHistory.map((d) => d.time).reverse(),
    datasets: [
      {
        label: "Grid",
        data: energyHistory.map((d) => d.grid).reverse(),
        borderColor:
          gridStatus === "Exporting"
            ? colorSuccess
            : gridStatus === "Importing"
            ? colorError
            : colorBaseContent,
        backgroundColor:
          gridStatus === "Exporting"
            ? colorSuccess + "33"
            : gridStatus === "Importing"
            ? colorError + "33"
            : colorBaseContent + "33",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
        order: 1,
      },
      {
        label: "Zero",
        data: new Array(energyHistory.length).fill(0),
        borderColor: "#888",
        borderWidth: 1,
        borderDash: [6, 6],
        pointRadius: 0,
        fill: false,
        order: 0,
      },
    ],
  };
}

export function getHistoryBarData(
  energyHistory,
  colorWarning,
  colorError,
  colorAccent,
  colorSuccess
) {
  return {
    labels: energyHistory.map((d) => d.time).reverse(),
    datasets: [
      {
        label: "Solar",
        data: energyHistory.map((d) => d.solar).reverse(),
        backgroundColor: colorWarning,
        stack: "Stack 0",
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
      {
        label: "Usage",
        data: energyHistory.map((d) => -Math.abs(d.usage)).reverse(),
        backgroundColor: colorError,
        stack: "Stack 0",
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
      {
        label: "Grid",
        data: energyHistory.map((d) => d.grid).reverse(),
        backgroundColor: colorAccent,
        stack: "Stack 0",
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
      {
        label: "Battery",
        data: energyHistory.map((d) => d.battery).reverse(),
        backgroundColor: colorSuccess,
        stack: "Stack 0",
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    ],
  };
}

export function getBatteryChartData(
  energyHistory,
  batteryStatus,
  colorSuccess,
  colorError,
  colorBaseContent
) {
  return {
    labels: energyHistory.map((d) => d.time).reverse(),
    datasets: [
      {
        label: "Battery",
        data: energyHistory.map((d) => d.battery || 0).reverse(),
        borderColor:
          batteryStatus === "Charging"
            ? colorSuccess
            : batteryStatus === "Discharging"
            ? colorError
            : colorBaseContent,
        backgroundColor:
          batteryStatus === "Charging"
            ? colorSuccess + "33"
            : batteryStatus === "Discharging"
            ? colorError + "33"
            : colorBaseContent + "33",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
        order: 1,
      },
      {
        label: "Zero",
        data: new Array(energyHistory.length).fill(0),
        borderColor: "#888",
        borderWidth: 1,
        borderDash: [6, 6],
        pointRadius: 0,
        fill: false,
        order: 0,
      },
    ],
  };
}
