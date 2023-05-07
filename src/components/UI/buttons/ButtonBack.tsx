/** @jsxImportSource @emotion/react */
import { Box, Button, ButtonBase, styled } from "@mui/material"

import { ArrowBackIcon } from "assets/images/icons"
import { useRouter } from "next/router"

export const WhiteButton = styled(ButtonBase)(
  ({ theme }) => `
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    background: ${theme.palette.common.white};
    border-radius: ${theme.shape.borderRadius}
  `,
)

const ButtonBack = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }
  return (
    <WhiteButton onClick={handleClick}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "2.5rem", width: "2.5rem" }}>
        <ArrowBackIcon />
      </Box>
    </WhiteButton>
  )
}

export default ButtonBack
