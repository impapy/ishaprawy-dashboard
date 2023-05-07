import React from "react"
import MuiCheckbox from "@mui/material/Checkbox"
import { FormControlLabel } from "@mui/material"
import { useField } from "formik"
import { Props } from "./types"

const Checkbox: React.FC<Props> = ({ name, label, ...rest }) => {
  const [field, meta, helpers] = useField(name)
  const hasError = !!(meta.touched && meta.error)

  return (
    <div>
      <FormControlLabel
        sx={
          hasError
            ? (theme) => ({
                "& .MuiFormControlLabel-label": {
                  color: theme.palette.error.main,
                },
                "& .MuiCheckbox-root": {
                  color: theme.palette.error.main,
                },
              })
            : {}
        }
        label={label}
        control={
          <MuiCheckbox {...field} {...rest} defaultChecked={rest.defaultChecked ?? field.value.includes(rest.value)} />
        }
      />
    </div>
  )
}

export default Checkbox
