import {useRootContext} from "@src/app/providers/rootProvider";
import {updateTask} from "@src/features/task/api/updateTask";
import {colors} from "@src/shared/config";
import {Button} from "@src/shared/ui/button";
import {Modal} from "@src/shared/ui/modal";
import {ModalProps} from "@src/shared/ui/modal/Modal";
import {TextInput} from "@src/shared/ui/text-input/TextInput";
import {Textarea} from "@src/shared/ui/textarea/Textarea";
import {Typography} from "@src/shared/ui/typography";
import {DatePicker} from "@src/widgets/date-picker";
import {ITaskForm} from "@src/widgets/task-modal/model";
import {ColorPick} from "@src/widgets/task-modal/ui/color-pick/ColorPick";
import {observer} from "mobx-react";
import {Controller, SubmitErrorHandler, SubmitHandler, useForm, ValidationRule} from "react-hook-form";
import {useTranslation} from "react-i18next";
import * as s from "./TaskModal.css";
import {splitDate} from "../lib/split-date";

type TaskModalProps = {
	modal: ModalProps;
	type: "create" | "update";
	fields?: ITaskForm;
	taskId?: IDBValidKey;
};

export const TaskModal = observer((p: TaskModalProps) => {
	const {t} = useTranslation();
	const {task, notify} = useRootContext();

	const {handleSubmit, control, reset, getValues} = useForm<ITaskForm>({
		defaultValues: p.type === "update" && p.fields && p.taskId ? p.fields : {color: colors.red},
	});

	const onSubmit: SubmitHandler<ITaskForm> = async (data, e) => {
		e?.preventDefault();

		if (p.type === "create") {
			await task.add({
				...data,
				progress: 0,
				completed: false,
			});

			notify.push({
				id: performance.now(),
				type: "success",
				title: t("taskForm.notifies.taskCreated"),
			});
		} else if (p.type === "update" && p.taskId) {
			const currentTask = task.tasks[+p.taskId];
			await updateTask({
				id: p.taskId,
				completed: currentTask.completed,
				progress: currentTask.progress,
				createdAt: currentTask.createdAt,
				...data,
			});

			notify.push({
				id: performance.now(),
				type: "success",
				title: t("taskForm.notifies.taskUpdated"),
			});
		}

		await task.fetch();
		reset();
		p.modal.close();
	};

	const onError: SubmitErrorHandler<ITaskForm> = (errors, e) => {
		e?.preventDefault();
		notify.push({
			id: performance.now(),
			type: "error",
			title: t("taskForm.notifies.formError"),
		});
	};

	const requiredMessage: ValidationRule<boolean> = {
		message: t("taskForm.messages.required"),
		value: true,
	};

	return (
		<Modal close={p.modal.close} open={p.modal.open}>
			<form action="#" onSubmit={handleSubmit(onSubmit, onError)}>
				<label htmlFor="task-name-input">
					<Typography.Text className={s.label}>{t("taskForm.title")}</Typography.Text>
					<Controller
						name={"name"}
						control={control}
						rules={{
							required: requiredMessage,
						}}
						render={({field, fieldState}) => (
							<TextInput
								id="task-name-input"
								placeholder={t("taskForm.inputPlaceholder")}
								value={field.value}
								setValue={field.onChange}
								className={s.text_input}
								invalid={fieldState.invalid}
								ref={(node) => {
									node && p.modal.open && node.focus();
								}}
							/>
						)}
					/>
				</label>

				<div className={s.dates}>
					<div>
						<Typography.Text className={s.label}>{t("taskForm.start")}</Typography.Text>
						<Controller
							name={"start"}
							control={control}
							rules={{
								required: requiredMessage,
								validate: (dateString) => {
									const endDate = getValues("end");
									
									if (!dateString || !endDate) {
										return false;
									}

									const startDateUnix = Date.parse(splitDate(dateString).toString());
									const endDateUnix = Date.parse(splitDate(endDate).toString());
									return endDateUnix >= startDateUnix;
								},
							}}
							render={({field, fieldState}) => (
								<DatePicker
									value={field.value}
									setValue={field.onChange}
									invalid={fieldState.invalid}
								/>
							)}
						/>
					</div>
					<div>
						<Typography.Text className={s.label}>{t("taskForm.end")}</Typography.Text>
						<Controller
							name={"end"}
							control={control}
							rules={{
								required: requiredMessage,
								validate: (dateString) => {
									const startDate = getValues("start");

									if (!dateString || !startDate) {
										return false;
									}

									const endDateUnix = Date.parse(splitDate(dateString).toString());
									const startDateUnix = Date.parse(splitDate(startDate).toString());
									return endDateUnix >= startDateUnix;
								},
							}}
							render={({field, fieldState}) => (
								<DatePicker
									value={field.value}
									setValue={field.onChange}
									invalid={fieldState.invalid}
								/>
							)}
						/>
					</div>
				</div>

				<label htmlFor="task-description-input">
					<Typography.Text className={s.label}>{t("taskForm.description")}</Typography.Text>
					<Controller
						name={"description"}
						control={control}
						render={({field}) => (
							<Textarea
								id="task-description-input"
								value={field.value}
								setValue={field.onChange}
								className={s.textarea}
							/>
						)}
					/>
				</label>

				<div>
					<Typography.Text className={s.label}>{t("taskForm.color")}</Typography.Text>
					<div className={s.color_container}>
						<Controller
							name={"color"}
							control={control}
							render={({field}) => (
								<>
									{Object.values(colors).map((i) => (
										<ColorPick
											value={i}
											checked={i === field.value}
											onChange={field.onChange}
											key={i}
										/>
									))}
								</>
							)}
						/>
					</div>
				</div>
				<Button>{t("taskForm.submitButton." + p.type)}</Button>
			</form>
		</Modal>
	);
});
