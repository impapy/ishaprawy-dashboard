import { ListItemButton, styled } from "@mui/material"

export const StyledListButton = styled(ListItemButton)(
  ({ theme }) => `
    border-radius: ${theme.shape.borderRadius};
    font-weight: ${theme.typography.fontWeightMedium};

    &.Mui-selected, &.Mui-selected:hover {
      background-color: ${theme.palette.primary.main};
    }

    & span[class^="MuiTypography-root"] {
      font-weight: ${theme.typography.fontWeightMedium};
    }

    & div[class^="MuiListItemIcon-root"] {
      min-width: 32px
    }

    &.Mui-selected  span[class^="MuiTypography-root"] {
      color: ${theme.palette.common.white};
    }

`,
)
