export const options = {
  responsive: true,
  maintainAspectRatio: false,
  resizeDelay: 0,
  animation: {
    duration: 1000,
    easing: "easeOutQuart",
  },
  transitions: {
    resize: {
      animation: { duration: 0 },
    },
  },
  interaction: {
    mode: "nearest",
    intersect: false,
  },

  plugins: {
    tooltip: { enabled: true },
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#000",
        font: {
          size: 12,
          weight: "bold",
        },
      },
    },
  },

  scales: {
    x: {
      grid: {
        color: "rgba(0,0,0,0.05)",
        drawBorder: false,
      },
      ticks: {
        color: "#000",
        font: { size: 11 },
      },
      title: {
        display: true,
        text: "X Axis Label", 
        color: "#000",
        font: { size: 12, weight: "bold" },
      },
    },
    y: {
      grid: {
        color: "rgba(0,0,0,0.05)",
        drawBorder: false,
      },
      ticks: {
        color: "#000",
        font: { size: 11 },
        padding: 8,
      },
      title: {
        display: true,
        text: "Efficiencies", 
        color: "#000",
        font: { size: 12, weight: "bold" },
      },
    },
  },

  elements: {
    line: {
      cubicInterpolationMode: "monotone",
    },
  },
};
