import {Task} from "@src/entities/task/model";
import {ChartDate, TaskToRender} from "@src/pages/gantt/model/types";
import {columnWidth} from "@src/pages/gantt/config";
import {splitDate} from "@src/widgets/create-task-modal/lib/split-date";

export const getTasksToRender = (tasks: Task[], dates: ChartDate[]): Array<TaskToRender> => {
    const tasksToRender: Array<TaskToRender> = []

    tasks.forEach(i => {
        const start = i.start.toLocaleDateString()
        const end = i.end.toLocaleDateString()
        const elemStart = document.querySelector<HTMLDivElement>(`[data-date-string="${start}"]`)
        const elemEnd = document.querySelector<HTMLDivElement>(`[data-date-string="${end}"]`)

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
                left: elemStart.offsetLeft - columnWidth,
                width: elemEnd.offsetLeft - elemStart.offsetLeft + columnWidth,
            })
            return
        }

        const leftDate = splitDate(dates[0].dateString) //краняя левая дата

        const dayMillis = 1000 * 60  * 60 * 24
        const totalDiff = Math.floor((+i.end - +i.start) / dayMillis)

        const leftDiff = Math.floor((+i.start - +leftDate) / dayMillis)

        tasksToRender.push({
            id: i.id,
            progress: i.progress,
            taskName: i.name,
            left: (leftDiff - 1) * columnWidth,
            width: (totalDiff + 1) * columnWidth,
        })

    })

    return tasksToRender
}