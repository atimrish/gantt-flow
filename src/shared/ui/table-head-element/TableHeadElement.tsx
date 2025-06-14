import * as s from "./TableHeadElement.css";
import {Weekdays} from "@src/shared/model/types";
import {useTranslation} from "react-i18next";

export type TableHeadElementProps = {
	current: boolean;
	day: Weekdays;
	date: number;
};

export const TableHeadElement = (p: TableHeadElementProps) => {
	const {t} = useTranslation();

	return (
		<div className={s.container} data-current={p.current}>
			<div className={s.day}>{t("weekdays." + p.day)}</div>
			<div className={s.date}>{p.date}</div>
		</div>
	);
};
