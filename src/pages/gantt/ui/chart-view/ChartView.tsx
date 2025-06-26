import {COLUMN_WIDTH, DEFAULT_OFFSET_X, OUTER_COLUMN_COUNT} from "@src/pages/gantt/config";
import {getChartDate} from "@src/pages/gantt/lib/get-chart-date";
import {getChartLeftDates} from "@src/pages/gantt/lib/get-chart-left-dates";
import {getChartRightDates} from "@src/pages/gantt/lib/get-chart-right-dates";
import {getDefaultDate} from "@src/pages/gantt/lib/get-default-date";
import {setChartElementsOffset} from "@src/pages/gantt/lib/set-chart-elements-offset";
import {ChartDate} from "@src/pages/gantt/model/types";
import {ChartTasks} from "@src/pages/gantt/ui/chart-tasks";
import {useThrottle} from "@src/shared/lib/use-throttle";
import {useEffect, useRef, useState} from "react";
import {ChartHeading} from "../chart-heading";
import * as s from "./ChartView.css";

export const ChartView = () => {
	const viewRef = useRef<HTMLDivElement>(null);
	const headRef = useRef<{elem: HTMLDivElement | null}>(null);
	const chartRef = useRef<HTMLDivElement>(null);
	const isUpdatedDatesRef = useRef<boolean>(false);

	const nowString = new Date().toLocaleDateString("ru-RU");
	let isMouseDown = false;
	let mainMoveX = 0;
	let startMoveX = 0;

	const [dates, setDates] = useState<Array<ChartDate>>([]);

	const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (isMouseDown && headRef.current?.elem && chartRef.current) {
			const relativeMoveX = e.clientX - startMoveX;
			const newOffsetX = DEFAULT_OFFSET_X + mainMoveX + relativeMoveX;

			setChartElementsOffset(headRef.current.elem, chartRef.current, newOffsetX);

			//движение вправо
			if (newOffsetX <= OUTER_COLUMN_COUNT * -2 * COLUMN_WIDTH) {
				setDates([...getChartRightDates(dates, OUTER_COLUMN_COUNT, nowString)]);
				isUpdatedDatesRef.current = true;
			}

			//движение влево
			if (newOffsetX >= 0) {
				setDates([...getChartLeftDates(dates, OUTER_COLUMN_COUNT, nowString)]);
				isUpdatedDatesRef.current = true;
			}
		}
	};

	const throttledMove = useThrottle(handleMove, 15);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		//отлавливаем только левую кнопку мыши
		if (e.button === 0) {
			const dateString = (e.target as HTMLElement).getAttribute("data-date-string");
			if (dateString) {
				isMouseDown = true;
				startMoveX = e.clientX;
			}
		}
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		isMouseDown = false;

		const dateString = (e.target as HTMLElement).getAttribute("data-date-string");

		if (!dateString) {
			return;
		}

		if (isUpdatedDatesRef.current) {
			mainMoveX = 0;
			isUpdatedDatesRef.current = false;
		} else {
			mainMoveX += e.clientX - startMoveX;
		}

		startMoveX = 0;
	};

	useEffect(() => {
		if (viewRef.current && headRef.current?.elem && chartRef.current) {
			const {width} = viewRef.current.getBoundingClientRect();
			const colsCount = Math.ceil(width / COLUMN_WIDTH) + OUTER_COLUMN_COUNT * 2;
			const newDates: Array<ChartDate> = [];
			const leftDate = getDefaultDate(OUTER_COLUMN_COUNT);

			for (let i = 0; i <= colsCount; i++) {
				newDates.push(getChartDate(nowString, leftDate));
				leftDate.setDate(leftDate.getDate() + 1);
			}

			setChartElementsOffset(headRef.current.elem, chartRef.current, DEFAULT_OFFSET_X);
			setDates(newDates);
		}
	}, []);

	useEffect(() => {
		if (headRef.current?.elem && chartRef.current) {
			setChartElementsOffset(headRef.current.elem, chartRef.current, DEFAULT_OFFSET_X);
		}
	}, [dates]);

	return (
		<div className={s.container} ref={viewRef}>
			<ChartHeading dates={dates} ref={headRef} />

			<div
				className={s.chart_body}
				ref={chartRef}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={throttledMove}>
				<ChartTasks dates={dates} />
			</div>
		</div>
	);
};
