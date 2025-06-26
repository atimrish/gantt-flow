import i18n from "@src/app/i18n/i18n";
import {TableHeadElement} from "@src/shared/ui/table-head-element";
import {Typography} from "@src/shared/ui/typography";
import {Dropdown} from "@src/widgets/dropdown";
import {useDropdown} from "@src/widgets/dropdown/lib/useDropdown";
import {splitDate} from "@src/widgets/task-modal/lib/split-date";
import {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import {ChartDate} from "../../model/types";
import * as s from "./ChartHeading.css";

const todayTitle = new Date().toLocaleString(i18n.language, {
	month: "long",
	year: "numeric",
});

type ChartHeadingProps = {
	dates: Array<ChartDate>;
};

type ChartDatesHeadRef = {
	elem: HTMLDivElement | null;
};



export const ChartHeading = forwardRef<ChartDatesHeadRef, ChartHeadingProps>((p, ref) => {
	const coordinatesRef = useRef<{x: number; y: number}>(null);
	const headTextRef = useRef<HTMLDivElement>(null);
	const headRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(
		ref,
		() => ({
			elem: headRef.current,
		}),
		[]
	);

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

	const chartHeadingCallbackRef = (node: HTMLDivElement | null) => {
		if (node) {
			const bounds = node.getBoundingClientRect();
			coordinatesRef.current = {
				x: bounds.x,
				y: bounds.y + 200,
			};
		}
	};

	useEffect(() => {
		if (headRef.current && headTextRef.current) {
			mutationObserver.observe(headRef.current, {attributes: true});
		}
		return () => {
			mutationObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		i18n.changeLanguage(dropdownState.options[dropdownState.selectedId].value);
	}, [dropdownState.selectedId]);

	return (
		<div className={s.chart_heading_block} ref={chartHeadingCallbackRef}>
			<div className={s.chart_top_heading_block}>
				<Typography.Text className={s.chart_heading_text} ref={headTextRef}>
					{todayTitle}
				</Typography.Text>

				<Dropdown {...dropdownState} />
			</div>
			<div className={s.chart_heading_dates} ref={headRef}>
				{p.dates.map((i) => (
					<TableHeadElement current={i.currentDate} day={i.weekday} date={i.date} key={i.dateString} />
				))}
			</div>
		</div>
	);
});
