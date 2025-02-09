import {Task} from "@src/entities/task/model";
import {ChartDate, TaskToRender} from "@src/pages/gantt/model/types";
import {columnWidth} from "@src/pages/gantt/config";
import {splitDate} from "@src/widgets/create-task-modal/lib/split-date";

export const getTasksToRender = (tasks: Task[], dates: ChartDate[]): Array<TaskToRender> => {
    const tasksToRender: Array<TaskToRender> = []

    tasks.forEach(i => {
        const elemStart = document.querySelector<HTMLDivElement>(`[data-date-string="${i.start}"]`)
        const elemEnd = document.querySelector<HTMLDivElement>(`[data-date-string="${i.end}"]`)

        //если обе даты отображены в таблице
        if (elemStart && elemEnd) {
            //если дата начала и конца совпадают
            if (elemStart === elemEnd) {
                tasksToRender.push({
                    id: i.id,
                    progress: i.progress,
                    taskName: i.name,
                    left: elemStart.offsetLeft,
                    width: columnWidth,
                })
                return
            }

            tasksToRender.push({
                id: i.id,
                progress: i.progress,
                taskName: i.name,
                left: elemStart.offsetLeft,
                width: elemEnd.offsetLeft - elemStart.offsetLeft + columnWidth,
            })
            return
        }

        const leftDate = splitDate(dates[0].dateString) //краняя левая дата
        const dayMillis = 1000 * 60  * 60 * 24
        const startDate = splitDate(i.start)
        const endDate = splitDate(i.end)
        const totalDiff = Math.floor((+endDate - +startDate) / dayMillis)
        const leftDiff = Math.floor((+startDate - +leftDate) / dayMillis)

        tasksToRender.push({
            id: i.id,
            progress: i.progress,
            taskName: i.name,
            left: (leftDiff) * columnWidth,
            width: (totalDiff + 1) * columnWidth,
        })

    })
    return tasksToRender
}