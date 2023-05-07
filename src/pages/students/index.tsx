import React, { useState } from "react"
import Layout from "components/UI/Layout"
import Stack from "@mui/material/Stack"
import Box from "@material-ui/core/Box"
import Search from "components/Search"
import Typography from "@mui/material/Typography"
import {
  Scalars,
  Stage,
  StudentsFilterInput,
  useAllStudentsQuery,
  useStudentConfirmeMutation,
  useStudentDeleteMutation,
} from "api"
import SortList from "components/student/SortList"
import Table, { Column } from "components/Table"
import Link from "components/Link"
import { useRouter } from "next/router"
import ErrorAlert from "components/UI/ErrorAlert"
import TableSkeleton from "components/UI/TableSkeleton"
import { TablePagination } from "components/Table/TablePagination"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import { EditIcon, TrashIcon } from "assets/images/icons"
import * as R from "ramda"
import DialogDelete from "components/UI/Modal/DialogDelete"
import { useQueryClient } from "react-query"
import DialogConfirm from "components/student/DialogConfirm"
import Button from "@mui/material/Button"
import { getErrorMsg } from "util/getError"
import { useSnackbar } from "notistack"
import Modal from "components/UI/Modal"
import StudentForm from "components/student/StudentForm"

const styles = {
  search: {
    display: "flex",
  },
  searchBtn: {
    marginLeft: 1,
    backgroundColor: "primary.main",
    color: "#fff",
  },
}
const StudentsPage = () => {
  const columns: Column[] = [
    {
      key: "name",
      label: "Name",
      type: "action",
      payload: ({ row }: any) => {
        return (
          <Link href={"/students/" + row._id} sx={{ textDecoration: "none" }}>
            <Typography color="#000">{row.name}</Typography>
          </Link>
        )
      },
    },
    {
      key: "stage",
      label: "stage",
      type: "text",
    },
    { key: "email", label: "email", type: "text" },
    {
      key: "c",
      label: "isActive",
      type: "action",
      payload: ({ row }: any) => {
        return <StudentConfirm _id={row._id} confirmed={row.isActive} />
      },
    },
    {
      key: "y",
      label: "",
      type: "action",
      payload: ({ row }: any) => {
        return <StudentEdit openmodal={() => handleOpenStudentForm(row._id)} _id={row._id} />
      },
    },
    {
      key: "z",
      label: "",
      type: "action",
      payload: ({ row }: any) => {
        return <StudentDelete _id={row._id} />
      },
    },
  ]

  const router = useRouter()
  const [activeButton, setActiveButton] = useState<Stage[]>()
  const [StudentId, setStudentId] = useState<Scalars["ObjectId"]>()
  const [openStudentForm, setOpenStudentForm] = useState(false)
  const handleOpenStudentForm = (id?: any) => {
    setOpenStudentForm(true)
    setStudentId(id)
  }
  const handleCloseStudentForm = () => {
    setOpenStudentForm(false)
    router.replace({
      query: R.reject(R.isEmpty, { ...R.omit(["p"], router.query), searchTerm: encodeURIComponent("") }),
    })
  }
  let filter: Partial<StudentsFilterInput> = {
    searchTerm: decodeURIComponent(router.query.searchTerm || ""),
    stage: activeButton,
  }
  const { data, isLoading, isError, error } = useAllStudentsQuery(
    {
      input: {
        perPage: 10,
        page: +router.query.p! || 1,
        filter: filter,
      },
    },
    {
      select: (data) => data.students,
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
    <Layout title="Students">
      <Stack justifyContent="space-between" direction="row" mb={3}>
        <Typography fontWeight={600} variant="h5">
          Students
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => handleOpenStudentForm(undefined)}>
          Create new Student
        </Button>
      </Stack>

      <Box sx={styles.search}>
        <Search />
      </Box>

      <SortList setActiveButton={setActiveButton} activeButton={activeButton} />
      <Table columns={columns} rows={data?.nodes as any} />
      <TablePagination count={data!.pageInfo.total} />
      <Modal open={openStudentForm} onClose={handleCloseStudentForm}>
        <StudentForm onClose={handleCloseStudentForm} />
      </Modal>
    </Layout>
  )
}

const StudentEdit: React.FC<{ _id: Scalars["ObjectId"]; openmodal: (id?: any) => void }> = ({ _id, openmodal }) => {
  return (
    <Tooltip title="Edit Student">
      <IconButton aria-label="Edit Student" onClick={() => openmodal(_id)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}

const StudentDelete: React.FC<{ _id: Scalars["ObjectId"] }> = ({ _id }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleClick = () => {
    handleOpen()
  }
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { mutate, isError, isLoading } = useStudentDeleteMutation({
    onSuccess() {
      queryClient.invalidateQueries("AllStudents")
      enqueueSnackbar("Student Deleted Successfully", { variant: "success", autoHideDuration: 6000 })
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
    mutate({ studentId: _id })
  }

  return (
    <>
      <Tooltip title="Delete Student">
        <IconButton aria-label="Delete Student" onClick={handleClick}>
          <TrashIcon />
        </IconButton>
      </Tooltip>

      <DialogDelete
        handelStudentDlete={handelStudentDlete}
        isLoading={isLoading}
        title="Student"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        _id={_id}
      />
    </>
  )
}

const StudentConfirm: React.FC<{ _id: Scalars["ObjectId"]; confirmed: boolean }> = ({ _id, confirmed }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleClick = () => {
    handleOpen()
  }
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { mutate, isError, isLoading } = useStudentConfirmeMutation({
    onSuccess() {
      enqueueSnackbar(`Student ${confirmed ? "unconfirmed" : "confirmed"} Successfully`, {
        variant: "success",
        autoHideDuration: 6000,
      })
      queryClient.invalidateQueries("AllStudents")
      handleClose()
    },
    onError: (error: Error) => {
      enqueueSnackbar(getErrorMsg(error), {
        variant: "error",
        autoHideDuration: 6000,
      })
    },
  })

  const handelStudentStudentConfirme = () => {
    mutate({ studentId: _id })
  }

  return (
    <>
      <Tooltip title={"confirme"}>
        <Button onClick={handleClick}>
          {confirmed ? "confirmed" : <Typography color="red">unconfirmed</Typography>}
        </Button>
      </Tooltip>

      <DialogConfirm
        handelStudentConfirm={handelStudentStudentConfirme}
        isLoading={isLoading}
        confirm={confirmed}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        _id={_id}
      />
    </>
  )
}

export default StudentsPage
