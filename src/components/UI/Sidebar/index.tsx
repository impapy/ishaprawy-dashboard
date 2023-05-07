import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import { Box, Divider, Drawer, IconButton, styled, Typography } from "@mui/material"
import React from "react"

import NavList from "./NavList"
import { StyledHeading, StyledSidebar } from "./styles"

const Sidebar = ({
  drawerWidth,
  open,
  onDrawerClose,
}: {
  drawerWidth: number
  open: boolean
  onDrawerClose: () => void
}) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position:'sticky',
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box>
        <StyledHeading variant="h6">Dashboard</StyledHeading>
        <NavList />
      </Box>

      <Box>
        <Divider />

        <DrawerFooter>
          <IconButton onClick={onDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerFooter>
      </Box>
    </Drawer>
  )
}

export default Sidebar

const DrawerFooter = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  position: "sticky",
  left: 0,
  bottom: 0,
  boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.05)",
  background: theme.palette.common.white,
  textAlign: "right",
}))
