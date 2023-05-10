import {
  Button,
  Chip,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  capitalize,
} from "@mui/material"
import SortRoundedIcon from "@mui/icons-material/SortRounded"
import SouthIcon from "@mui/icons-material/South"
import NorthIcon from "@mui/icons-material/North"
import { FilterIcon } from "assets/images/icons"
import RangeDatePicker from "components/RangeDate"
import Modal from "components/UI/Modal"
import { WhiteButton } from "components/UI/buttons/ButtonBack"
import React, { useState } from "react"
import { FilterProps } from "./interface"
import { Month, Stage } from "api"
import { monthArEn } from "util/monthArEn"

const allStages = Object.values(Stage)
const allMonths = Object.values(Month)

const MonthlyExameFilter: React.FC<FilterProps> = ({ stages, setStages, months, setMonths, onClose }) => {
  const handleChangeStages = (event: SelectChangeEvent<typeof stages>) => {
    const {
      target: { value },
    } = event
    setStages(value as Stage[])
  }
  const handleChangeMonths = (event: SelectChangeEvent<typeof months>) => {
    const {
      target: { value },
    } = event
    setMonths(value as Month[])
  }
  
  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h5" component="h5">
            Filter By
          </Typography>
        </Grid>
        <Stack direction={"column"} spacing={2} p={4}>
          <Grid item>
            <Typography>monthly Exame stages</Typography>
            <Select
              inputProps={{ placeholder: "Select Status" }}
              fullWidth
              multiple
              value={stages || []}
              onChange={handleChangeStages}
              input={<OutlinedInput label="Select Status" />}
            >
              {allStages.map((stage) => (
                <MenuItem key={stage} value={stage}>
                  {capitalize(stage)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Typography>monthly Exame Months</Typography>
            <Select
              inputProps={{ placeholder: "Select Status" }}
              fullWidth
              multiple
              value={months || []}
              onChange={handleChangeMonths}
              input={<OutlinedInput label="Select Status" />}
            >
              {allMonths.map((month) => (
                <MenuItem key={month} value={month}>
                  {monthArEn(month)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Stack>

        <Grid item container justifyContent="center">
          <Grid item>
            <Button variant="contained" onClick={() => onClose()}>
              Apply Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default MonthlyExameFilter
