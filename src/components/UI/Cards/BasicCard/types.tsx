import { ReactNode } from "react"

export interface Props {
  header: string
  value: number
  currency?:string
  footer?:{
    lable:string
    value:number
  }
}
