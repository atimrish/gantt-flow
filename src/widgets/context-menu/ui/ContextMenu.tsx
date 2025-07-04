import * as s from "./ContextMenu.css";
import {Checkbox} from "@src/shared/ui/checkbox";
import {Typography} from "@src/shared/ui/typography";
import EditIcon from "@src/shared/ui/assets/images/edit.svg";
import ColorIcon from "@src/shared/ui/assets/images/color.svg";
import ProgressIcon from "@src/shared/ui/assets/images/progress.svg";
import DeleteIcon from "@src/shared/ui/assets/images/delete.svg";
import NextIcon from "@src/shared/ui/assets/images/next.svg";
import {classes} from "@src/shared/lib/classes";
import {colors} from "@src/shared/config";
import {createPortal} from "react-dom";
import {ReactNode, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useRootContext} from "@src/app/providers/rootProvider";
import {Task} from "@src/entities/task/model";
import {updateTask} from "@src/features/task/api/updateTask";
import {TaskModal} from "@src/widgets/task-modal/ui";
import {useTranslation} from "react-i18next";

type Props = {
	x: number;
	y: number;
	open: boolean;
	close: () => void;
	id: IDBValidKey;
};

export const ContextMenu = observer((p: Props) => {
	const {t} = useTranslation();
	const {task} = useRootContext();
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const currentTask = task.tasks[p.id.toString()] ?? {};
	const progressButtons: ReactNode[] = [];
	for (let i = 10; i <= 100; i += 10) {
		progressButtons.push(
			<Typography.Text onClick={() => updateTaskProp("progress", i)} className={s.progress} key={i}>
				{i}%
			</Typography.Text>
		);
	}

	const updateTaskProp = async (key: keyof Task, value: Task[keyof Task]) => {
		await updateTask({...currentTask, [key]: value});
		await task.fetch();
	};

	useEffect(() => {
		const handleClose = () => p.close();
		document.addEventListener("click", handleClose);
		return () => document.removeEventListener("click", handleClose);
	}, []);

	return (
		p.open &&
		createPortal(
			<div
				style={{
					position: "absolute",
					top: p.y,
					left: p.x,
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<div
					className={s.container}
					style={{
						display: updateModalOpen ? "none" : "block",
					}}>
					<div className={s.top_block}>
						<Checkbox
							checked={currentTask.completed}
							setChecked={async () => {
								await updateTaskProp("completed", !currentTask.completed);
								await task.fetch();
							}}
						/>
						<Typography.Text className={s.font_size}>{t("contextMenu.completed")}</Typography.Text>
					</div>

					<div className={s.bottom_block} onClick={() => setUpdateModalOpen(true)}>
						<TaskModal
							type="update"
							modal={{
								open: updateModalOpen,
								close: () => {
									setUpdateModalOpen(false);
									p.close();
								},
							}}
							fields={{
								start: currentTask.start,
								end: currentTask.end,
								description: currentTask.description ?? "",
								name: currentTask.name,
								color: currentTask.color ?? "",
							}}
							taskId={p.id}
						/>
						<img src={EditIcon} alt="" />
						<Typography.Text className={s.font_size}>{t("contextMenu.edit")}</Typography.Text>
					</div>

					<div className={classes(s.bottom_block, s.submenu_trigger)}>
						<img src={ColorIcon} alt="" />
						<Typography.Text className={s.font_size}>{t("contextMenu.color")}</Typography.Text>
						<img className={s.next_icon} src={NextIcon} alt="" />

						<div className={s.submenu}>
							<div className={s.color_picker}>
								{Object.values(colors).map((i) => (
									<div
										onClick={() => updateTaskProp("color", i)}
										className={s.circle}
										style={{backgroundColor: i}}
										key={i}
									/>
								))}
							</div>
						</div>
					</div>

					<div className={classes(s.bottom_block, s.submenu_trigger)}>
						<img src={ProgressIcon} alt="" />
						<Typography.Text className={s.font_size}>{t("contextMenu.progress")}</Typography.Text>
						<img className={s.next_icon} src={NextIcon} alt="" />

						<div className={s.submenu}>
							<div className={s.progress_picker}>{progressButtons}</div>
						</div>
					</div>

					<div
						className={s.bottom_block}
						onClick={async () => {
							await task.delete(+p.id);
							await task.fetch();
						}}>
						<img src={DeleteIcon} alt="" />
						<Typography.Text className={s.font_size}>{t("contextMenu.delete")}</Typography.Text>
					</div>
				</div>
			</div>,
			document.getElementById("context-menu-portal")!
		)
	);
});
