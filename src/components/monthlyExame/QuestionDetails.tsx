import { Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Choice, Question } from "api"

export interface MonthlyExameDetailsProps {
  onClose: () => void
  question: Question
}

const QuestionDetails: React.FC<MonthlyExameDetailsProps> = ({ onClose, question }) => {
  return (
    <>
      <Typography fontWeight={600} fontSize={24}>
        Question Details
      </Typography>
      <Stack spacing={10} m={2} direction="row">
        <Stack direction="row">
          <Typography fontWeight={500} fontSize={20} color={"red"}>
            {"result :=> "}
          </Typography>
          <Typography fontWeight={500} fontSize={20}>
            {returnKey(question.result as Choice).slice(0, 1)}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography fontWeight={500} fontSize={20} color={"red"}>
            {"marke :=> "}
          </Typography>
          <Typography fontWeight={600} fontSize={20}>
            {question.marke}
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={1} m={3} direction="column">
        <Typography fontWeight={500} fontSize={20}>
          {question.label}
        </Typography>
        <Typography fontWeight={600} fontSize={16}>
          {returnKey(question.a as Choice)}
        </Typography>
        <Typography fontWeight={600} fontSize={16}>
          {returnKey(question.b as Choice)}
        </Typography>
        <Typography fontWeight={600} fontSize={16}>
          {returnKey(question.c as Choice)}
        </Typography>
        <Typography fontWeight={600} fontSize={16}>
          {returnKey(question.d as Choice)}
        </Typography>
      </Stack>
    </>
  )
}
export default QuestionDetails

const returnKey = (n: Choice) => {
  return n.key + ":=> " + n.value
}
