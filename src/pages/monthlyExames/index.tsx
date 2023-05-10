import React, { useEffect, useMemo, useState } from "react"
import Layout from "components/UI/Layout"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Table, { Column } from "components/Table"
import Link from "components/Link"
import {
  Month,
  MonthlyExamesFilterInput,
  Scalars,
  Stage,
  useAllMonthlyExamesQuery,
  useMonthlyExamDeleteMutation,
} from "api"
import { useRouter } from "next/router"
import ErrorAlert from "components/UI/ErrorAlert"
import TableSkeleton from "components/UI/TableSkeleton"
import { TablePagination } from "components/Table/TablePagination"
import { capitalize } from "util/capitalize"
import { Chip, IconButton, Tooltip } from "@mui/material"
import { EditIcon, FilterIcon, TrashIcon } from "assets/images/icons"
import Modal from "components/UI/Modal"
import ExameForm from "components/monthlyExame/ExameForm"
import { useSnackbar } from "notistack"
import { useQueryClient } from "react-query"
import { getErrorMsg } from "util/getError"
import DialogDelete from "components/UI/Modal/DialogDelete"
import { WhiteButton } from "components/UI/buttons/ButtonBack"
import MonthlyExameFilter from "components/monthlyExame/monthlyExameFilter"

const MonthlyExames = () => {
  const router = useRouter()
  const [openFilter, setOpenFilter] = useState(false)
  const [stages, setStages] = useState<Stage[]>()
  const [months, setMonths] = useState<Month[]>()

  const columns: Column[] = [
    {
      key: "_id",
      label: "monthId",
      type: "text",
      format: (col: any) => {
        return (
          <Link href={"/monthlyExames/" + col} sx={{ textDecoration: "none" }}>
            <Typography color="#000">{col}</Typography>
          </Link>
        )
      },
    },
    {
      key: "stage",
      label: "stage",
      type: "text",
      format: (col: any) => {
        return capitalize(col as string)
      },
    },
    {
      key: "month",
      label: "month",
      type: "text",
      format: (col: any) => {
        return capitalize(col as string)
      },
    },
    { key: "solutionExam", label: "solution Exam", type: "text" },
    { key: "examMarke", label: "Marke", type: "text" },
    {
      key: "questions",
      label: "number of question",
      type: "text",
      format: (col: any) => {
        return col.length
      },
    },
    {
      key: "y",
      label: "",
      type: "action",
      payload: ({ row }: any) => {
        return <ExameEdit openmodal={() => handelOpenExameForm(row._id)} monthlyExId={row._id} />
      },
    },
    {
      key: "z",
      label: "",
      type: "action",
      payload: ({ row }: any) => {
        return <MonthlyExameDelete _id={row._id} />
      },
    },
  ]
  const [exId, setExId] = useState<Scalars["ObjectId"]>()
  const [openExameForm, setOpenExameForm] = useState<boolean>(false)
  const handelOpenExameForm = (id: Scalars["ObjectId"]) => {
    setOpenExameForm(true)
    setExId(id)
  }
  const handelCloseExameForm = () => {
    setOpenExameForm(false)
    setExId(undefined)
  }
  let filter: Partial<MonthlyExamesFilterInput> = {
    ...(stages?.length && { stage: stages }),
    ...(months?.length && { month: months }),
  }
  const { data, isLoading, isError, error } = useAllMonthlyExamesQuery(
    {
      input: {
        perPage: 10,
        page: +router.query.p! || 1,
        filter,
      },
    },
    {
      select: (data) => data.monthlyExames,
      keepPreviousData: true,
    },
  )

  if (isError) {
    return <ErrorAlert error={error} />
  }

  if (isLoading) {
    return (
      <TableSkeleton columns={columns} rows={[{ _id: "1" }, { _id: "2" }, { _id: "3" }, { _id: "4" }, { _id: "5" }]} />
    )
  }
  return (
    <Layout title="All monthlyExames">
      <Stack justifyContent="space-between" direction="row" mb={3}>
        <Typography fontWeight={600} variant="h5">
          monthly Exames
        </Typography>
        <Link
          href="/monthlyExames/add"
          style={{
            font: "inherit",
            color: "inherit",
            textDecoration: "none",
            display: "block",
          }}
        >
          <Button variant="contained" color="secondary">
            Create new monthly Exame
          </Button>
        </Link>
      </Stack>

      <Stack direction="row" spacing={2}>
        <WhiteButton onClick={() => setOpenFilter(true)}>
          <Stack direction="row" spacing={2} sx={{ py: 1, px: 2 }} alignItems="center">
            <FilterIcon />
            <Typography>Filters</Typography>
            <Chip color="primary" label={Object.values(filter).length} />
          </Stack>
        </WhiteButton>
      </Stack>

      <Table columns={columns} rows={data?.nodes as any} />
      <TablePagination count={data!.pageInfo.total} />

      <Modal open={openExameForm} onClose={handelCloseExameForm}>
        <ExameForm monthlyExId={exId} onClose={handelCloseExameForm} />
      </Modal>

      <Modal open={openFilter} onClose={() => setOpenFilter(false)}>
        <MonthlyExameFilter
          stages={stages}
          setStages={setStages}
          months={months}
          setMonths={setMonths}
          onClose={() => setOpenFilter(false)}
        />
      </Modal>
    </Layout>
  )
}

export default MonthlyExames

const ExameEdit: React.FC<{
  monthlyExId: Scalars["ObjectId"]
  openmodal: (id: Scalars["ObjectId"]) => void
}> = ({ monthlyExId, openmodal }) => {
  return (
    <Tooltip title="Edit Exame">
      <IconButton aria-label="Edit Exame" onClick={() => openmodal(monthlyExId)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}

const MonthlyExameDelete: React.FC<{ _id: Scalars["ObjectId"] }> = ({ _id }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleClick = () => {
    handleOpen()
  }
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { mutate, isError, isLoading } = useMonthlyExamDeleteMutation({
    onSuccess() {
      queryClient.invalidateQueries("AllMonthlyExames")
      enqueueSnackbar("Monthly Exame Deleted Successfully", { variant: "success", autoHideDuration: 6000 })
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
    mutate({ monthlyExameId: _id })
  }

  return (
    <>
      <Tooltip title="Delete Monthly Exame">
        <IconButton aria-label="Delete Monthly Exame" onClick={handleClick}>
          <TrashIcon />
        </IconButton>
      </Tooltip>

      <DialogDelete
        handelStudentDlete={handelStudentDlete}
        isLoading={isLoading}
        title="Monthly Exame"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        _id={_id}
      />
    </>
  )
}
