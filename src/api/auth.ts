export const getTokens = () => {
  const accessToken = typeof window && window.localStorage.getItem("accessToken")
  const refreshToken = typeof window && window.localStorage.getItem("refreshToken")

  // if (!accessToken || !refreshToken) return null

  return {
    accessToken,
    refreshToken,
  }
}
