import { css, FunctionInterpolation, Theme } from "@emotion/react"
import { Theme as MuiTheme } from "@mui/material"

export const centerAll = `
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const centerHorizontally = css`
  margin-right: auto !important;
  margin-left: auto !important;
`

// THIS IS TEMP!
export const formStyle: FunctionInterpolation<Theme> = (theme) => css`
  background: ${(theme as MuiTheme).palette.common.white};
  border-radius: ${(theme as MuiTheme).shape.borderRadius};
  padding: 2.4rem;
`
