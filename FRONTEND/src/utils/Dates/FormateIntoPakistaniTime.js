export function formatToPakistaniMonthYear(dateString) {
    if (!dateString) return "Invalid date";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-PK", {
        month: "long", // full month name (e.g., October)
        year: "numeric"

    });
}


