import { List } from "@mui/material"

import ListItem from "./ListItem"
import {
  ArtistsDarkIcon,
  ArtistsLightIcon,
  DashboardDarkIcon,
  DashboardLightIcon,
  DesignCanvasesDarkIcon,
  DesignCanvasesLightIcon,
  DesignedProductsDarkIcon,
  DesignedProductsLightIcon,
  DollarSignDarkIcon,
  DollarSignLightIcon,
  GridDarkIcon,
  GridLightIcon,
  InboxDarkIcon,
  InboxLightIcon,
  PackageDarkIcon,
  PackageLightIcon,
  PricingCategoryDarkIcon,
  PricingCategoryLightIcon,
  ShoppingCartDarkIcon,
  ShoppingCartLightIcon,
  IshaprawyCollectionDarkIcon,
  IshaprawyCollectionLightIcon,
  IshaprawyDarkIcon,
  IshaprawyLightIcon,
} from "../../../assets/images/icons"
import { ListItemProps } from "./ListItem/types"

const LIST_ITEMS: ListItemProps[] = [
  {
    lightIcon: DashboardLightIcon,
    darkIcon: DashboardDarkIcon,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    lightIcon: IshaprawyLightIcon,
    darkIcon: IshaprawyDarkIcon,
    label: "Students",
    path: "/students",
  },
  {
    lightIcon: GridLightIcon,
    darkIcon: GridDarkIcon,
    label: "Monthly Exames",
    path: "/monthlyExames",
  },
]

const NavList = () => {
  return (
    <List>
      {LIST_ITEMS.map((listItem) => (
        <ListItem key={listItem.label} {...listItem} />
      ))}
    </List>
  )
}

export default NavList
