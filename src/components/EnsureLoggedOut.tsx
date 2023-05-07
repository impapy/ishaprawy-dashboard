import { useAuthContext } from "contexts/AuthContext"
import { useRouter } from "next/router"
import { useEffect } from "react"

const EnsureLoggedOut = ({ children }: { children: JSX.Element }) => {
  const {
    auth: { isLoggedIn },
  } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    isLoggedIn && router.back()
  })

  return isLoggedIn ? null : children
}

export default EnsureLoggedOut
