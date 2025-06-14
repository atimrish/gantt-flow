import * as s from "./ChartView.css";
import {Typography} from "@src/shared/ui/typography";
import {TableHeadElement} from "@src/shared/ui/table-head-element/TableHeadElement";
import {useEffect, useRef, useState} from "react";
import {columnWidth, outerColumnsCount} from "@src/pages/gantt/config";
import {getDefaultDate} from "@src/pages/gantt/lib/get-default-date";
import {ChartDate} from "@src/pages/gantt/model/types";
import {getChartDate} from "@src/pages/gantt/lib/get-chart-date";
import {setChartElementsOffset} from "@src/pages/gantt/lib/set-chart-elements-offset";
import {getChartRightDates} from "@src/pages/gantt/lib/get-chart-right-dates";
import {getChartLeftDates} from "@src/pages/gantt/lib/get-chart-left-dates";
import {useThrottle} from "@src/shared/lib/use-throttle";
import {ChartTasks} from "@src/pages/gantt/ui/chart-tasks";
import {splitDate} from "@src/widgets/task-modal/lib/split-date";
import i18n from "@src/app/i18n/i18n";
import {Dropdown} from "@src/widgets/dropdown";
import {useDropdown} from "@src/widgets/dropdown/lib/useDropdown";

type ChartDates = Array<ChartDate>;
const defaultOffsetX = columnWidth * -outerColumnsCount;
const todayTitle = new Date().toLocaleString(i18n.language, {
	month: "long",
	year: "numeric",
});

export const ChartView = () => {
	const viewRef = useRef<HTMLDivElement>(null);
	const headRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<HTMLDivElement>(null);
	const coordinatesRef = useRef<{x: number; y: number}>(null);
	const headTextRef = useRef<HTMLDivElement>(null);
	const isUpdatedDatesRef = useRef<boolean>(false);

	const mutationObserver = new MutationObserver(() => {
		if (coordinatesRef.current && headTextRef.current) {
			const targetElem = document.elementFromPoint(
				coordinatesRef.current.x,
				coordinatesRef.current.y
			) as HTMLDivElement;
			const dateString = targetElem.getAttribute("data-date-string");

			if (dateString) {
				const date = splitDate(dateString);
				headTextRef.current.innerText = date.toLocaleString(i18n.language, {
					month: "long",
					year: "numeric",
				});
			}
		}
	});

	const nowString = new Date().toLocaleDateString("ru-RU");
	let isMouseDown = false;
	let mainMoveX = 0;
	let startMoveX = 0;

	const [dates, setDates] = useState<ChartDates>([]);

	const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (isMouseDown && headRef.current && chartRef.current) {
			const relativeMoveX = e.clientX - startMoveX;
			const newOffsetX = defaultOffsetX + mainMoveX + relativeMoveX;

			setChartElementsOffset(headRef.current, chartRef.current, newOffsetX);

			//движение вправо
			if (newOffsetX <= outerColumnsCount * -2 * columnWidth) {
				setDates([...getChartRightDates(dates, outerColumnsCount, nowString)]);
				isUpdatedDatesRef.current = true;
			}

			//движение влево
			if (newOffsetX >= 0) {
				setDates([...getChartLeftDates(dates, outerColumnsCount, nowString)]);
				isUpdatedDatesRef.current = true;
			}
		}
	};

	const throttledMove = useThrottle(handleMove, 15);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		//отлавливаем только левую кнопку мыши
		if (e.button === 0) {
			isMouseDown = true;
			startMoveX = e.clientX;
		}
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		isMouseDown = false;
		if (isUpdatedDatesRef.current) {
			mainMoveX = 0;
			isUpdatedDatesRef.current = false;
		} else {
			mainMoveX += e.clientX - startMoveX;
		}

		startMoveX = 0;
	};

	useEffect(() => {
		if (viewRef.current && headRef.current && chartRef.current) {
			headTextRef.current = viewRef.current.querySelector<HTMLDivElement>('[data-head-text="true"]');

			const {width} = viewRef.current.getBoundingClientRect();
			const colsCount = Math.ceil(width / columnWidth) + outerColumnsCount * 2;
			const newDates: ChartDates = [];
			const leftDate = getDefaultDate(outerColumnsCount);
			{
				dates.map((i) => (
					<TableHeadElement current={i.currentDate} day={i.weekday} date={i.date} key={i.dateString} />
				));
			}

			for (let i = 0; i <= colsCount; i++) {
				newDates.push(getChartDate(nowString, leftDate));
				leftDate.setDate(leftDate.getDate() + 1);
			}

			mutationObserver.observe(headRef.current, {attributes: true});
			setChartElementsOffset(headRef.current, chartRef.current, defaultOffsetX);
			setDates(newDates);
		}
		return () => {
			mutationObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		if (headRef.current && chartRef.current) {
			setChartElementsOffset(headRef.current, chartRef.current, defaultOffsetX);
		}
	}, [dates]);

	const chartHeadingCallbackRef = (node: HTMLDivElement | null) => {
		if (node) {
			const bounds = node.getBoundingClientRect();
			coordinatesRef.current = {
				x: bounds.x,
				y: bounds.y + 200,
			};
		}
	};

	const dropdownState = useDropdown([
		{
			node: "EN",
			value: "en",
		},
		{
			node: "RU",
			value: "ru",
		},
	]);

	i18n.changeLanguage(dropdownState.options[dropdownState.selectedId].value)

	return (
		<div className={s.container} ref={viewRef}>
			<div className={s.chart_heading_block} ref={chartHeadingCallbackRef}>
				<div className={s.chart_top_heading_block}>
					<Typography.Text className={s.chart_heading_text} data-head-text="true">
						{todayTitle}
					</Typography.Text>

					<Dropdown {...dropdownState} />
				</div>
				<div className={s.chart_heading_dates} ref={headRef}>
					{dates.map((i) => (
						<TableHeadElement current={i.currentDate} day={i.weekday} date={i.date} key={i.dateString} />
					))}
				</div>
			</div>

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
