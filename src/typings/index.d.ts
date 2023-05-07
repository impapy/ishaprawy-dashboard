/**
 * The first and only argument it takes must be a _tuple_
 */
export type StepRange<T, U extends number[] = []> = T["length"] extends U["length"]
  ? U[number]
  : StepRange<T, [...U, U["length"]]>

declare module "querystring" {
  interface ParsedUrlQuery {
    searchTerm?: string
    p?: number
  }
}
