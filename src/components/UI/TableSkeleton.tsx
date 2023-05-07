import React from "react"
import Paper from "@mui/material/Paper"
import MuiTable from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import { Skeleton, TableHead } from "@mui/material"

export function TableSkeleton<T extends { _id: string }, U extends { key: string; label: string }>({
  columns,
  rows,
}: {
  columns: U[]
  rows: T[]
}) {
  return (
    <Paper sx={{ flex: 1 }}>
      <TableContainer sx={{ height: "100%" }}>
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} sx={{ color: "#667085" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.key} sx={{ py: 4 }}>
                        <Skeleton />
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

export default TableSkeleton
