import React from "react"
import * as R from "ramda"
import { Alert, Stack, Typography } from "@mui/material"

const ErrorAlert = ({ error }: { error: unknown }) => {
  if (!error) return null
  return (
    <Alert severity="error">
      <Stack spacing={1}>
        <Typography variant="h6">Something Went Wrong, Please Try Again</Typography>
        <Typography variant="caption">{R.path(["response", "errors", 0, "message"], error)}</Typography>
      </Stack>
    </Alert>
  )
}

export default ErrorAlert
