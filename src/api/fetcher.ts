import { graphqlClient } from "api/config"
import { getTokens } from "api/auth"

export function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  const tokens = getTokens()

  return async (): Promise<TData> =>
    graphqlClient.request<TData, TVariables>(query, variables, {
      ...(!!tokens && { authorization: `Bearer ${tokens.accessToken}` }),
    })
}
