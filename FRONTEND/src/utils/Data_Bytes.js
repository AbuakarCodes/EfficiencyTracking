const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const EfficiencyDateStyle = {
  input: {
    borderColor: "#333",
    backgroundColor: "#000",
    color: "#fff",
    "&:focus": {
      borderColor: "green",
      boxShadow: "0 0 0 2px rgba(16,185,129,0.3)",
    },
  },
  day: {
    color: "black",
  }

}

export { months, EfficiencyDateStyle }