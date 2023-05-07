import React from "react"
import MuiCard from "@mui/material/Card"
import { CardProps } from "@mui/material"

const Card: React.FC<CardProps> = ({ children, sx, ...rest }) => {
  return (
    <MuiCard sx={{ padding: 3, ...sx }} elevation={0} {...rest}>
      {children}
    </MuiCard>
  )
}

export default Card
