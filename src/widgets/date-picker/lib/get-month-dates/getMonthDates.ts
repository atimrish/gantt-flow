import {getMonthStartDate} from "@src/widgets/date-picker/lib/get-month-start-date";
import {getMonthEndDate} from "@src/widgets/date-picker/lib/get-month-end-date";

export type TMonthDates = Array<{
    date: number,
    currentMonth: boolean,
    currentDate: boolean,
    dateString: string
}>

export const getMonthDates = (currentMonth: number): TMonthDates => {
    const now = new Date()
    const currentDate = now.toDateString()
    now.setMonth(currentMonth, 1)
    const start = getMonthStartDate(now)
    const end = getMonthEndDate(now)
    const dates: TMonthDates = []
    const endDateString = end.toLocaleDateString('ru-RU')
    let startDateString = ''

    while (startDateString !== endDateString) {
        dates.push({
            date: start.getDate(),
            currentMonth: start.getMonth() === currentMonth,
            currentDate: start.toDateString() === currentDate,
            dateString: start.toLocaleDateString('ru-RU')
        })
        start.setDate(start.getDate() + 1)
        startDateString = start.toLocaleDateString('ru-RU')
    }
    dates.push({
        date: start.getDate(),
        currentMonth: start.getMonth() === currentMonth,
        currentDate: start.toDateString() === currentDate,
        dateString: start.toLocaleDateString('ru-RU')
    })
    return dates
}