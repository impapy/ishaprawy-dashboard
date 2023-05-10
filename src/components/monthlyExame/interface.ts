import { Keys, Month, Stage } from "api"

export type InputQuestion = {
  label: string
  a: string
  b: string
  c: string
  d: string
  result: { label: string; value: string }
  marke: number
}
export type InputQuestionKey = {
  label: string
  a: string
  b: string
  c: string
  d: string
  result: { label: Keys; value: Keys }
  marke: number
  key: string
}
export type InputQuestions = {
  stage: { label: string; value: Stage }
  month: { label: string; value: Month }
  solutionExam: string
  questions: InputQuestionKey[]
}
export type InputMonthlyExameEdit = {
  stage?: { label: string; value: string }
  month?: { label: string; value: string }
  solutionExam?: string
}

export type FilterProps = {
  stages?: Stage[]
  setStages: React.Dispatch<React.SetStateAction<Stage[] | undefined>>
  months?: Month[]
  setMonths: React.Dispatch<React.SetStateAction<Month[] | undefined>>
  onClose: () => void
}
