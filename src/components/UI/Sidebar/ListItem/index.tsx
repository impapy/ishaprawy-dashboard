import { ListItem as MuiListItem, ListItemIcon, ListItemText } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { StyledListButton } from "./styles"
import { ListItemProps } from "./types"

const ListItem: React.FC<ListItemProps> = ({ lightIcon: LightIcon, darkIcon: DarkIcon, label, path }) => {
  const { pathname } = useRouter()
  const [isActive, setIsActive] = useState<boolean>()

  useEffect(() => {
    const rootPage = `/${pathname.split("/")[1]}`

    setIsActive(false)
    if (path === rootPage || (path === "/dashboard" && rootPage === "/")) {
      setIsActive(true)
    }
  }, [pathname, path])

  return (
    <MuiListItem>
      <Link href={path}>
        {/* This way I overrode the `a` style without losing its characteristics as a link */}
        <a
          style={{
            font: "inherit",
            color: "inherit",
            textDecoration: "none",
            display: "block",
            width: "100%",
          }}
        >
          <StyledListButton color="blue" selected={isActive}>
            <ListItemIcon>{isActive ? <LightIcon /> : <DarkIcon />}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </StyledListButton>
        </a>
      </Link>
    </MuiListItem>
  )
}

export default ListItem
