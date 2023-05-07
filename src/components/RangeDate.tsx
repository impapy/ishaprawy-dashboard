import React from "react"
import { NoSsr } from "@mui/material"
import { DateRangePicker } from "rsuite"
import "rsuite/dist/rsuite.min.css"
import { DateRange } from "rsuite/esm/DateRangePicker"
import { DateRange as DateRangeApi } from "api"
import { useRouter } from "next/router"

const RangeDatePicker: React.FC<{
  setDateRange: React.Dispatch<DateRangeApi | null>
  value: DateRange
}> = ({ setDateRange, value }) => {
  const router = useRouter()
  const handelDateRange = (e: DateRange | null) => {
    setDateRange({ from: new Date(e?.[0] || ""), to: new Date(e?.[1] || "") })
  }
  const handelCleanDateRange = () => {
    setDateRange(null)
  }
  return (
    <NoSsr>
      <DateRangePicker
        block
        showOneCalendar
        onChange={(e) => handelDateRange(e)}
        value={value}
        onClean={handelCleanDateRange}
      />
    </NoSsr>
  )
}

export default RangeDatePicker
