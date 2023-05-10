import { Button, IconButton, Tooltip, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { Question, Scalars, useMonthlyExameQuery, useQuestionRemoveMutation } from "api"
import { EditIcon, TrashIcon } from "assets/images/icons"
import Link from "components/Link"
import Table, { Column } from "components/Table"
import ErrorAlert from "components/UI/ErrorAlert"
import Layout from "components/UI/Layout"
import Modal from "components/UI/Modal"
import DialogDelete from "components/UI/Modal/DialogDelete"
import TableSkeleton from "components/UI/TableSkeleton"
import QuestionDetails from "components/monthlyExame/QuestionDetails"
import QuestionForm from "components/monthlyExame/QuestionForm"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { useQueryClient } from "react-query"
import { capitalize } from "util/capitalize"
import { getErrorMsg } from "util/getError"

const MonthlyExame = () => {
  const {
    query: { monthlyExId },
  } = useRouter()
  const columns: Column[] = [
    {
      key: "label",
      label: "Question",
      type: "text",
      format: (_, row: any) => {
        return (
          <Typography
            fontWeight={500}
            component="h4"
            sx={{ cursor: "pointer" }}
            onClick={() => handelOpenQuestion(row)}
          >
            {cliceText(row.label as string)}
          </Typography>
        )
      },
    },
    {
      key: "a.value",
      label: "A",
      type: "text",
      format: (col: any) => {
        return cliceText(col as string)
      },
    },
    {
      key: "b.value",
      label: "B",
      type: "text",
      format: (col: any) => {
        return cliceText(col as string)
      },
    },
    {
      key: "c.value",
      label: "C",
      type: "text",
      format: (col: any) => {
        return cliceText(col as string)
      },
    },
    {
      key: "d.value",
      label: "D",
      type: "text",
      format: (col: any) => {
        return cliceText(col as string)
      },
    },
    {
      key: "marke",
      label: "marke",
      type: "text",
    },
    {
      key: "result.key",
      label: "result",
      type: "text",
    },
    {
      key: "y",
      label: "",
      type: "action",
      payload: ({ row }: any) => {
        return (
          <QuestionEdit
            openmodal={() => handelOpenQuestionForm(row)}
            question={question as Question}
            monthlyExId={monthlyExId}
          />
        )
      },
    },
    {
      key: "z",
      label: "",
      type: "action",
      payload: ({ row }: any) => {
        return <QuestionDelete refetch={refetch} monthlyExId={monthlyExId} _id={row._id} />
      },
    },
  ]

  const [question, setQuestion] = useState<Question>()
  const [openQuestion, setOpenQuestion] = useState<boolean>(false)
  const handelOpenQuestion = (question: Question) => {
    setQuestion(question)
    setOpenQuestion(true)
  }

  const [openQuestionForm, setOpenQuestionForm] = useState<boolean>(false)
  const handelOpenQuestionForm = (question?: Question) => {
    setOpenQuestionForm(true)
    setQuestion(question)
  }
  const handelCloseQuestionForm = () => {
    setOpenQuestionForm(false)
    setQuestion(undefined)
  }

  const { data, isLoading, isIdle, isError, error, refetch } = useMonthlyExameQuery(
    { monthlyExameId: monthlyExId },
    { select: (data) => data.monthlyExame },
  )
  if (isError) {
    return <ErrorAlert error={error} />
  }

  if (isLoading || isIdle) {
    return (
      <TableSkeleton columns={columns} rows={[{ _id: "1" }, { _id: "2" }, { _id: "3" }, { _id: "4" }, { _id: "5" }]} />
    )
  }
  return (
    <Layout title="monthlyExame">
      <Stack justifyContent="space-between" direction="row" mb={3}>
        <Typography fontWeight={600} variant="h5">
          monthly Exame
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => handelOpenQuestionForm(undefined)}>
          Add Question
        </Button>
      </Stack>

      <Stack justifyContent="space-between" m={5} alignItems="center" direction="row" width={"90%"}>
        <Stack direction="row" spacing={2}>
          <Typography color="text.secondary" fontWeight={400} variant="body1">
            stage:
          </Typography>
          <Typography fontWeight={500} component="h4">
            {capitalize(data?.stage as string)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography color="text.secondary" fontWeight={400} variant="body1">
            month:
          </Typography>
          <Typography fontWeight={500} component="h4">
            {capitalize(data?.month as string)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography color="text.secondary" fontWeight={400} variant="body1">
            solution Link:
          </Typography>
          <Link href={data?.solutionExam as string} sx={{ textDecoration: "none" }}>
            <Typography fontWeight={500} component="h4">
              solution Exam
            </Typography>
          </Link>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography color="text.secondary" fontWeight={400} variant="body1">
            Marke:
          </Typography>
          <Typography fontWeight={500} component="h4">
            {data?.examMarke}
          </Typography>
        </Stack>
      </Stack>
      <Table columns={columns} rows={data?.questions as any} />

      <Modal open={openQuestion} onClose={() => setOpenQuestion(false)}>
        <QuestionDetails onClose={() => setOpenQuestion(false)} question={question as Question} />
      </Modal>

      <Modal open={openQuestionForm} onClose={handelCloseQuestionForm}>
        <QuestionForm
          question={question}
          refetch={refetch}
          monthlyExId={monthlyExId}
          onClose={handelCloseQuestionForm}
        />
      </Modal>
    </Layout>
  )
}

export default MonthlyExame

const cliceText = (text: string) => {
  if (text.length > 6) return text.slice(0, 6) + "..."
  return text.slice(0, 6)
}

const QuestionEdit: React.FC<{
  question: Question
  monthlyExId: Scalars["ObjectId"]
  openmodal: (question?: Question) => void
}> = ({ question, openmodal }) => {
  return (
    <Tooltip title="Edit Question">
      <IconButton aria-label="Edit Question" onClick={() => openmodal(question)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}

const QuestionDelete: React.FC<{ refetch: () => void; monthlyExId: Scalars["ObjectId"]; _id: Scalars["ObjectId"] }> = ({
  monthlyExId,
  _id,
  refetch,
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleClick = () => {
    handleOpen()
  }
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { mutate, isError, isLoading } = useQuestionRemoveMutation({
    onSuccess() {
      refetch()
      queryClient.invalidateQueries(["MonthlyExame", { monthlyExameId: monthlyExId }, "AllMonthlyExames"])
      enqueueSnackbar("Question Removeed Successfully", { variant: "success", autoHideDuration: 6000 })
      handleClose()
    },
    onError: (error: Error) => {
      enqueueSnackbar(getErrorMsg(error), {
        variant: "error",
        autoHideDuration: 6000,
      })
    },
  })

  const handelStudentDlete = () => {
    mutate({ monthlyExameId: monthlyExId, questionId: _id })
  }

  return (
    <>
      <Tooltip title="Delete Question">
        <IconButton aria-label="Delete Question" onClick={handleClick}>
          <TrashIcon />
        </IconButton>
      </Tooltip>

      <DialogDelete
        handelStudentDlete={handelStudentDlete}
        isLoading={false}
        title="Question"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        _id={_id}
      />
    </>
  )
}
