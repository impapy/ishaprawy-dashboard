import { styled } from "@mui/material/styles"
import { centerAll } from "styles/shared"

export const ModalContentBox = styled("div")(
  ({ theme }) => `
  ${centerAll}
  background: ${theme.palette.common.white};
  width: 809px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing(3)};
  border-radius: ${theme.shape.borderRadius}
`,
)
