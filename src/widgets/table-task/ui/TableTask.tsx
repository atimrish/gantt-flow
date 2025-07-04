import {useRootContext} from "@src/app/providers/rootProvider";
import {updateTask} from "@src/features/task/api/updateTask";
import {useThrottle} from "@src/shared/lib/use-throttle";
import ButtonIcon from "@src/shared/ui/assets/images/table-task-button.svg";
import {Typography} from "@src/shared/ui/typography";
import {ContextMenu} from "@src/widgets/context-menu/ui";
import {observer} from "mobx-react";
import {useRef, useState} from "react";
import * as s from "./TableTask.css";
import {useTranslation} from "react-i18next";

type Props = {
	id: IDBValidKey;
};

export const TableTask = observer((p: Props) => {
	const {t} = useTranslation();
	const [contextMenuOpen, setContextMenuOpen] = useState(false);
	const contextMenuPosition = useRef({x: 0, y: 0});

	const {task, notify} = useRootContext();
	const currentTask = task.tasks[p.id.toString()] ?? {};

	const containerRef = useRef<HTMLDivElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);

	let startMoveX = 0;
	let initWidth = 0;
	let initLeft = 0;

	const mutationObserver = new MutationObserver((mutations) => {
		const targetElem = mutations[0].target as HTMLDivElement;
		initLeft = +targetElem.style.left.replaceAll("px", "");
	});

	const updateDate = async (x: number, y: number, key: "start" | "end") => {
		const targetElem = document
			.elementsFromPoint(x, y)
			.find((i) => Boolean(i.attributes.getNamedItem("data-date-string")));

		if (targetElem && currentTask) {
			//обновить
			const targetDate = targetElem.attributes.getNamedItem("data-date-string")!;
			const newDate = targetDate.value;
			await updateTask({...currentTask, [key]: newDate});
			await task.fetch();
			notify.push({
				id: performance.now(),
				type: "success",
				title: t("taskForm.notifies.taskDatesUpdate"),
			});
		}
	};

	const handleMouseUpLeft = (e: MouseEvent) => {
		e.stopPropagation();
		startMoveX = 0;
		initWidth = 0;
		initLeft = 0;
		updateDate(e.clientX, e.clientY, "start");
		document.removeEventListener("mouseup", handleMouseUpLeft, {capture: true});
		document.removeEventListener("mousemove", handleMoveLeft);
	};

	const handleMouseUpRight = (e: MouseEvent) => {
		e.stopPropagation();
		startMoveX = 0;
		initWidth = 0;
		initLeft = 0;
		updateDate(e.clientX, e.clientY, "end");
		document.removeEventListener("mouseup", handleMouseUpRight, {capture: true});
		document.removeEventListener("mousemove", handleMoveRight);
	};

	const handleMoveLeft = useThrottle((e: MouseEvent) => {
		if (parentRef.current) {
			const diff = e.clientX - startMoveX;
			parentRef.current.style.left = initLeft + diff + "px";
			parentRef.current.style.width = initWidth - diff + "px";
		}
	}, 100);

	const handleMoveRight = useThrottle((e: MouseEvent) => {
		if (parentRef.current) {
			parentRef.current.style.width = initWidth + e.clientX - startMoveX + "px";
		}
	}, 100);

	const handleMouseDownLeft = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (e.button === 0) {
			mutationObserver.disconnect();
			startMoveX = e.clientX;
			document.addEventListener("mouseup", handleMouseUpLeft, {capture: true});
			document.addEventListener("mousemove", handleMoveLeft);
		}
	};

	const handleMouseDownRight = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (e.button === 0) {
			startMoveX = e.clientX;
			document.addEventListener("mouseup", handleMouseUpRight, {capture: true});
			document.addEventListener("mousemove", handleMoveRight);
		}
	};

	const callbackRef = (node: HTMLDivElement) => {
		if (node) {
			initWidth = node.clientWidth;
			containerRef.current = node;
			const parent = node.parentNode as HTMLDivElement;
			initLeft = parent.offsetLeft;
			parentRef.current = parent;
			mutationObserver.observe(parent, {attributes: true});
		} else {
			document.removeEventListener("mouseup", handleMouseUpRight);
			document.removeEventListener("mousemove", handleMoveRight);
			document.removeEventListener("mouseup", handleMouseUpLeft);
			document.removeEventListener("mousemove", handleMoveLeft);
			mutationObserver.disconnect();
		}
	};

	return (
		<div
			className={s.container}
			ref={callbackRef}
			onContextMenu={(e) => {
				e.preventDefault();
				contextMenuPosition.current.x = e.clientX;
				contextMenuPosition.current.y = e.clientY;
				setContextMenuOpen(true);
			}}>
			<div
				className={s.back}
				style={{backgroundColor: `color-mix(in oklab, ${currentTask.color}, transparent 60%)`}}
			/>
			<div
				className={s.percent_back}
				style={{
					width: `${currentTask.progress}%`,
					backgroundColor: currentTask.color,
				}}
			/>
			<div className={s.content}>
				<img src={ButtonIcon} alt="" onMouseDown={handleMouseDownLeft} draggable="false" />
				<Typography.Text className={s.text}>{currentTask.name}</Typography.Text>
				<Typography.Text className={s.text}>{currentTask.progress}%</Typography.Text>
				<img src={ButtonIcon} alt="" onMouseDown={handleMouseDownRight} draggable="false" />
			</div>

			<ContextMenu
				open={contextMenuOpen}
				x={contextMenuPosition.current.x}
				y={contextMenuPosition.current.y}
				close={() => setContextMenuOpen(false)}
				id={p.id}
			/>
		</div>
	);
});
