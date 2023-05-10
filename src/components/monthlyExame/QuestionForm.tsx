import LoadingButton from "@mui/lab/LoadingButton"
import { Stack } from "@mui/material"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Keys, Question, QuestionInput, Scalars, useQuestionAddMutation, useQuestionEditMutation } from "api"
import Select from "components/UI/Select"
import TextInput from "components/UI/TextInput"
import { Form, Formik, FormikHelpers } from "formik"
import { useSnackbar } from "notistack"
import { useQueryClient } from "react-query"
import { getErrorMsg } from "util/getError"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { InputQuestion } from "./interface"

const keys = Object.values(Keys).map((key) => ({ label: key, value: key }))
export interface QuestionFormProps {
  question?: Question
  monthlyExId: Scalars["ObjectId"]
  onClose: () => void
  refetch: () => void
}

const QuestionForm: React.FC<QuestionFormProps> = ({ question, monthlyExId, onClose, refetch }) => {
  const { enqueueSnackbar } = useSnackbar()
  const initialValuesEdit: InputQuestion = {
    label: question?.label as string,
    a: question?.a.value as string,
    b: question?.b.value as string,
    c: question?.c.value as string,
    d: question?.d.value as string,
    result: { label: question?.result.key as Keys, value: question?.result.key as Keys },
    marke: question?.marke as number,
  }
  const initialValuesAdd: InputQuestion = {
    label: "",
    a: "",
    b: "",
    c: "",
    d: "",
    result: { label: Keys.A, value: Keys.A },
    marke: 1,
  }
  const queryClient = useQueryClient()
  const { mutate } = useQuestionAddMutation({
    onError: (error: Error) => {
      enqueueSnackbar(getErrorMsg(error), {
        variant: "error",
        autoHideDuration: 6000,
      })
    },
  })
  const { mutate: mutateEdit } = useQuestionEditMutation({
    onError: (error: Error) => {
      enqueueSnackbar(getErrorMsg(error), {
        variant: "error",
        autoHideDuration: 6000,
      })
    },
  })
  const handleSubmit = async (values: InputQuestion, formikHelpers: FormikHelpers<InputQuestion>) => {
    formikHelpers.setSubmitting(true)
    const questionAdd: QuestionInput = {
      label: values.label,
      a: { value: values.a },
      b: { value: values.b },
      c: { value: values.c },
      d: { value: values.d },
      result: { key: values.result.value as Keys },
      marke: values.marke,
    }
    if (!question)
      return mutate(
        { monthlyExameId: monthlyExId, question: questionAdd },
        {
          onSuccess() {
            enqueueSnackbar("add new question success", {
              variant: "success",
              autoHideDuration: 6000,
            })
            refetch()
            queryClient.invalidateQueries(["MonthlyExame", "AllMonthlyExames"])
            onClose()
          },
          onSettled() {
            formikHelpers.setSubmitting(false)
          },
        },
      )

    return mutateEdit(
      { monthlyExameId: monthlyExId, questionId: question._id, question: questionAdd },
      {
        onSuccess() {
          enqueueSnackbar("edit question success", {
            variant: "success",
            autoHideDuration: 6000,
          })
          refetch()
          queryClient.invalidateQueries(["MonthlyExame", "AllMonthlyExames"])
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
        initialValues={question ? initialValuesEdit : initialValuesAdd}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Typography fontWeight={600} fontSize={24}>
              {question ? "Edit " : "Add New "} Question
            </Typography>

            <Grid item>
              <TextInput name="label" placeholder="Q" label="Question" dir="rtl" multiline rows={1} />
            </Grid>
            <Grid item container spacing={2} mt={1}>
              <Grid xs={5} item>
                <TextInput name="a" placeholder="A" label="A" dir="rtl" />
              </Grid>
              <Grid xs={5} item>
                <TextInput name="b" placeholder="B" label="B" dir="rtl" />
              </Grid>
              <Grid xs={5} item>
                <TextInput name="c" placeholder="C" label="C" dir="rtl" />
              </Grid>
              <Grid xs={5} item>
                <TextInput name="d" placeholder="D" label="D" dir="rtl" />
              </Grid>
            </Grid>

            <Stack justifyContent={"space-between"} justifyItems={"revert"} direction={"row"} mt={3}>
              <Select name="result" options={keys || []} label="result" placeholder="Select result" />

              <TextInput
                name="marke"
                placeholder="marke"
                label="marke"
                dir="rtl"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
              />

              <LoadingButton variant="contained" type="submit" loading={isSubmitting} sx={{ height: 50, marginTop: 3 }}>
                {question ? "Edit " : "Create "} Question
              </LoadingButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default QuestionForm

const validationSchema = z.object({
  label: z.string(),
  a: z.string(),
  b: z.string(),
  c: z.string(),
  d: z.string(),
  result: z.object({ label: z.string().min(1), value: z.string().min(1) }),
  marke: z.number().min(1),
})
