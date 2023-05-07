import { Drawer, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const drawerWidth = 266

export const StyledSidebar = styled(Drawer)({
  minWidth: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
})

export const StyledHeading = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2, 0, 4, 2),
  fontWeight: 700,
}))
