import { CheckboxProps } from "@mui/material"

export type Props = Omit<CheckboxProps, "onChange" | "onBlur" | "name" | "value"> & {
  label: string
  name: string
  value: string
}
