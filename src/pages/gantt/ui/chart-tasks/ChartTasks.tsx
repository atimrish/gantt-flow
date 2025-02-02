import {ChartDate, TaskToRender} from "@src/pages/gantt/model/types";
import {ChartColumn} from "@src/pages/gantt/ui/chart-column";
import * as s from './ChartTasks.css'
import {useRootContext} from "@src/app/providers/rootProvider";
import {observer} from "mobx-react";
import {TableTask} from "@src/widgets/table-task/ui";
import {useEffect, useState} from "react";
import {getTasksToRender} from "@src/pages/gantt/lib/get-tasks-to-render";

type Props = {
    dates: Array<ChartDate>
}
export const ChartTasks = observer((p: Props) => {
    const {task} = useRootContext()
    const [tasksToRender, setTasksToRender] =
        useState<TaskToRender[]>(getTasksToRender(task.tasks, p.dates))

    useEffect(() => {
        if (p.dates.length > 0) {
            setTasksToRender(getTasksToRender(task.tasks, p.dates))
        }
    }, [p.dates]);

    return (
        <div
            className={s.container}
        >
            {
                p.dates.map((i) => <ChartColumn key={i.dateString} dateString={i.dateString}/>)
            }
            {
                tasksToRender.map((i, index) => (
                    <div
                        style={{
                            left: i.left,
                            width: i.width,
                            top: index * 65 + 5,
                            height: 59,
                            position: 'absolute'
                        }}
                        key={i.taskName}
                    >
                        <TableTask id={i.id}/>
                    </div>
                ))
            }
        </div>
    );
})