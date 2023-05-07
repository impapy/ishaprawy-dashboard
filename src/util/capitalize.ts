export const capitalize = (x: string, separator: string = "_") =>
  x
    .split(separator)
    .map((x) => x.charAt(0).toUpperCase() + x.substring(1).toLowerCase())
    .join(" ")
