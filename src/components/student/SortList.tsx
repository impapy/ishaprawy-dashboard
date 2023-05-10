import {
  Button,
  ButtonGroup,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material"
import { Stage } from "api/api.generated"
import { useRouter } from "next/router"
import React from "react"
import { capitalize } from "util/capitalize"

const commonStyles = {
  fontSize: 14,
  fontWeight: 400,
  padding: 1,
  borderColor: "#F3F4F8",
}
const stages = Object.values(Stage)
const SortList: React.FC<{
  setActiveButton: React.Dispatch<React.SetStateAction<Stage[] | undefined>>
  activeButton?: Stage[]
}> = ({ setActiveButton, activeButton }) => {
  return (
    <Card sx={{ padding: 1, marginTop: 2, marginBottom: 1, width: "98.5%", boxShadow: 0 }}>
      <Stack spacing={3} alignItems="center" direction="row" width="90%">
        <Typography color="text.secondary" fontWeight={400} fontSize="16px" paddingLeft={3}>
          filter By:
        </Typography>
        <ButtonGroup variant="outlined" color="inherit" aria-label="outlined button group" sx={{ maxHeight: 40 }}>
          <Button
            onClick={() => setActiveButton(undefined)}
            sx={{
              ...commonStyles,
              backgroundColor: !activeButton ? "#E5E5E5" : "#FFFFFF",
            }}
          >
            All
          </Button>

          {stages.length &&
            stages.map((stage) => (
              <Button
                key={stage}
                onClick={() => setActiveButton([stage])}
                sx={{
                  ...commonStyles,
                  backgroundColor: activeButton?.length && activeButton[0] === stage ? "#E5E5E5" : "#FFFFFF",
                }}
              >
                {capitalize(stage)}
              </Button>
            ))}
        </ButtonGroup>
      </Stack>
    </Card>
  )
}

export default SortList
