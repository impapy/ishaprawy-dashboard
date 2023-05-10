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
  {
    lightIcon: IshaprawyLightIcon,
    darkIcon: IshaprawyDarkIcon,
    label: "Sellers",
    path: "/sellers",
  },
  {
    lightIcon: ArtistsLightIcon,
    darkIcon: ArtistsDarkIcon,
    label: "Artists",
    path: "/artists",
  },
  {
    lightIcon: DollarSignLightIcon,
    darkIcon: DollarSignDarkIcon,
    label: "Financial",
    path: "/financial",
  },
  {
    lightIcon: InboxLightIcon,
    darkIcon: InboxDarkIcon,
    label: "Inventory",
    path: "/inventory",
  },
  {
    lightIcon: PricingCategoryLightIcon,
    darkIcon: PricingCategoryDarkIcon,
    label: "Pricing category",
    path: "/pricing-category",
  },
  {
    lightIcon: DesignedProductsLightIcon,
    darkIcon: DesignedProductsDarkIcon,
    label: "Designed products",
    path: "/designed-products",
  },
  {
    lightIcon: IshaprawyCollectionLightIcon,
    darkIcon: IshaprawyCollectionDarkIcon,
    label: "ishaprawy collection",
    path: "/ishaprawy-collection",
  },
  {
    lightIcon: GridLightIcon,
    darkIcon: GridDarkIcon,
    label: "Categories",
    path: "/categories",
  },
  {
    lightIcon: DesignCanvasesLightIcon,
    darkIcon: DesignCanvasesDarkIcon,
    label: "Design canvases",
    path: "/design-canvases",
  },
  {
    lightIcon: DesignCanvasesLightIcon,
    darkIcon: DesignCanvasesDarkIcon,
    label: "Blog",
    path: "/blog",
  },
  {
    lightIcon: DesignCanvasesLightIcon,
    darkIcon: DesignCanvasesDarkIcon,
    label: "Countries",
    path: "/countries",
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
