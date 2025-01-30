import * as s from './TableHeadElement.css'
import {Weekdays} from "@src/shared/model/types";

export type TableHeadElementProps = {
    current: boolean,
    day: Weekdays,
    date: number
}

export const TableHeadElement = (p: TableHeadElementProps) => {
    return (
        <div
            className={s.container}
            data-current={p.current}
        >
            <div className={s.day}>{p.day}</div>
            <div className={s.date}>{p.date}</div>
        </div>
    );
};