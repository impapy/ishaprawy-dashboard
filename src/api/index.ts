import { getSdk, Sdk } from "api/api.generated"
import { graphqlClient } from "api/config"

export * from "./api.generated"

export const sdk: Sdk = getSdk(graphqlClient)
