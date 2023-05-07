import React, { useEffect, useState } from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import ImageGallery from "react-image-gallery"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { NextPage } from "next"
import { Form, Formik } from "formik"
import { Grid, IconButton, InputAdornment, Stack, styled, Typography, useTheme } from "@mui/material"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { useRouter } from "next/router"
import { useLoginMutation } from "api"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { z } from "zod"
import "react-image-gallery/styles/css/image-gallery.css"

import ErrorAlert from "components/UI/ErrorAlert"
import TextInput from "components/UI/TextInput"
import { ArrowRightIcon } from "assets/images/icons"
import { useAuthContext } from "contexts/AuthContext"

const SignIn: NextPage = () => {
  return (
    <Grid container alignItems="center">
      <Grid item flex={1}>
        <Div>
          <ImageGallery
            items={[
              { original: "/picklegum.png", originalWidth: 265, originalHeight: 227 },
              { original: "/ishaprawy.png", originalWidth: 336, originalHeight: 126 },
            ]}
            autoPlay
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
            showBullets
          />
        </Div>
      </Grid>
      <Grid item flex={1}>
        <SignInForm />
      </Grid>
    </Grid>
  )
}

SignIn.displayName = "SignIn"

export default SignIn

const validationSchema = toFormikValidationSchema(
  z.object({
    username: z.string(),
    password: z.string(),
  }),
)

const SPACING = 4

/**
 * Helper components
 */

const SignInForm = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const { mutate, isLoading, isError, error } = useLoginMutation()
  const { login } = useAuthContext()
  const router = useRouter()

  return (
    <Stack
      // spacing={SPACING}
      style={{
        background: theme.palette.common.white,
        padding: theme.spacing(0, SPACING),
      }}
    >
      <ErrorAlert error={error} />
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(credentials, formikHelpers) => {
          mutate(
            { credentials },
            {
              onSuccess(data) {
                //@ts-ignore
                if (data.login.userType === "ADMIN") {
                  //@ts-ignore
                  login(data.login)
                  router.replace("/dashboard")
                } else {
                  setOpen(true)
                }
              },
            },
          )
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Grid container sx={{ height: "100vh" }} direction="column" justifyContent="center" spacing={SPACING}>
              <Grid item>
                <Typography variant="h5">Welcome back</Typography>
              </Grid>
              <Grid item container direction="column" spacing={SPACING}>
                <Grid item>
                  <TextInput name="username" placeholder="Enter username" label="Username" />
                </Grid>

                <Grid item>
                  <PasswordField />
                </Grid>

                <Grid item container justifyContent="center">
                  <LoadingButton variant="contained" type="submit" loading={isLoading}>
                    Sign in <ArrowRightIcon />
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error">The Account must be an admin account to sign in successfully</Alert>
      </Snackbar>
    </Stack>
  )
}

const PasswordField = () => {
  const [show, setShow] = useState(false)

  return (
    <TextInput
      name="password"
      type={show ? "text" : "password"}
      placeholder="Enter password"
      label="Password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setShow((s) => !s)
              }}
            >
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

/**
 * Styled components
 */

const Div = styled("div")(`
   .image-gallery-slide-wrapper.bottom{
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
  }
`)
