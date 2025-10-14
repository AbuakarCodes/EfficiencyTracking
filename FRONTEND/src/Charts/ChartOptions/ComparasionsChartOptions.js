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
      mode: "nearest", // 👈 makes tooltip appear when near line
      intersect: false,
    },

    plugins: {
      tooltip: { enabled: true }, // 👈 ensures tooltip is on
      legend: { display: false },
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
      },
    },
    elements: {
      line: {
        cubicInterpolationMode: "monotone",
      },
    },
  }