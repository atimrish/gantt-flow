import {Weekdays} from "@src/shared/model/types";

export type ChartDate = {
    date: number
    dateString: string
    weekday: Weekdays,
    currentDate: boolean
}

export type TaskToRender = {
    id: IDBValidKey,
    taskName: string,
    progress: number,
    left: number,
    width: number,
}