import { Month } from "api"
import { capitalize } from "./capitalize"

export const monthArEn = (x: Month) => {
  switch (x) {
    case Month.January:
      return capitalize(Month.January) + "يناير"
    case Month.February:
      return capitalize(Month.February) + "فبراير"
    case Month.March:
      return capitalize(Month.March) + "مارس"
    case Month.April:
      return capitalize(Month.April) + "ابريل"
    case Month.May:
      return capitalize(Month.May) + "مايو"
    case Month.June:
      return capitalize(Month.June) + "يونيو"
    case Month.July:
      return capitalize(Month.July) + "يوليو"
    case Month.August:
      return capitalize(Month.August) + "اغسطس"
    case Month.September:
      return capitalize(Month.September) + "سبتمبر"
    case Month.October:
      return capitalize(Month.October) + "اكتوبر"
    case Month.Novemver:
      return capitalize(Month.Novemver) + "نوفمبر"
    case Month.December:
      return capitalize(Month.December) + "ديسمبر"

    default:
      return ""
  }
}
