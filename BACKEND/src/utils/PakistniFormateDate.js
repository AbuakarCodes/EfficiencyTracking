function formatToPakistaniDate(isoString) {
  const date = new Date(isoString);

  const day = date.toLocaleString("en-PK", { day: "2-digit", timeZone: "Asia/Karachi" });
  const month = date.toLocaleString("en-PK", { month: "2-digit", timeZone: "Asia/Karachi" });
  const year = date.toLocaleString("en-PK", { year: "numeric", timeZone: "Asia/Karachi" });

  return `${day}-${month}-${year}`;
}

console.log(formatToPakistaniDate)