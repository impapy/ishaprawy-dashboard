import React, { useEffect } from "react"
import Head from "next/head"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Box, Container, Divider, Drawer, Grid, styled, Toolbar, Typography } from "@mui/material"

import Admin from "./Admin"
import ButtonBack from "components/UI/buttons/ButtonBack"
import Sidebar from "./Sidebar"
import { useWindowSize } from "hooks/useWindowSize"

interface LayoutProps {
  children: React.ReactNode
  title: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [open, setOpen] = React.useState(true)
  const { width } = useWindowSize()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (width && width <= 1024) {
      handleDrawerClose()
    } else if (width && width > 1024) {
      handleDrawerOpen()
    }
  }, [width])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Box sx={{ display: "flex" }}>
        <HamburgerMenu color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
          <MenuIcon />
        </HamburgerMenu>

        <Sidebar open={open} onDrawerClose={handleDrawerClose} drawerWidth={drawerWidth} />

        <Main open={open}>
          <Grid container spacing={3}>
            <Grid item marginTop={9}>
              <ButtonBack />
            </Grid>
            <Grid item flex={1} sx={{marginTop: 2}}>
              <Admin />
              {children}
            </Grid>
          </Grid>
        </Main>
      </Box>
    </div>
  )
}

export default Layout

const drawerWidth = 266

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const HamburgerMenu = styled(IconButton, { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme, open }) => ({
  mr: 2,
  position: "fixed",
  left: theme.spacing(3),
  bottom: theme.spacing(2),
  ...(open && { display: "none" }),
}))
