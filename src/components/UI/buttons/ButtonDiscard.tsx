/** @jsxImportSource @emotion/react */
import { ButtonBase, ButtonBaseProps } from "@mui/material"
import { css } from "@emotion/react"

const ButtonDiscard: React.FC<ButtonBaseProps> = (props) => {
  return (
    <ButtonBase
      {...props}
      css={(theme: any) => css`
        background: #f3f4f8;
        border: 1px solid ${theme.palette.text.secondary};
        border-radius: ${theme.shape.borderRadius};
        padding: 8px 25px;
        font-size: 20px;
        font-weight: 500;
      `}
    />
  )
}

export default ButtonDiscard
