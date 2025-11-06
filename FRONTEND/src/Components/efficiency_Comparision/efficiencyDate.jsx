import React, { useState } from "react";
import DatePicker from "react-datepicker";

function cunstomDateInput() {
  const [date, setDate] = useState(null)

  return (
    <div>
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        dateFormat="dd/MM/yyyy" // 👈 sets Pakistani-style format
        placeholderText="DD/MM/YYYY"
        className="border p-2 rounded"
      />
      {date && <p>Selected: {dayjs(date).format("DD/MM/YYYY")}</p>}
    </div>
  )
}
export default efficiencyDate
