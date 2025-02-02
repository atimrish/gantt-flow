import {CreateTaskData} from "@src/entities/task/api/createTask";
import {getAllTasks} from "@src/entities/task/api/getAllTasks";
import {splitDate} from "@src/widgets/create-task-modal/lib/split-date";

export const validateTaskCreateData = async (data: CreateTaskData): Promise<void> | never => {
    const tasks = await getAllTasks()

    const startDate  = splitDate(data.start)
    const endDate  = splitDate(data.end)

    if (data.name === '' || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Заполните все поля')
    }

    if (tasks.some(i => i.name === data.name)) {
        throw new Error('Задача с таким названием уже существует', {
            cause: 'task_name_exists'
        })
    }

    if (Date.parse(data.start.toString()) >= Date.parse(data.end.toString())) {
        throw new Error('Дата начала должна быть раньше, чем дата окончания задачи', {
            cause: 'task_date_error'
        })
    }
}