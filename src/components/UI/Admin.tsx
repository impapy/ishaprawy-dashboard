import React from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import { Logout } from "@mui/icons-material"
import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useAuthContext } from "contexts/AuthContext"

const Admin = () => {
  const {
    auth: { viewer, isLoggedIn },
  } = useAuthContext()
  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" paddingRight={3} mb={3}>
      <Avatar alt="Remy Sharp" src="/avatar.jpg" />
      <Typography fontWeight={500}>{viewer?.name}</Typography>
      {isLoggedIn && <ButtonLogout />}
    </Stack>
  )
}

export default Admin

const ButtonLogout = () => {
  const { logout } = useAuthContext()
  return (
    <Tooltip title="Logout">
      <IconButton onClick={logout}>
        <Logout color="error" />
      </IconButton>
    </Tooltip>
  )
}
