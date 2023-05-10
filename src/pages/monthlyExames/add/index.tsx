import { Card, Grid, Stack, Typography } from "@mui/material"
import Divider from "@mui/material/Divider"
import Layout from "components/UI/Layout"
import TextInput from "components/UI/TextInput"
import AddAnother from "components/monthlyExame/AddAnother"
import { FieldArray, FieldArrayRenderProps, Form, Formik, FormikHelpers } from "formik"
import React from "react"
import { z } from "zod"
import { v4 as uuidv4 } from "uuid"
import Select from "components/UI/Select"
import { Keys, Month, MonthlyExameAddInput, Stage, useMonthlyExamAddMutation } from "api"
import { InputQuestionKey, InputQuestions } from "components/monthlyExame/interface"
import { toFormikValidationSchema } from "zod-formik-adapter"
import LoadingButton from "@mui/lab/LoadingButton"
import { capitalize } from "util/capitalize"
import { monthArEn } from "util/monthArEn"
import { useQueryClient } from "react-query"
import { useSnackbar } from "notistack"
import { getErrorMsg } from "util/getError"
import { useRouter } from "next/router"

const baseQuestion = {
  label: "",
  a: "",
  b: "",
  c: "",
  d: "",
  result: { label: Keys.A, value: Keys.A },
  marke: 1,
  key: uuidv4(),
}
const initialValues = {
  stage: { label: capitalize(Stage.First), value: Stage.First },
  month: { label: capitalize(Month.January), value: Month.January },
  solutionExam: "",
  questions: [baseQuestion],
}

const keys = Object.values(Keys).map((key) => ({ label: key, value: key }))
const stages = Object.values(Stage).map((stage) => ({ label: capitalize(stage), value: stage }))
const months = Object.values(Month).map((month) => ({ label: monthArEn(month), value: month }))
const MonthlyExameAdd = () => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate } = useMonthlyExamAddMutation({
    onError: (error: Error) => {
      enqueueSnackbar(getErrorMsg(error), {
        variant: "error",
        autoHideDuration: 6000,
      })
    },
  })

  const handleSubmit = async (values: InputQuestions, formikHelpers: FormikHelpers<InputQuestions>) => {
    formikHelpers.setSubmitting(true)
    const monthlyExameAddInput: MonthlyExameAddInput = {
      stage: values.stage.value as Stage,
      month: values.month.value as Month,
      solutionExam: values.solutionExam,
      questions: values.questions.map((question) => ({
        label: question.label,
        a: { value: question.a },
        b: { value: question.b },
        c: { value: question.c },
        d: { value: question.d },
        result: { key: question.result.value as Keys },
        marke: question.marke,
      })),
    }
    mutate(
      { input: monthlyExameAddInput },
      {
        onSuccess() {
          enqueueSnackbar("add new monthly Exame success", {
            variant: "success",
            autoHideDuration: 6000,
          })
          queryClient.invalidateQueries("AllMonthlyExames")
          router.push("/monthlyExames")
        },
        onSettled() {
          formikHelpers.setSubmitting(false)
        },
      },
    )
  }
  return (
    <Layout title="New Monthly Exame">
      <Stack justifyContent="space-between" direction="row" mb={3}>
        <Typography fontWeight={600} variant="h5">
          New Monthly Exame
        </Typography>
      </Stack>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(validationSchema)}
      >
        {(formikProps) => (
          <Form>
            <Stack direction={"row"} spacing={4} mt={1}>
              <Select name="stage" options={stages || []} label="stage" placeholder="Select stage" />
              <Select name="month" options={months || []} label="month" placeholder="Select month" />
              <TextInput name="solutionExam" placeholder="solution Exam Link" label="solution Exam Link" dir="rtl" />
            </Stack>
            <QuestionExames values={formikProps.values} />
            <Stack direction={"row"} width={"95%"} justifyContent={"end"}>
              <LoadingButton variant="contained" type="submit" loading={formikProps.isSubmitting}>
                Add
              </LoadingButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

const validationSchema = z.object({
  stage: z.object({ label: z.string().min(1), value: z.string().min(1) }),
  month: z.object({ label: z.string().min(1), value: z.string().min(1) }),
  solutionExam: z.string(),
  questions: z.array(
    z.object({
      label: z.string(),
      a: z.string(),
      b: z.string(),
      c: z.string(),
      d: z.string(),
      result: z.object({ label: z.string().min(1), value: z.string().min(1) }),
      marke: z.number().min(1),
    }),
  ),
})

export default MonthlyExameAdd

const QuestionExames = ({ values }: { values: InputQuestions }) => {
  return (
    <FieldArray name="questions">
      {(helpers) => (
        <Grid item container spacing={2} direction="column">
          {values.questions.map((questions: InputQuestionKey, idx: number) => (
            <QuestionsExame
              len={values.questions.length}
              idx={idx}
              helpers={helpers}
              key={questions.key}
              values={values}
            />
          ))}
        </Grid>
      )}
    </FieldArray>
  )
}

const QuestionsExame = ({
  len,
  idx,
  helpers,
  values,
}: {
  len: number
  idx: number
  values: InputQuestions
  helpers: FieldArrayRenderProps
}) => {
  return (
    <Card variant="outlined" sx={{ width: "100", p: 3, m: 3 }}>
      <TextInput
        name={`questions[${idx}].label`}
        placeholder="Q"
        label={`Question ( ${idx + 1} )`}
        dir="rtl"
        multiline
        rows={1}
      />
      <Grid item container justifyContent={"center"} spacing={1} mt={1}>
        <Grid xs={6} item>
          <TextInput name={`questions[${idx}].a`} placeholder="A" label="A" dir="rtl" />
        </Grid>
        <Grid xs={6} item>
          <TextInput name={`questions[${idx}].b`} placeholder="B" label="B" dir="rtl" />
        </Grid>
        <Grid xs={6} item>
          <TextInput name={`questions[${idx}].c`} placeholder="C" label="C" dir="rtl" />
        </Grid>
        <Grid xs={6} item>
          <TextInput name={`questions[${idx}].d`} placeholder="D" label="D" dir="rtl" />
        </Grid>
        <Grid xs={3} item>
          <Select
            name={`questions[${idx}].result`}
            options={keys || []}
            label="result"
            placeholder="Select result"
            dir="rtl"
          />
        </Grid>
        <Grid xs={3} item>
          <TextInput
            name={`questions[${idx}].marke`}
            placeholder="marke"
            label="marke"
            dir="rtl"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Grid>
      </Grid>

      <AddAnother len={len} idx={idx} helpers={helpers} basValue={baseQuestion} />
    </Card>
  )
}
