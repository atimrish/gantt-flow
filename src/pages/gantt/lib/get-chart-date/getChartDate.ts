import {ChartDate} from "@src/pages/gantt/model/types";
import {getWeekday} from "@src/shared/lib/get-weekday";

export const getChartDate = (nowDateString: string, date: Date): ChartDate => ({
    date: date.getDate(),
    dateString: date.toLocaleDateString(),
    weekday: getWeekday(date),
    currentDate: nowDateString === date.toLocaleDateString(),
})