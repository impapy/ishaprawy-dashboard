import React from "react"
import createEmotionCache from "helpers/createEmotionCache"
import muiTheme from "styles/muiTheme"
import { AppProps } from "next/app"
import { CacheProvider, ThemeProvider } from "@emotion/react"
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material"
import { EmotionCache } from "@emotion/cache"
import { QueryClient, QueryClientProvider } from "react-query"
import { SnackbarProvider } from "notistack"
import AuthContextProvider from "contexts/AuthContext"
import SignIn from "./signin"
import EnsureLoggedOut from "components/EnsureLoggedOut"
import PrivateRoute from "components/PrivateRoute"

const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={muiTheme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <ThemeProvider theme={muiTheme}>
            <QueryClientProvider client={queryClient}>
              <AuthContextProvider>
                {Component.displayName === SignIn.displayName ? (
                  <EnsureLoggedOut>
                    <Component {...pageProps} />
                  </EnsureLoggedOut>
                ) : (
                  <PrivateRoute>
                    <Component {...pageProps} />
                  </PrivateRoute>
                )}
              </AuthContextProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </SnackbarProvider>
        <CssBaseline />
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
