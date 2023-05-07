import React from "react"

interface Props<T> {
  data: T[]
  renderItem: (item: T, idx: number) => JSX.Element
  keyExtractor: (item: T, idx: number) => React.Key
}

// NOTE: THIS COMPONENT FOR SIMPLE MAPPING
const FlattList = <T,>({ data, renderItem, keyExtractor }: Props<T>) => {
  return (
    <>
      {data.map((item, i) => (
        <React.Fragment key={keyExtractor(item, i)}>{renderItem(item, i)}</React.Fragment>
      ))}
    </>
  )
}

export default FlattList
