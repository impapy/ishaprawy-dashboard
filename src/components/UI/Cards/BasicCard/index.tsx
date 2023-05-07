import * as React from "react"
import Typography from "@mui/material/Typography"
import { Props } from "./types"
import { Grid, Stack } from "@mui/material"
import Card from "../Card"

const BasicCard: React.FC<Props> = ({ header, value, currency, footer }) => {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 150, minHeight: 150 }}>
      <Stack spacing={1}>
        <Typography color="text.secondary" fontWeight={400} variant="body1">
          {header}
        </Typography>
        <Typography align="center" fontWeight={600} variant="h4" component="h4">
          {value} {currency}
        </Typography>
        {footer && (
          <Grid container item>
            <Grid item textAlign={"center"} sx={{ fontWeight: "bold" }} xs={6}>
              <Typography fontWeight={500} fontSize={16}>
                {footer?.value}
              </Typography>
            </Grid>
            <Grid item textAlign={"center"} xs={6}>
              <Typography color="text.secondary">{footer?.lable}</Typography>
            </Grid>
          </Grid>
        )}
      </Stack>
    </Card>
  )
}

export default BasicCard
