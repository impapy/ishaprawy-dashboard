import LoadingButton from "@mui/lab/LoadingButton"
import { Alert, Snackbar } from "@mui/material"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Scalars, Stage, StudentAddInput, useStudentAddMutation } from "api"
import Select from "components/UI/Select"
import TextInput from "components/UI/TextInput"
import { Form, Formik, FormikHelpers } from "formik"
import { useSnackbar } from "notistack"
import * as R from "ramda"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { capitalize } from "util/capitalize"
import { getErrorMsg } from "util/getError"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"

const phoneRegex = /^01[0125][0-9]{8}$/
const stages = Object.values(Stage)
  .filter((stage) => stage != Stage.Assistant)
  .map((stage: Stage) => ({ label: capitalize(stage), value: stage as string }))

export interface StudentFormProps {
  studentId?: Scalars["ObjectId"]
  onClose: () => void
}

const StudentForm: React.FC<StudentFormProps> = ({ studentId, onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [initialPassword, setInitialPassword] = useState<string>(Math.random().toString(36).slice(-8))
  
  const initialValuesAdd: StudentAddInput = {
    name: "",
    email: "",
    password: initialPassword,
    phone: "",
    stage: Stage.First,
  }
  const queryClient = useQueryClient()
  const { mutate } = useStudentAddMutation({
    onError: (error: Error) => {
      enqueueSnackbar(getErrorMsg(error), {
        variant: "error",
        autoHideDuration: 6000,
      })
    },
  })
  const handleSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    formikHelpers.setSubmitting(true)
    const StudentInput: any = await { ...values }
    StudentInput.stage = await (R.isNil, values.stage.value)
    console.log(StudentInput)
    mutate(
      { input: StudentInput as StudentAddInput },
      {
        onSuccess() {
          enqueueSnackbar("add new user success", {
            variant: "success",
            autoHideDuration: 6000,
          })
          queryClient.invalidateQueries("AllStudents")
          onClose()
        },
        onSettled() {
          formikHelpers.setSubmitting(false)
        },
      },
    )
  }

  return (
    <>
      <Formik
        initialValues={initialValuesAdd}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Typography fontWeight={600} fontSize={24}>
              {studentId ? "Edit" : "Creat New"} Student
            </Typography>

            <Grid xs={9} item>
              <TextInput name="name" placeholder="Enter Student name" label="Student name" />
            </Grid>

            <Grid item mt={2}>
              <TextInput name="email" placeholder="Enter email" label="email" />
            </Grid>
            <Grid item mt={2}>
              <TextInput name="password" placeholder="Enter password" label="password" />
            </Grid>
            <Grid item mt={2}>
              <TextInput name="phone" placeholder="Enter phone" label="phone" type="phone" />
            </Grid>
            <Grid item mt={2}>
              <Select name="stage" options={stages || []} label="stage" placeholder="Select stages" />
            </Grid>
            <Grid item container justifyContent="center" mt={2}>
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                {studentId ? "Edit Student" : "Create Student"}
              </LoadingButton>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default StudentForm

const validationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(30),
  phone: z.string().regex(phoneRegex, "Phone number should be at least 11 digits"),
  stage: z.object({ label: z.string().min(1), value: z.string().min(1) }),
})
