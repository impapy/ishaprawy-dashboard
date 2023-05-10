import LoadingButton from "@mui/lab/LoadingButton"
import { Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Month, MonthlyExameEditInput, Scalars, Stage, useMonthlyExamEditMutation, useMonthlyExameQuery } from "api"
import Select from "components/UI/Select"
import TextInput from "components/UI/TextInput"
import { Form, Formik, FormikHelpers } from "formik"
import { useSnackbar } from "notistack"
import { useQueryClient } from "react-query"
import { capitalize } from "util/capitalize"
import { getErrorMsg } from "util/getError"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { InputMonthlyExameEdit } from "./interface"
import ErrorAlert from "components/UI/ErrorAlert"
import { FullscreenProgressBar } from "components/UI/FullscreenProgressBar"
import { monthArEn } from "util/monthArEn"

const stages = Object.values(Stage).map((stage) => ({ label: capitalize(stage), value: stage }))
const months = Object.values(Month).map((month) => ({ label: monthArEn(month), value: month }))
export interface QuestionFormProps {
  monthlyExId: Scalars["ObjectId"]
  onClose: () => void
}

const ExameForm: React.FC<QuestionFormProps> = ({ monthlyExId, onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  console.log(months)
  const { data, isLoading, isIdle, isError, error, refetch } = useMonthlyExameQuery(
    { monthlyExameId: monthlyExId },
    { select: (data) => data.monthlyExame },
  )
  const queryClient = useQueryClient()
  const { mutateAsync } = useMonthlyExamEditMutation({
    onError: (error: Error) => {
      enqueueSnackbar(getErrorMsg(error), {
        variant: "error",
        autoHideDuration: 6000,
      })
    },
  })
  if (isError) {
    return <ErrorAlert error={error} />
  }

  if (isLoading || isIdle) {
    return <FullscreenProgressBar />
  }
  const initialValues: InputMonthlyExameEdit = {
    stage: { label: capitalize(data?.stage as Stage), value: data?.stage as Stage },
    month: { label: capitalize(data?.month as Month), value: data?.month as Month },
    solutionExam: data?.solutionExam as string,
  }

  const handleSubmit = async (values: InputMonthlyExameEdit, formikHelpers: FormikHelpers<InputMonthlyExameEdit>) => {
    formikHelpers.setSubmitting(true)

    const inputMonthlyExameEdit: MonthlyExameEditInput = {
      stage: values.stage?.value as Stage,
      month: values.month?.value as Month,
      solutionExam: values.solutionExam,
    }
    mutateAsync(
      { monthlyExameId: monthlyExId, update: inputMonthlyExameEdit },
      {
        onSuccess() {
          enqueueSnackbar("Edit exame success", {
            variant: "success",
            autoHideDuration: 6000,
          })
          refetch()
          queryClient.invalidateQueries(["AllMonthlyExames"])
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
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Typography fontWeight={600} fontSize={24}>
              Edit Exame
            </Typography>

            <Stack justifyContent={"space-between"} spacing={2} mt={1}>
              <Select name="stage" options={stages || []} label="stage" placeholder="Select stage" />
              <Select name="month" options={months || []} label="month" placeholder="Select month" />
              <TextInput name="solutionExam" placeholder="solution Exam Link" label="solution Exam Link" dir="rtl" />
            </Stack>

            <LoadingButton variant="contained" type="submit" loading={isSubmitting} sx={{ height: 50, marginTop: 3 }}>
              Edit
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default ExameForm

const validationSchema = z.object({
  stage: z.object({ label: z.string().min(1), value: z.string().min(1) }),
  month: z.object({ label: z.string().min(1), value: z.string().min(1) }),
  solutionExam: z.string(),
})
