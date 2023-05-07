import { AutocompleteProps, ChipTypeMap } from "@mui/material"

export type Option = {
  label: string
  value: string
}

export type Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
  | "options"
  | "renderInput"
  | "open"
  | "onOpen"
  | "onClose"
  | "loading"
  | "getOptionLabel"
  | "onChange"
  | "isOptionEqualToValue"
> & {
  options: Option[]
  name: string
  label?: string
  onChangeComplete?: (value: any) => void
}
