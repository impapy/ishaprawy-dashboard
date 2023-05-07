import React from "react"
import Modal from "."
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import LoadingButton from "@mui/lab/LoadingButton"
import { Scalars } from "api"

type DialogDeleteProps = {
    open: boolean
    isLoading: boolean
    _id: Scalars['ObjectId']
    title: string
    onOpen: () => void
    onClose: () => void
    handelStudentDlete: () => void
}
const DialogDelete: React.FC<DialogDeleteProps> = ({ _id, open, isLoading, onOpen, onClose, title, handelStudentDlete }) => {
    return (
        <Modal open={open}>
            <Grid spacing={3} container direction="column">
                <Grid item>
                    <Typography variant="h5">Are you sure you want to delete this {title}</Typography>
                </Grid>
                <Grid item alignSelf="flex-end">
                    <Stack spacing={3} direction="row">
                        <Button variant="contained" onClick={onClose} color="secondary">
                            Cancel
                        </Button>
                        <LoadingButton
                            loading={isLoading}
                            loadingPosition="center"
                            variant="contained"
                            color="warning"
                            onClick={() => { handelStudentDlete() }}
                        >
                            Delete
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </Modal>
    )
}
export default DialogDelete
