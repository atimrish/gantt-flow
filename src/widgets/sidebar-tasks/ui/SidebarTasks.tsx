import * as s from "./SidebarTasks.css";
import {Typography} from "@src/shared/ui/typography";
import {SidebarTask} from "@src/shared/ui/sidebar-task";
import {observer} from "mobx-react";
import {useRootContext} from "@src/app/providers/rootProvider";
import {useEffect, useState} from "react";
import {PlusIcon} from "@src/pages/gantt/ui/plus-icon/PlusIcon";
import {TaskModal} from "@src/widgets/task-modal/ui";
import {useTranslation} from "react-i18next"

export const SidebarTasks = observer(() => {
	const {t} = useTranslation()
	const {task} = useRootContext();
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		task.fetch();
	}, []);

	return (
		<>
			<div className={s.container}>
				<div className={s.top_block}>
					<Typography.Heading className={s.project_title}>{t('projectTitle')}</Typography.Heading>

					<div className={s.sidebar_heading}>
						<Typography.Text>{t('task')}</Typography.Text>
						<Typography.Text>{t('progress')}</Typography.Text>
					</div>

					<div className={s.overflow_block}>
						{Object.values(task.tasks).map((i) => (
							<SidebarTask taskName={i.name} percent={i.progress} key={i.id.toString()} />
						))}
					</div>
				</div>
				<button className={s.button} onClick={() => setModalOpen(true)}>
					<PlusIcon />
					<Typography.Text>{t('newTaskButton')}</Typography.Text>
				</button>
			</div>
			<TaskModal
                type="create"
				modal={{
					open: modalOpen,
					close: () => setModalOpen(false),
				}}
			/>
		</>
	);
});
