import React from "react"
import Paper from "@mui/material/Paper"
import MuiTable from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import { path } from "ramda"
import { Checkbox, TableHead, Typography } from "@mui/material"
import Link from "components/Link"

export type ColumnPayloadValue = Record<string, string> | string | number | boolean | React.FC
export interface Column {
  key: string
  label: string
  align?: "right"
  type: "text" | "boolean" | "link" | "action" | "date"
  payload?: ColumnPayloadValue
  format?: (value: unknown, row: unknown) => string | React.ReactElement
}

function Row<T>({ column, row }: { column: Column; row: T }) {
  const value = column.format
    ? column.format(path(column.key.split("."), row), row)
    : path(column.key.split("."), row) ?? ""

  switch (column.type) {
    case "text":
      return <Typography>{value as string}</Typography>
    case "boolean":
      return <Checkbox checked={value as boolean} />
    case "link":
      return (
        <Link
          href={((column.payload as Record<string, string>)?.to || "/").toString().replaceAll(":key", value as string)}
        >
          {(column.payload as Record<string, string>)?.label}
        </Link>
      )
    case "action":
      const Comp = column.payload as React.FC<{ row: unknown; column: Column; value: unknown }>
      return <Comp row={row} column={column} value={value} />
    case "date":
      return (
        <>
          {new Date(value as string).toLocaleString("en-us", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </>
      )
    default:
      return null
  }
}

export function Table<T extends { _id: string }>({ columns, rows }: { columns: Column[]; rows: T[] }) {
  return (
    <Paper sx={{ width: "98.5%", overflowY: "scroll", flex: 1 }}>
      <TableContainer sx={{ height: "100%" }}>
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} align={column.align} sx={{ color: "#667085" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.key} align={column.align} sx={{ py: 4 }}>
                        <Row column={column} row={row} />
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Paper>
  )
}

export default Table
