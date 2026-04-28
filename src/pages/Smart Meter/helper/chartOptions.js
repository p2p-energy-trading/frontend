import { formatChartAxis } from "../../../utils/formatUnits";

export const chartOptions = {
  responsive: true,
  animation: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || "";
          const value = formatChartAxis(context.parsed.y, "power");
          return `${label}: ${value}`;
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
      ticks: { maxTicksLimit: 3, align: "inner" },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      display: true,
      beginAtZero: true,
      grid: { display: false },
      border: { display: false },
      ticks: {
        callback: function (value) {
          return formatChartAxis(value, "power");
        },
      },
    },
  },
};

export const chartOptionsGrid = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (context) {
          if (context.parsed.y === 0) return null;
          const value = formatChartAxis(context.parsed.y, "power");
          return `${context.dataset.label}: ${value}`;
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
      ticks: { maxTicksLimit: 3, align: "start" },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      display: true,
      beginAtZero: true,
      grid: { display: false },
      border: { display: false },
      ticks: {
        callback: function (value) {
          return formatChartAxis(value, "power");
        },
      },
    },
  },
};

export const historyBarOptions = {
  responsive: true,
  plugins: {
    legend: { display: true, position: "top" },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || "";
          const value = formatChartAxis(Math.abs(context.parsed.y), "energy");
          return `${label}: ${value}`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      display: true,
      grid: { display: false },
      border: { display: false },
      ticks: {
        autoSkip: false, // Show all labels
        maxRotation: 45, // Rotate labels to fit
        minRotation: 45,
      },
    },
    y: {
      ticks: {
        maxTicksLimit: 3,
        callback: function (value) {
          return formatChartAxis(value, "energy");
        },
      },
      display: true,
      beginAtZero: true,
      border: { display: false, dash: [6, 6] },
      grid: {
        display: true,
        drawTicks: false,
        color: (ctx) => (ctx.tick.value === 0 ? "#888" : "transparent"),
        borderDash: (ctx) => (ctx.tick.value === 0 ? [6, 6] : [0, 0]),
        lineWidth: (ctx) => (ctx.tick.value === 0 ? 1.5 : 0),
      },
    },
  },
  maintainAspectRatio: false,
  animation: true,
};

export const chartOptionsBattery = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (context) {
          if (context.parsed.y === 0) return null;
          const value = formatChartAxis(context.parsed.y, "power");
          return `${context.dataset.label}: ${value}`;
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
      ticks: { maxTicksLimit: 3, align: "start" },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      display: true,
      beginAtZero: false, // Allow negative values to be displayed
      grid: { display: false },
      border: { display: false },
      ticks: {
        callback: function (value) {
          return formatChartAxis(value, "power");
        },
      },
    },
  },
};
