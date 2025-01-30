import {Weekdays} from "@src/shared/model/types";

export type ChartDate = {
    date: number
    dateString: string
    weekday: Weekdays,
    currentDate: boolean
}