import {splitDate} from "@src/widgets/create-task-modal/lib/split-date";
import {getChartDate} from "@src/pages/gantt/lib/get-chart-date";
import {ChartDate} from "@src/pages/gantt/model/types";

export const getChartLeftDates = (dates: Array<ChartDate>, count :number, nowString: string): Array<ChartDate> => {
    const firstDate = splitDate(dates[0].dateString)
    for (let i = 0; i < count; i++) {
        firstDate.setDate(firstDate.getDate() -1)
        dates.unshift(getChartDate(nowString, firstDate))
        dates.pop()
    }
    return dates
}