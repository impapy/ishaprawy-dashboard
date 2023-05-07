import React from "react"
import MuiTablePagination from "@mui/material/TablePagination"
import { useRouter } from "next/router"

export const TablePagination = ({ count, p }: { count: number; p?: string }) => {
  const router = useRouter()
  return (
    <MuiTablePagination
      component="div"
      count={count}
      page={p ? +router.query.subPage! - 1 || 0 : +router.query.p! - 1 || 0}
      onPageChange={
        p
          ? (_, page) => {
              router.push({ query: { ...router.query, subPage: page + 1 } })
            }
          : (_, page) => {
              router.push({ query: { ...router.query, p: page + 1 } })
            }
      }
      rowsPerPage={router.asPath.split("?", 1)[0] == "/categories" ? 5 : 10}
      rowsPerPageOptions={[]} // hide the rows per page selector
    />
  )
}
