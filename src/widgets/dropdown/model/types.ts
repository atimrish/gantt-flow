import { ReactNode } from "react"

export type DropdownOption<T extends any> = {
    node: ReactNode,
    value: T
}