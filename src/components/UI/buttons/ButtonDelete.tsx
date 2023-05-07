import ReplayIcon from "@mui/icons-material/Replay"
import { Tooltip, IconButton } from "@mui/material"
import { TrashIcon } from "assets/images/icons"

const ButtonDelete = (props: {
  tooltipTitle: string
  "aria-label"?: string
  onDelete: React.MouseEventHandler<HTMLButtonElement>
  isError?: boolean
}) => (
  <Tooltip title={props.tooltipTitle}>
    <IconButton aria-label={props["aria-label"]} onClick={props.onDelete}>
      {props.isError ? <ReplayIcon color="error" /> : <TrashIcon />}
    </IconButton>
  </Tooltip>
)

export default ButtonDelete
