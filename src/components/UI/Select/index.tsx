import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { useField } from "formik"
import { Autocomplete, ChipTypeMap } from "@mui/material"

import Label from "../TextInput/Label"
import { Option, Props } from "./types"

function Select<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
>({
  options,
  placeholder,
  label,
  name,
  onChangeComplete,
  ...rest
}: Props<T, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  const [open, setOpen] = useState(false)
  const [field, meta, helpers] = useField(name)
  const error = meta.touched && meta.error

  return (
    <Stack spacing={1}>
      <Label label={label} />

      <Autocomplete
        limitTags={2}
        {...(rest as any)}
        options={options}
        {...field}
        onChange={(_, enteredInput: any) => {
          let value

          if (rest.multiple) {
            value = enteredInput.map((item: Option | string) => (isOption(item) ? item : createOption(item)))
          } else {
            value = isOption(enteredInput) ? enteredInput : createOption(enteredInput)
          }
          onChangeComplete && onChangeComplete(value)
          helpers.setValue(value)
        }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(enteredInput, prevEnteredInput) => {
          const x = enteredInput.label || enteredInput
          const y = prevEnteredInput.label || prevEnteredInput
          // IF `enteredInput` IS EQUAL TO EACH ONE OF THE `prevEnteredInput` DON'T PUSH IT TO THE ARRAY AS IT IS ALREADY EXIST
          return x === y
        }}
        getOptionLabel={(option) => option.label || option}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              error={!!error}
              helperText={error}
              placeholder={placeholder}
              InputProps={{
                ...params.InputProps,
              }}
            />
          )
        }}
      />
    </Stack>
  )
}

export default Select

/**
 * HELPERS
 */

const createOption = (str: string): Option => ({ label: str, value: str })
const isOption = (x: any): x is Option => typeof x === "object"
