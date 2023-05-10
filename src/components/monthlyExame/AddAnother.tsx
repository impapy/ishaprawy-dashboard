import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import React from "react"
import AddIcon from "@mui/icons-material/Add"
import { FieldArrayRenderProps } from "formik"
import { Button } from "@mui/material"
import { InputQuestionKey } from "./interface"

const AddAnother: React.FC<{
  len: number
  idx: number
  helpers: FieldArrayRenderProps
  basValue: InputQuestionKey
}> = ({ len, idx, helpers, basValue }) => {
  if (idx === len - 1)
    return (
      <Grid item container spacing={1} mt={1} alignItems={"flex-end"}>
        {len > 1 && <Button onClick={() => helpers.remove(idx)}>Remove</Button>}
        <Grid item>
          <Box p={1} sx={{ display: "flex", cursor: "pointer" }} onClick={() => helpers.push(basValue)}>
            <AddIcon sx={{ color: "#667085", fontSize: 18 }} />
            <Typography sx={{ color: "#667085", fontSize: 14, alignSelf: "center" }}>Add another</Typography>
          </Box>
        </Grid>
      </Grid>
    )
  return (
    <Grid mt={1}>
      <Button onClick={() => helpers.remove(idx)}>Remove</Button>
    </Grid>
  )
}

export default AddAnother
