import { Typography } from "@mui/material"
import { LabelProps } from "./types"

const Label: React.FC<LabelProps> = ({ label }) => {
  return (
    <div>
      <Typography variant="body2">{label}</Typography>
    </div>
  )
}

export default Label
