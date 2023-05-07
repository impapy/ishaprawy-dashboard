import { useAuthContext } from "contexts/AuthContext"
import { useRouter } from "next/router"
import { useEffect } from "react"

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const {
    auth: { isLoggedIn },
  } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    isLoggedIn === false && router.push("/signin")
  }, [isLoggedIn])

  return isLoggedIn ? children : null
}

export default PrivateRoute
