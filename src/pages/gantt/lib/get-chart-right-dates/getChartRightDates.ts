import {ChartDate} from "@src/pages/gantt/model/types";
import {splitDate} from "@src/widgets/task-modal/lib/split-date";
import {getChartDate} from "@src/pages/gantt/lib/get-chart-date";

export const getChartRightDates = (dates: Array<ChartDate>, count :number, nowString: string): Array<ChartDate> => {
    const lastDate = splitDate(dates[dates.length - 1].dateString)
    for (let i = 0; i < count; i++) {
        lastDate.setDate(lastDate.getDate() + 1)
        dates.push(getChartDate(nowString, lastDate))
        dates.shift()
    }
    return dates;
}