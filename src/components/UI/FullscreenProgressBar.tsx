import { LinearProgress } from "@mui/material"
import { useState, useEffect } from "react"
import ReactDOM from "react-dom"

export const FullscreenProgressBar = () => {
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => {
    setIsBrowser(true)
  }, [])
  if (!isBrowser) return null
  return ReactDOM.createPortal(<LinearProgress />, document.getElementById("progress-bar")!)
}
