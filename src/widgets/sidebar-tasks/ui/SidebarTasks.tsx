import * as s from './SidebarTasks.css'
import {Typography} from "@src/shared/ui/typography";
import {SidebarTask} from "@src/shared/ui/sidebar-task";
import {observer} from "mobx-react";
import {useRootContext} from "@src/app/providers/rootProvider";
import {useEffect, useState} from "react";
import {PlusIcon} from "@src/pages/gantt/ui/plus-icon/PlusIcon";
import {CreateTaskModal} from "@src/widgets/create-task-modal/ui";

export const SidebarTasks = observer(() => {
    const {task} = useRootContext()
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        task.fetch()
    }, []);

    return (
        <>
            <div className={s.container}>
                <div className={s.top_block}>
                    <Typography.Heading className={s.project_title}>Название проекта</Typography.Heading>

                    <div className={s.sidebar_heading}>
                        <Typography.Text>Задача</Typography.Text>
                        <Typography.Text>Прогресс</Typography.Text>
                    </div>

                    <div className={s.overflow_block}>
                        {
                            task.tasks.map(i => (
                                <SidebarTask
                                    taskName={i.name}
                                    percent={i.progress}
                                    key={i.id.toString()}
                                />
                            ))
                        }

                    </div>
                </div>
                <button
                    className={s.button}
                    onClick={() => setModalOpen(true)}
                >
                    <PlusIcon/>
                    <Typography.Text>Новая задача</Typography.Text>
                </button>
            </div>
            <CreateTaskModal open={modalOpen} close={() => setModalOpen(false)}/>
        </>
    );
})