import { Stage } from "api"

export const stageAr = (x: Stage) => {
  switch (x) {
    case Stage.First:
      return "الاول"
    case Stage.Second:
      return "الثاني"
    case Stage.Third:
      return "الثالث"
    default:
      return ""
  }
}
