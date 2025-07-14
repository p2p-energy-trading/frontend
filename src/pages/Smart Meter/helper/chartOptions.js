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
          return `${context.dataset.label}: ${context.parsed.y}`;
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
    },
  },
};

export const historyBarOptions = {
  responsive: true,
  plugins: { legend: { display: true, position: "top" } },
  scales: {
    x: {
      stacked: true,
      display: true,
      grid: { display: false },
      border: { display: false },
    },
    y: {
      ticks: { maxTicksLimit: 3 },
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
          return `${context.dataset.label}: ${context.parsed.y}`;
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
    },
  },
};
