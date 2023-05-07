import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import LoadingButton from "@mui/lab/LoadingButton"
import { Scalars } from "api"
import Modal from "components/UI/Modal"

type DialogConfirmProps = {
    open: boolean
    isLoading: boolean
    _id: Scalars['ObjectId']
    confirm: boolean
    onOpen: () => void
    onClose: () => void
    handelStudentConfirm: () => void
}
const DialogConfirm: React.FC<DialogConfirmProps> = ({ _id, open, isLoading, onOpen, onClose, confirm, handelStudentConfirm }) => {
    return (
        <Modal open={open}>
            <Grid spacing={3} container direction="column">
                <Grid item>
                    <Typography variant="h5">Are you sure you want to {confirm ? 'unconfirmed' : 'confirmed'} this Student</Typography>
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
                            onClick={() => { handelStudentConfirm() }}
                        >
                            {confirm ? 'unconfirmed' : 'confirmed'}
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </Modal>
    )
}
export default DialogConfirm
