import { GraphQLClient } from "graphql-request"

export const graphqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {})

export const SERVER_URL = process.env.NEXT_PUBLIC_API_URL as string
