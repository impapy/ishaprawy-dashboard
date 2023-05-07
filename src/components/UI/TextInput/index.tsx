import { Stack, TextField } from "@mui/material"
import { useField } from "formik"
import Label from "./Label"
import { Props } from "./types"

const TextInput: React.FC<Props> = ({ name, label, ...rest }) => {
  const [field, meta] = useField(name)
  const error = meta.touched && meta.error

  return (
    <Stack spacing={1}>
      <Label label={label} />
      <TextField {...rest} {...field} error={!!error} helperText={error || rest.helperText} />
    </Stack>
  )
}

export default TextInput
